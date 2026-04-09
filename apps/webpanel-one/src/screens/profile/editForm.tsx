import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  TextInput,
  Toast,
} from '../../components';
import { useFormReducer } from '../../hooks';
import {
  HttpMethods,
  emailValidator,
  emptyValueValidator,
  fileSizeCheckFunction,
  phoneValidator,
  required,
} from '../../utils';
import { apiCall } from '../../redux/actions';
import messages from '../../messages';
import {
  StyledFileInput,
  StyledPhoto,
  StyledPhotoContainer,
  StyledPhotoContent,
  StyledProfile,
  StyledProfileContainer,
} from './styles';
import { ReduxState } from '../../redux/reducers';
import { baseImageUrl } from '../../config';
import { MAX_FILE_SIZE } from '../../utils/constant';
import { EDIT_PROFILE, UPLOAD_PROFILE_IMAGE } from '../../api';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const validators = {
  name: [
    required(messages?.profile?.form?.errors?.nameRequired),
    emptyValueValidator,
  ],
  email: [
    required(messages?.login?.form?.errors?.emailRequired),
    emailValidator,
  ],
  phone: [
    required(messages?.profile?.form?.errors?.phoneRequired),
    phoneValidator,
  ],
};

export const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    const isFileValid = selectedFile.type === 'image/png'
      || selectedFile.type === 'image/jpg'
      || selectedFile.type === 'image/jpeg';
    if (isFileValid) return true;
    toast(() => (
      <Toast
        subText={messages?.general?.errors?.fileTypeError}
        type="error"
      />
    ));
  }
  return false;
};

const EditForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const fileInputRef = useRef(null);
  const reduxDispatch = useDispatch();
  const userProfile = useSelector((state: ReduxState) => state.profile);
  const [file, setFile] = useState(null);

  const {
    submitting, submitError, handleSubmit, connectField, change,
  } = useFormReducer(validators);

  useEffect(() => {
    change('name', userProfile?.name);
    change('email', userProfile?.email);
    change('phone', userProfile?.phoneNumber);
  }, []);

  const onSubmit = async (data: any) => new Promise<any>((resolve, reject) => {
    const sanitizedBody: any = {
      name: data?.name?.trim(),
      email: data?.email,
      phoneNumber: data?.phone,
      dialCode: '+61',
    };
    reduxDispatch(
      apiCall(EDIT_PROFILE, resolve, reject, HttpMethods.PUT, sanitizedBody),
    );
  })
    .then(async (res) => {
      if (res && file) {
        const formData = new FormData();
        formData.append('files', file);
        setFile(null);
        return new Promise<any>((resolve, reject) => {
          reduxDispatch(
            apiCall(
              UPLOAD_PROFILE_IMAGE,
              resolve,
              reject,
              HttpMethods.POST,
              formData,
              true,
            ),
          );
        })
          .then(async () => {
            onSuccess();
            toast(() => (
              <Toast
                subText={
                    messages?.profile?.editForm?.success?.updatedSuccessfully
                  }
              />
            ));
          })
          .catch((err) => {
            onCancel();
            toast(() => (
              <Toast subText={messages?.profile?.editForm?.photoError} />
            ));
            console.log(err); // eslint-disable-line no-console
          });
      }
      onSuccess();
      return toast(() => (
        <Toast
          subText={messages?.profile?.editForm?.success?.updatedSuccessfully}
        />
      ));
    })
    .catch(() => {
      onCancel();
      toast(() => (
        <Toast subText={messages?.profile?.editForm?.updateError} />
      ));
    });

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow marginTop="24px" marginBottom="24px">
        <FormRowItem
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap="8px"
        >
          {file && (
            <StyledProfileContainer onClick={handleClick}>
              <StyledProfile
                src={file ? URL.createObjectURL(file) : ''}
                alt="profile"
              />
            </StyledProfileContainer>
          )}
          {!file && <>
           {userProfile?.profilePhoto ? (
            <StyledProfileContainer onClick={handleClick}>
              <StyledProfile
                src={
                  userProfile?.profilePhoto
                    ? `${baseImageUrl}/${userProfile?.profilePhoto}`
                    : ''
                }
                alt="profile"
              />
            </StyledProfileContainer>
          ) : (
            <StyledPhotoContainer onClick={handleClick}>
              <StyledPhoto>{userProfile?.name?.charAt(0)}</StyledPhoto>
            </StyledPhotoContainer>
          )}</>}
          <StyledFileInput
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => {
              if (handleFileSelect(e)) {
                if (
                  fileSizeCheckFunction(e.target.files[0].size, MAX_FILE_SIZE)
                ) {
                  toast(
                    <Toast
                      type="error"
                      subText={messages?.general?.errors?.fileSizeError}
                    />
                  );
                }
                setFile(e.target.files[0]);
              }
            }}
          />
          <StyledPhotoContent onClick={handleClick}>
            {messages?.profile?.editForm?.changePhoto}
          </StyledPhotoContent>
        </FormRowItem>
      </FormRow>
      <FormRow marginTop="24px" marginBottom="16px">
        <FormRowItem>
          {connectField('name', {
            label: messages?.profile?.editForm?.name,
            required: true,
            maxWidth: '350px',
          })(TextInput)}
        </FormRowItem>
      </FormRow>
      <FormRow marginBottom="16px">
        <FormRowItem>
          {connectField('email', {
            label: messages?.profile?.editForm?.emailAddress,
            required: true,
            maxWidth: '350px',
          })(TextInput)}
        </FormRowItem>
      </FormRow>
      <FormRow marginBottom="24px">
        <FormRowItem>
          {connectField('phone', {
            label: messages?.profile?.editForm?.phoneNumber,
            required: true,
            type: 'number',
            maxWidth: '350px',
          })(TextInput)}
        </FormRowItem>
      </FormRow>
      {submitError && (
        <FormRow>
          <FormRowItem>
            <FormError
              message={
                messages?.profile?.form?.errors?.serverErrors?.[submitError]
              }
            />
          </FormRowItem>
        </FormRow>
      )}
      <FormRow marginBottom="0px">
        <FormRowItem>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            label={messages?.profile?.editForm?.buttonText}
            disabled={submitting}
          />
        </FormRowItem>
      </FormRow>
    </Form>
  );
};

export default EditForm;
