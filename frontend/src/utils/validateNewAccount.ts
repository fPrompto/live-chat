import axios, { AxiosResponse } from 'axios';
import { VerifyLoginI } from '@/interfaces/VerifyLoginI';

import { z, ZodError } from 'zod';

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

const NewUserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
});

const validadeNewAccount = async (
  email: string,
  username: string,
  password: string,
): Promise<VerifyLoginI> => {
  const user = { email, username, password };

  try {
    NewUserSchema.parse(user);

    const checkEmail = await verifyLoginAxios('email', { email });
    if (!checkEmail.value) {
      console.log('check email', checkEmail);
      return checkEmail;
    }

    const checkUsername = await verifyLoginAxios('user', { username });
    if (!checkUsername.value) {
      return checkUsername;
    }

    return {
      value: true,
      message: 'Cadastro concluído com sucesso!',
    };
  } catch (error) {
    return {
      value: false,
      message: 'Erro no cadastro',
    };
  }
};

export default validadeNewAccount;
