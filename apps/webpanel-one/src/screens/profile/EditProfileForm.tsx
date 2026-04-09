import React, { useState } from 'react';
import { Form, TextInput, MaterialDateInput, Toast } from '@mono/components';
import { useFormReducer } from '@mono/hooks/src/form';
import ModalButtonWrapper from '../../myComponents/ModalButtonWrapper/ModalButtonWrapper';
import ProfileImageUpload from '../../myComponents/ProfileImageUpload';
import {
  InputGroup,
  FormLabel,
} from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall } from '../../redux/actions';
import { dobValidator, emailValidator, HttpMethods, required, trimWordWrapper } from '@mono/utils';
import { REMOVE_IMAGE, UPDATE_PROFILE, UPLOAD_IMAGE, apiCall as formApiCall } from '../../api';
import messages from '../../messages';
import { ToastType } from '@mono/models';
import { toast } from 'react-toastify';
import type { ReduxState } from '../../redux/reducers';
import { ErrorContainer, ErrorContent, ErrorIcon, ErrorText } from '../auth/styles';
import { AlertCircle } from 'lucide-react';
import { fetchUserProfile } from '@mono/redux-global/src/actions';
import moment from 'moment';
import StepCompletionToast, { successToastConfig, toastSuccessMessages, ToastVariants } from '../../myComponents/stepCompletionToast';

interface EditProfileFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}


const validators = {
  firstName: [
    required('First name is required'),
  ],
  lastName: [
    required('Last name is required'),
  ],
  email: [
    required('Email is required'),
    emailValidator
  ],
  dateOfBirth: [
    required('Date of birth is required'),
    dobValidator
  ]
};


const EditProfileForm: React.FC<EditProfileFormProps> = ({ onCancel, onSuccess }) => {
  const reduxDispatch = useDispatch();
  const userProfile = useSelector((state: ReduxState) => state.profile);
  const currentImageUrl = userProfile?.profilePicturePath;


  const [uploadedImage, setUploadedImage] = React.useState<string | undefined>(currentImageUrl);
  const [file, setFile] = useState<File | null>(null);


  const defaultValues = React.useMemo(() => ({
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    email: userProfile?.email,
    dateOfBirth: userProfile?.dateOfBirth,
  }), [userProfile]);

  const form = useFormReducer(validators, defaultValues);

  const handleImageChange = (imageUrl: string | null, fileObj?: File | null) => {
    if (imageUrl === null) {
      // User clicked delete
      setUploadedImage(undefined);
      setFile(null);
    } else {
      // User uploaded new image
      setUploadedImage(imageUrl);
      setFile(fileObj || null);
    }
  };

  const uploadProfileImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      await new Promise<any>((resolve, reject) => {
        reduxDispatch(
          apiCall(
            UPLOAD_IMAGE,
            resolve,
            reject,
            HttpMethods.POST,
            formData, {
            isFormData: true
          }
          )
        );
      })
    }
  }

  const removeProfileImage = async () => {
    await new Promise<any>((resolve, reject) => {
      reduxDispatch(
        apiCall(
          REMOVE_IMAGE,
          resolve,
          reject,
          HttpMethods.DELETE,
        )
      );
    })
  }


  const onSubmit = async (data: any) => {
    if (form.submitting) {
      return;
    }

    try {
      const sanitizedBody: any = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: trimWordWrapper(data?.email?.toLowerCase()),
        dateOfBirth: data?.dateOfBirth,
      };
      await new Promise<any>((resolve, reject) => {
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

      try {
        if (file) {
          await uploadProfileImage();
        }
        if (!file && !uploadedImage && currentImageUrl) {
          await removeProfileImage();
        }
      } catch (error) {

      }

      onSuccess?.();
      reduxDispatch(fetchUserProfile());
      toast(
        <StepCompletionToast
          variant={ToastVariants.PURPLE}
          title={toastSuccessMessages.profile.title}
          message={toastSuccessMessages.profile?.message}

        />,
        successToastConfig as any
      );
    } catch (err: any) {
      form.setSubmitError(messages?.profile?.errors?.[err?.message] || messages?.general?.generalError);
      return;
    }


  }


  return (
    <Form hasPadding onSubmit={form.handleSubmit(onSubmit)}>
      <ProfileImageUpload
        imageUrl={uploadedImage}
        firstName={userProfile?.firstName}
        lastName={userProfile?.lastName}
        size={120}
        onImageChange={handleImageChange}
        showChangeButton={true}
        editable={true}
      />

      <InputGroup>
        {form.connectField('firstName', {
          placeholder: 'First name',
          fullWidth: true,
        })(TextInput)}
      </InputGroup>

      <InputGroup>
        {form.connectField('lastName', {
          placeholder: 'Last name',
          fullWidth: true,
        })(TextInput)}
      </InputGroup>

      <InputGroup>
        {form.connectField('email', {
          placeholder: 'Email address',
          fullWidth: true,
        })(TextInput)}
      </InputGroup>

      <InputGroup>
        <FormLabel>Date of Birth</FormLabel>
        {form.connectField('dateOfBirth', {
          placeholder: 'DD/MM/YYYY',
          fullWidth: true,
          maxDate: moment().subtract(18, 'years').toDate(),
        })(MaterialDateInput)}
      </InputGroup>
      <>
        {form.submitError && (
          <ErrorContainer>
            <ErrorContent>
              <ErrorIcon>
                <AlertCircle size={16} />
              </ErrorIcon>
              <ErrorText>{form.submitError}</ErrorText>
            </ErrorContent>
          </ErrorContainer>
        )}
      </>

      <ModalButtonWrapper
        onCancel={onCancel}
        onSubmit={() => {
          form.dirty();
          form.validateForm();
        }}
        submitLabel="Update"
        cancelLabel="Cancel"
        isSubmitting={form?.submitting}
      />
    </Form>
  );
};

export default EditProfileForm;
