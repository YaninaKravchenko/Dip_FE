import React, { FC } from 'react';
import { StyledLabel, StyledInput } from './stylesInput';

type CustomInputProps = {
  inputLabel: string;
  inputType: 'text' | 'password' | 'number' | 'email' | 'name';
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  onIconClick?: string;
};

const CustomInput: FC<CustomInputProps> = ({
  inputLabel,
  inputType,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <StyledLabel>
      {inputLabel}
      <StyledInput
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledLabel>
  );
};

export default CustomInput;
