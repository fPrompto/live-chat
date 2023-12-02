import axios, { AxiosResponse } from 'axios';
import { VerifyLoginI } from '@/interfaces/VerifyLoginI';

const verifyLoginAxios = async (
  path: string,
  request: object,
): Promise<VerifyLoginI> => {
  const url = `http://localhost:4000/user/verify/${path}`;
  try {
    const response: AxiosResponse<VerifyLoginI> = await axios.post(
      url,
      request,
    );
    return response.data;
  } catch (error) {
    console.log('erro na requisição', error);

    return {
      value: false,
      message: 'Erro na requisição',
    };
  }
};

const validatePassword = (password: string): boolean => {
  const passwordLength = password.length;

  if (passwordLength >= 6) {
    return true;
  }

  return false;
};

const validateEmail = (email: string): boolean => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const testEmail = regexEmail.test(email);

  if (testEmail) {
    return true;
  }

  return false;
};

const checkIfEmailExists = async (email: string): Promise<boolean> => {
  const response = await verifyLoginAxios('email', { email });
  return response.value;
};

const checkIfUserExists = async (username: string): Promise<boolean> => {
  const response = await verifyLoginAxios('user', { username });
  return response.value;
};

const validadeNewAccount = async (
  email: string,
  username: string,
  password: string,
): Promise<VerifyLoginI> => {
  const vEmail = validateEmail(email);
  const vPassword = validatePassword(password);
  const checkEmail = checkIfEmailExists(email);
  const checkUser = checkIfUserExists(username);

  if (!vEmail) {
    return {
      value: false,
      message: 'O Email deve estar no formato exemplo@email.com',
    };
  }

  if (!vPassword) {
    return {
      value: false,
      message: 'A Senha deve conter 6 dígitos ou mais',
    };
  }

  if (!checkEmail) {
    return {
      value: false,
      message: 'Email já existente, por favor use outro',
    };
  }

  if (!checkUser) {
    return {
      value: false,
      message: 'Usuário já existente, por favor use outro',
    };
  }

  return {
    value: true,
    message: 'Cadastro concluído com sucesso!',
  };
};

export default validadeNewAccount;
