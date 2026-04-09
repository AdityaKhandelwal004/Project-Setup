import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { styled } from "styled-components";
import { StyledInputContainer } from "../materialTextInput/styles.tsx";
import { StyledError } from "../textInput/styles.tsx";
import { fontSize, greyScaleColour, otherColour } from "@mono/theme";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: fontSize.b1,
        color: "#344054",
        "::placeholder": {
          color: greyScaleColour.grey100,
        },
      },
      invalid: {
        color: otherColour.errorDefault,
      },
    },
    hidePostalCode: true,
  };
};

interface Props {
  error?: string;
  disableErrorMode?: boolean;
  onChange?: any;
}

const CreditCardInput: React.FC<Props> = ({
  error,
  disableErrorMode,
  onChange,
}) => {
  return (
    <StyledInputContainer>
      <Container>
        <CardElement options={createOptions()} onChange={onChange} />
      </Container>
      {!disableErrorMode && error && (
        <StyledError variant="body2">{error}</StyledError>
      )}
    </StyledInputContainer>
  );
};

export default CreditCardInput;

const Container = styled.div`
  padding: 13px 15px;
  border-radius: 10px;
  border: 1px solid ${greyScaleColour.grey50};
`;
