import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  TextInput,
  Toast,
} from "@mono/components";
import { useFormReducer } from "@mono//hooks";
import {
  HttpMethods,
  capitalize,
  emailValidator,
  emptyValueValidator,
  fileSizeCheckFunction,
  required,
  trimWordWrapper,
} from "@mono/utils";
import messages from "../../messages";
import {
  StyledFileInput,
  StyledFormRow,
  StyledPhoto,
  StyledPhotoContainer,
  StyledPhotoContent,
  StyledProfile,
  StyledProfileContainer,
} from "./styles";
import { MAX_FILE_SIZE } from "../../myUtils/constant";
import { apiCall as formApiCall, REMOVE_IMAGE, UPLOAD_IMAGE } from "../../api";
import type { ReduxState } from "../../redux/reducers";
// import { ToastType } from "@mono/models";
import { Grid2, Typography } from "@mui/material";
import { fontFamilies, primitiveColors } from "@mono/theme";
// import { apiCall } from "../../redux/actions";
import { UPDATE_PROFILE } from "../../api";
import { apiCall } from "@mono/redux-global/src/actions";
import { ToastType } from "../../models/genericEntities";
import { ErrorContainer, ErrorContent, ErrorIcon, ErrorText } from "../auth/styles";
import { AlertCircle } from "lucide-react";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const validators = {
  firstName: [
    required(messages?.profile?.form?.firstnameRequired),
    emptyValueValidator,
  ],
  lastName: [required(messages?.profile?.form?.lastnameRequired)],
};

export const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files[0];

  if (selectedFile) {
    const isFileValid =
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/bmp" ||
      selectedFile.type === "image/webp" ||
      selectedFile.type === "image/tiff";

    if (isFileValid) return true;

    // toast(
    //   ({ closeToast }) => (
    //     <Toast
    //       text={messages?.general?.errors?.fileTypeError}
    //       type={ToastType.ERROR}
    //       closeToast={closeToast}
    //     />
    //   ),
    //   { closeButton: false }
    // );
  }
  return false;
};

const EditForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const reduxDispatch = useDispatch();
  const userProfile = useSelector((state: ReduxState) => state.profile);

  const [file, setFile] = useState<File | null>(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  const {
    submitting,
    submitError,
    handleSubmit,
    connectField,
    setSubmitError,
    change,
  } = useFormReducer(validators);

  useEffect(() => {
    change("firstName", userProfile?.firstName);
    change("lastName", userProfile?.lastName);
    change("email", userProfile?.email);
  }, []);

  const onSubmit = async (data: any) =>
    new Promise<any>((resolve, reject) => {
      const sanitizedBody: any = {
        firstName: trimWordWrapper(data?.firstName),
        lastName: trimWordWrapper(data?.lastName),
      };
      reduxDispatch(
        apiCall(
          UPDATE_PROFILE,
          resolve,
          reject,
          HttpMethods.PATCH,
          sanitizedBody
        )
      );
    })
      .then(async (res) => {
        if (res) {
          if (file) {
            const formData = new FormData();
            formData.append("files", file);
            const result = await formApiCall(
              UPLOAD_IMAGE,
              HttpMethods.POST,
              formData,
              true
            );
            if (!result.ok) {
              throw new Error("Upload Error");
            }
          } else if (removePhoto) {
            const result = await formApiCall(
              REMOVE_IMAGE,
              HttpMethods.DELETE,
              {},
              true
            );
            if (!result.ok) {
              throw new Error("Remove Error");
            }
          }
          if (onSuccess) onSuccess();
          return toast(() => (
            <Toast
              text={messages?.profile?.updatedSuccessfully}
              type={ToastType.SUCCESS}
            />
          ));
        }
      })
      .catch((error) => {
        setSubmitError(
          messages?.profile?.errors?.[error?.message] ||
            messages?.general?.generalError
        );
      });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveClick = () => {
    setFile(null);
    setRemovePhoto(true);
  };

  return (
    <Form hasPadding onSubmit={handleSubmit(onSubmit)}>
      <StyledFormRow>
        <Typography
          fontFamily={fontFamilies.secondary}
          color={primitiveColors.neutral500}
        >
          {messages?.profile?.profilePicture}
        </Typography>
        <FormRowItem direction="row" alignItems="center" gap="32px">
          {file && (
            <StyledProfileContainer onClick={handleClick}>
              <StyledProfile src={URL.createObjectURL(file)} alt="profile" />
            </StyledProfileContainer>
          )}
          {!file && !removePhoto && (
            <>
              {userProfile?.profilePicturePath ? (
                <StyledProfileContainer onClick={handleClick}>
                  <StyledProfile
                    src={userProfile?.profilePicturePath}
                    alt="profile"
                  />
                </StyledProfileContainer>
              ) : (
                <StyledPhotoContainer onClick={handleClick}>
                  <StyledPhoto>
                    {" "}
                    {userProfile?.firstName?.charAt(0)}{" "}
                  </StyledPhoto>
                </StyledPhotoContainer>
              )}
            </>
          )}
          {!file && removePhoto && (
            <StyledPhotoContainer onClick={handleClick}>
              <StyledPhoto>
                {" "}
                {userProfile?.firstName?.charAt(0)}{" "}
              </StyledPhoto>
            </StyledPhotoContainer>
          )}
          {/* {!file && (
            <StyledPhotoContainer onClick={handleClick}>
              <StyledPhoto>
                {userProfile?.firstName &&
                  capitalize(userProfile?.firstName?.charAt(0))}
              </StyledPhoto>
            </StyledPhotoContainer>
          )} */}

          <StyledFileInput
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => {
              if (handleFileSelect(e)) {
                if (fileSizeCheckFunction(e.target?.files?.[0]?.size,MAX_FILE_SIZE)) {
                  toast(
                    ({ closeToast }) => (
                      <Toast
                        text={messages?.general?.errors?.fileSizeError}
                        type={ToastType.ERROR}
                      />
                    ),
                    { closeButton: false }
                  );
                } else {
                  setFile(e.target?.files?.[0]);
                  setRemovePhoto(false);
                }
              }
            }}
          />

          <Grid2>
            <StyledPhotoContent onClick={handleClick}>
              {messages?.profile?.changePhoto}
            </StyledPhotoContent>

            {userProfile?.profilePicturePath && !file && !removePhoto && (
              <StyledPhotoContent
                onClick={handleRemoveClick}
                paddingTop={"10px"}
              >
                {"Remove photo"}
              </StyledPhotoContent>
            )}
          </Grid2>
        </FormRowItem>
      </StyledFormRow>

      <FormRow>
        <FormRowItem>
          {connectField("firstName", {
            label: messages?.general?.firstName,
            required: true,
            isModal: true,
            // maxWidth: "218px",
          })(TextInput)}
        </FormRowItem>
      </FormRow>

      <FormRow>
        <FormRowItem>
          {connectField("lastName", {
            label: messages?.general?.lastName,
            isModal: true,
          })(TextInput)}
        </FormRowItem>
      </FormRow>

      {submitError && (
        <ErrorContainer>
          <ErrorContent>
            <ErrorIcon>
              <AlertCircle size={16} />
            </ErrorIcon>
            <ErrorText>{submitError}</ErrorText>
          </ErrorContent>
        </ErrorContainer>
      )}

      <FormRow marginTop="20px" justifySelf="end" width="fit-content">
        <FormRowItem>
          <Button
            variant="outlined"
            fullWidth
            label={messages?.general?.cancel}
            onClick={onCancel}
          />
        </FormRowItem>
        <FormRowItem>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            label={messages?.general?.update}
            disabled={submitting}
          />
        </FormRowItem>
      </FormRow>
    </Form>
  );
};

export default EditForm;
