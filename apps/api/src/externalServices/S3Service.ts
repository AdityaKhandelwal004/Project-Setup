import AWS from "aws-sdk";
import fs from "fs";
import config from "../config/index.ts";
import { formatErrorResponse } from "../utils/apiResponses.ts";
import { HttpException } from "../utils/index.ts";
import moment from "moment";

const s3 = new AWS.S3();

export const CHUNK_SIZE = 5 * 1024 * 1024;
export const MAX_CONCURRENT_UPLOADS = 5;
export const MULTIPART_UPLOAD_FILE_SIZE = 8 * 1024 * 1024;

export default class S3Service {
  static async uploadMultipart(
    file: Express.Multer.File,
    metaData: { mimeType?: string; bucket?: string; folder?: string } = {}
  ) {
    const bucketName = metaData.bucket || config.aws.uploadsBucketName;
    
    if (!bucketName) {
      throw new HttpException.BadRequest(
        formatErrorResponse("uploadMultipart", "missingS3BucketName")
      );
    }

    const fileStream = fs.createReadStream(file.path, {
      highWaterMark: CHUNK_SIZE,
    });
    let partNumber = 0;
    let uploadedParts: Array<{ PartNumber: number; ETag: string }> = [];
    let uploadChunks: Promise<{ PartNumber: number; ETag: string }>[] = [];
    let multipartUpload: AWS.S3.CreateMultipartUploadOutput;

    const extension = file.originalname.split(".").pop();
    const folder = metaData.folder || "uploads";
    const fileName = `${folder}/${moment().toISOString()}.${extension}`;

    const uploadParams: AWS.S3.CreateMultipartUploadRequest = {
      Bucket: bucketName,
      Key: fileName,
      ContentType: metaData.mimeType || file.mimetype,
    };
    try {
      multipartUpload = await s3.createMultipartUpload(uploadParams).promise();
      if (!multipartUpload.UploadId) {
        throw new Error("UploadId is missing in the response.");
      }
    } catch (error) {
      console.error("Error creating multipart upload:", error);
      throw error;
    }

    const uploadChunk = async (
      chunk: Buffer,
      partNumber: number
    ): Promise<{ PartNumber: number; ETag: string }> => {
      const partParams: AWS.S3.UploadPartRequest = {
        Bucket: bucketName,
        Key: fileName,
        PartNumber: partNumber,
        UploadId: multipartUpload.UploadId!,
        Body: chunk,
      };
      const partUpload = await s3.uploadPart(partParams).promise();
      return { PartNumber: partNumber, ETag: partUpload.ETag! };
    };

    for await (const chunk of fileStream) {
      partNumber++;
      uploadChunks.push(uploadChunk(chunk, partNumber));
    }

    if (uploadChunks.length > 0) {
      const completedParts = await Promise.all(uploadChunks);
      uploadedParts.push(...completedParts);
    }

    uploadedParts.sort((a, b) => a.PartNumber - b.PartNumber);

    const completeParams: AWS.S3.CompleteMultipartUploadRequest = {
      Bucket: bucketName,
      Key: fileName,
      UploadId: multipartUpload.UploadId!,
      MultipartUpload: { Parts: uploadedParts },
    };

    const result = await s3.completeMultipartUpload(completeParams).promise();
    return result;
  }

  static async uploadFile(file: Express.Multer.File | undefined, folder: string) {
    if (!file) {
      throw new HttpException.BadRequest(
        formatErrorResponse("uploadFile", "invalidFile")
      );
    }

    if (file.size > MULTIPART_UPLOAD_FILE_SIZE) {
      return await this.uploadMultipart(file);
    }

    const bucketName = config?.aws?.uploadsBucketName;

    if (!bucketName) {
      throw new HttpException.BadRequest(
        formatErrorResponse("uploadFile", "missingS3BucketName")
      );
    }

    const extension = file.originalname.split(".").pop();
    const fileName = `${folder}/${moment().toISOString()}.${extension}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: fs.readFileSync(file.path),
      ContentType: file.mimetype,
    };

    const res = await s3.upload(uploadParams).promise();

    return res;
  }

  static async deleteFile(key: string, bucket?: string) {
    const bucketName = bucket || config?.aws?.uploadsBucketName;

    if (!bucketName) {
      throw new HttpException.BadRequest(
        formatErrorResponse("deleteFile", "missingS3BucketName")
      );
    }

    const deleteParams: AWS.S3.DeleteObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };

    const result = await s3.deleteObject(deleteParams).promise();
    return result;
  }

  static async uploadFileWithUserId(file: Express.Multer.File, userId: string, bucket?: string) {
    const bucketName = bucket || config?.aws?.uploadsBucketName;

    if (!bucketName) {
      throw new HttpException.BadRequest(
        formatErrorResponse("uploadFile", "missingS3BucketName")
      );
    }

    const extension = file.originalname.split(".").pop();
    const fileName = `${userId}/${moment().toISOString()}.${extension}`;

    if (file.size > MULTIPART_UPLOAD_FILE_SIZE) {
      return await this.uploadMultipart(file, { bucket: bucketName, folder: userId });
    }

    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: fs.readFileSync(file.path),
      ContentType: file.mimetype,
    };

    const res = await s3.upload(uploadParams).promise();

    return res;
  }
}
