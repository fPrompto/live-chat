import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';

function LoginInput({
  label,
  errorValue,
  errorMessage,
  value,
  setValue,
  inputType,
}: {
    label: string;
    errorValue: boolean;
    errorMessage: string;
    value: string;
    setValue: any;
    inputType: string;
}) {
  return (
    <FormControl isInvalid={errorValue}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={inputType}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!errorValue ? (
        <FormHelperText></FormHelperText>
      ) : (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
}

export default LoginInput;
