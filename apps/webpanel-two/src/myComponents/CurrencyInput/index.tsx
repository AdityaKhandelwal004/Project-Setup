import React from 'react';
import { CurrencyWrapper, StyledCurrencyInput } from './styles';

interface CurrencyInputProps {
  [key: string]: any;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  return (
    <CurrencyWrapper>
      <StyledCurrencyInput
        {...props}
      />
    </CurrencyWrapper>
  );
};

export default CurrencyInput;
