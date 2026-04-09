import React, { useState, useRef, useEffect } from "react";
import type { DragEvent, ChangeEvent } from "react";
import {
  DragDropContainer,
  ErrorMessage,
  FileInfo,
  FileName,
  HiddenInput,
  RemoveButton,
  StyledInfoText,
  StyledSubText,
  StyledUploadIcon,
  ImagePreview,
  StyledDeleteIcon,
} from "./styles.tsx";

interface DragAndDropInputProps {
  onFileSelect?: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
  placeholder?: string;
  customWidth?: string;
  isImage?: boolean;
  setFiles: (file: any) => void;
  initialImageUrl?: string | null;
  initialFile?: File | null;
  disabled?: boolean;
  infoText?: string;
  subInfoText?: string;
  onRemove?: () => void;
}

const DragAndDropInput: React.FC<DragAndDropInputProps> = ({
  onFileSelect,
  acceptedTypes = [".csv", ".xlsx", ".xls"],
  maxSize = 5 * 1024 * 1024, // 5MB default
  placeholder = "Drag and drop a file here, or click to select",
  customWidth,
  isImage = false,
  setFiles,
  initialImageUrl = null,
  initialFile = null,
  disabled = false,
  infoText,
  subInfoText,
  onRemove
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(
        maxSize / (1024 * 1024)
      )}MB`;
    }

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (acceptedTypes.length > 0 && !acceptedTypes.includes(fileExtension)) {
      return `Only ${acceptedTypes.join(", ")} files are allowed`;
    }

    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setFiles(null);
      setSelectedFile(null);
      return;
    }

    setError("");
    setFiles(file);
    setSelectedFile(file);
    
    // Create image preview URL if isImage is true
    if (isImage) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
    
    onFileSelect?.(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (selectedFile || disabled) return; // Block drop if file already exists or disabled

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    if (!selectedFile && !disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };


  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Clean up image preview URL (only if it's a blob URL)
    if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
    
    setSelectedFile(null);
     setFiles(null);
    setError("");
    onRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Set initial file if provided
  useEffect(() => {
    if (initialFile && !selectedFile) {
      setSelectedFile(initialFile);
      setFiles(initialFile);
    }
  }, [initialFile]);

  // Set initial image URL if provided
  useEffect(() => {
    if (initialImageUrl && !selectedFile) {
      setImagePreviewUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  // Clean up image preview URL on unmount (only if it's a blob URL)
  useEffect(() => {
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <>
      <DragDropContainer
        isDragOver={isDragOver && !disabled}
        hasFile={!!selectedFile || !!imagePreviewUrl}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        customWidth={customWidth}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.7 : 1 }}
      >
        {selectedFile || (isImage && imagePreviewUrl) ? (
          <>
            {isImage && imagePreviewUrl ? (
              <>
                <ImagePreview src={imagePreviewUrl} alt={selectedFile?.name || 'Preview'} />
                <StyledDeleteIcon onClick={handleRemoveFile}/>
                {/* <RemoveButton onClick={handleRemoveFile}>Remove</RemoveButton> */}
              </>
            ) : selectedFile ? (
              <>
                <FileName>📄 {selectedFile.name}</FileName>
                <FileInfo>{formatFileSize(selectedFile.size)}</FileInfo>
                <RemoveButton onClick={handleRemoveFile}>Remove</RemoveButton>
              </>
            ) : null}
          </>
        ) : (
          <>
          {/* // <div>{placeholder}</div> */}
        <StyledUploadIcon/>
        <StyledSubText >{placeholder}</StyledSubText>
        {infoText && <StyledInfoText>{infoText}</StyledInfoText>}
        {subInfoText && <StyledInfoText>{subInfoText}</StyledInfoText>}
        {!infoText && !subInfoText && (
          <>
            <StyledInfoText>JPG PNG</StyledInfoText>
            <StyledInfoText>Max file size 2MB</StyledInfoText>
          </>
        )}
          </>
        )}
      </DragDropContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileInput}
      />
    </>
  );
};

export default DragAndDropInput;