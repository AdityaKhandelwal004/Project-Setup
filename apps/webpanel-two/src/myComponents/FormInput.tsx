import React from 'react';
import styled from 'styled-components';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { StyledMaterialInput, StyledPasswordInput, StyledDateInput } from '../screens/auth/styles';
import { brand, spacing, borderRadius } from '@mono/theme';

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  success?: string;
  hint?: string;
  icon?: React.ReactNode;
}

// Styled Components
const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${brand.secondaryMain};
`;

const InputContainer = styled.div`
  position: relative;
`;



const IconContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
`;

const MessageContainer = styled.div<{ $type: 'error' | 'success' | 'hint' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${spacing[3]};
  border-radius: ${borderRadius.md};
  font-weight: 500;
  font-size: 14px;

  ${props => {
    switch (props.$type) {
      case 'error':
        return `
          color: ${brand.error};
          background-color: ${brand.errorBg};
        `;
      case 'success':
        return `
          color: ${brand.secondaryMain};
          background-color: ${brand.paleGreen};
        `;
      case 'hint':
        return `
          color: ${brand.primaryMain};
          background-color: ${brand.paleGray};
        `;
      default:
        return '';
    }
  }}
`;

export function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  success,
  hint,
  icon,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <InputContainer>
        {type === 'password' ? (
          <StyledPasswordInput
            value={value}
            onChange={onChange}
            disableErrorMode
            error={!!error}
            placeholder={placeholder}
          />
        ) : type === 'date' ? (
          <StyledDateInput
            value={value}
            onChange={onChange}
            disableErrorMode
            error={!!error}
            dateFormat="YYYY-MM-DD"
            fullWidth
          />
        ) : (
          <StyledMaterialInput
            value={value}
            onChange={onChange}
            type={type}
            disableErrorMode
            error={!!error}
            placeholder={placeholder}
            onBlur={onBlur}
          />
        )}

        {/* Custom icons overlay */}
        <IconContainer>
          {icon && <div className="text-gray-400">{icon}</div>}
          {success && <CheckCircle size={18} className="text-green-500" />}
        </IconContainer>
      </InputContainer>

      {(error || success || hint) && (
        <div className="text-sm">
          {error && (
            <MessageContainer $type="error">
              <AlertCircle color='red' size={16} />
              <span>{error}</span>
            </MessageContainer>
          )}
          {success && (
            <MessageContainer $type="success">
              <CheckCircle size={16} />
              <span>{success}</span>
            </MessageContainer>
          )}
          {hint && !error && !success && (
            <MessageContainer $type="hint">
              {hint}
            </MessageContainer>
          )}
        </div>
      )}
    </div>
  );
}
