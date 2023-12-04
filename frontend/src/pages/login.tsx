import { useEffect, useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import validadeNewAccount from '@/utils/validateNewAccount';
import LoginInput from '@/components/LoginInput';
import ChatContext from '@/context/ChatContext';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';

function Login() {
  const { setUserData } = useContext(ChatContext);

  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newDisplayname, setNewDisplayname] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { push } = useRouter();

  const postAxios = async (path: string, data: object): Promise<any> => {
    const url = `http://localhost:4000/user/${path}`;
    try {
      const response: AxiosResponse<any> = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.log('erro na requisição', error);

      return {
        value: false,
        message: 'Erro na requisição',
      };
    }
  };

  const login = async () => {
    const response = await postAxios('login', {
      emailUser,
      password,
    });

    if (!response.value) {
      return alert('Erro no Login');
    }

    // recurso provisorio para testes
    setUserData({
      username: response.message.username,
      displayname: response.message.displayname,
    });
    // recurso provisório
    return push('/chat');
  };

  const createNewUser = async () => {
    const vAccount = await validadeNewAccount(newEmail, newUser, newPassword);

    if (!vAccount.value) {
      // mensagem que sinaliza o problema na criação do usuário
      console.log('erro no cadastro!!!');
      console.log('message:', vAccount.message);
      return;
    }

    const response = await postAxios('create', {
      email: newEmail,
      username: newUser,
      displayname: newDisplayname,
      password: newPassword,
    });

    console.log('novo cadastro!!');
    console.log('response:', response);
  };

  let loginError = false;
  let registerError = false;

  return (
    <>
      <LoginInput
        label='Email ou Usuário'
        errorValue={loginError}
        errorMessage='Email ou Usuário necessário'
        value={emailUser}
        setValue={setEmailUser}
        inputType='email'
      />

      <LoginInput
        label='Senha'
        errorValue={loginError}
        errorMessage='Senha necessária'
        value={password}
        setValue={setPassword}
        inputType='password'
      />
      <Button colorScheme='teal' onClick={() => login()}>
        Entrar
      </Button>

      <br />
      <br />
      <span>Cadastrar</span>
      <br />
      <LoginInput
        label='Usuário'
        errorValue={registerError}
        errorMessage='Usuário necessário'
        value={newUser}
        setValue={setNewUser}
        inputType='email'
      />
      <LoginInput
        label='Email'
        errorValue={registerError}
        errorMessage='Email necessário'
        value={newEmail}
        setValue={setNewEmail}
        inputType='email'
      />
      <LoginInput
        label='Nome'
        errorValue={registerError}
        errorMessage='Nome necessário'
        value={newDisplayname}
        setValue={setNewDisplayname}
        inputType='email'
      />
      <LoginInput
        label='Senha'
        errorValue={registerError}
        errorMessage='Senha necessária'
        value={newPassword}
        setValue={setNewPassword}
        inputType='password'
      />
      <Button colorScheme='teal' onClick={() => createNewUser()}>
        Cadastrar
      </Button>
    </>
  );
}

export default Login;
