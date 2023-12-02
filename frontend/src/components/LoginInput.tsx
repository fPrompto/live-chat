import { useState } from 'react';

function LoginInput({
  placeholder,
  setLoginValue,
}: {
  placeholder: string;
  setLoginValue: any;
}) {
  const [value, setValue] = useState('');
  return (
    <input
      onChange={(e) => {
        setValue(e.target.value);
        setLoginValue(e.target.value);
      }}
      placeholder={placeholder}
      value={value}
    />
  );
}

export default LoginInput;
