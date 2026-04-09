import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormReducer } from '../../hooks';
import {
  Form,
  FormRow,
  FormRowItem,
  Button,
  TextInput,
  FormError,
  Toast,
} from '..';
import { CardTitle } from '../card/styles';
import messages from '../../messages';
import { HttpMethods, required } from '../../utils';
import { apiCall } from '../../redux/actions';

interface Props {
  onSuccess: () => void;
  title: string;
  info: string;
  successCta: string;
  apiName?: string;
  body?:string;
  nameToBeDeleted?: string;
  successText?: string;
  closePopup?:()=>void;
  onCancel?:()=>void;
}

const validators = {
  name: [required(messages?.general?.errors?.nameToBeDeleted)],
};

const ModalAction: React.FC<Props> = ({
  title,
  info,
  body,
  onSuccess,
  successCta,
  apiName,
  nameToBeDeleted,
  successText,
  closePopup,
  onCancel,
}) => {
  const {
    submitting,
    submitError,
    handleSubmit,
    connectField,
    setSubmitError,
  } = useFormReducer(validators);

  const reduxDispatch = useDispatch();

  const onSubmit = async (data: any) => {
    if (data.name.trim() === nameToBeDeleted.trim()) {
      return new Promise<any>((resolve, reject) => {
        reduxDispatch(
          apiCall(apiName, resolve, reject, HttpMethods.DELETE, {}),
        );
      })
        .then(() => {
          onSuccess();
          toast(() => <Toast subText={successText} />);
        })
        .catch((error) => {
          setSubmitError(error?.message);
        });
    }
    setSubmitError('Name not matched');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow marginTop="24px" width="360px">
        <CardTitle variant="body1">{title}</CardTitle>
      </FormRow>
      <FormRow>
        <CardTitle variant="body1">{info}</CardTitle>
      </FormRow>
      {/* <FormRow>
        <FormRowItem>{connectField('name', {})(TextInput)}</FormRowItem>
      </FormRow> */}
      {submitError && (
        <FormRow>
          <FormRowItem>
            <FormError
              message={messages?.general?.error?.serverError?.[submitError]}
            />
          </FormRowItem>
        </FormRow>
      )}
      <FormRow marginBottom="0px">
        <FormRowItem>
          <Button
            variant="contained"
            color="primary"
            label={successCta}
            fullWidth
            type="submit"
            disabled={submitting}
          />
        </FormRowItem>
      </FormRow>
    </Form>
  );
};

export default ModalAction;
