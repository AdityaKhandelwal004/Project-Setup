import React, {
  useEffect,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { StyledOTPInput, StyledOTPInputBox } from './styles.tsx';

interface Props {
  otpValues: string[];
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>;
}

const OtpInput: React.FC<Props> = ({ otpValues, setOtpValues }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    
    useEffect(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, []);

    const handleChange = (
      index: number,
      value: string,
    ) => {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value !== '' && index < otpValues?.length - 1) {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };

    const handleKeyDown = (
      index: number,
      event: KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === 'Backspace' && otpValues[index] === '' && index > 0) {
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    };

    return (
      <StyledOTPInputBox>
        {otpValues.map((value, index) => (
          <StyledOTPInput
            key={index}
            autoComplete="off"
            maxLength={1}
            value={value}
            onChange={(value) => {
              if (Number(value) >= 0 && Number(value) <= 9) {
                handleChange(index, value);
              }
            }}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputRef={(el) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
      </StyledOTPInputBox>
    );
  }

export default OtpInput;
