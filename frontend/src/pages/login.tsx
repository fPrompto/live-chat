import { useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import validadeNewAccount from '@/utils/validateNewAccount';
import LoginInput from '@/components/LoginInput';
import ChatContext from '@/context/ChatContext';
import { Button } from '@chakra-ui/react';
import Image from 'next/image';

import liveChatLogo from '../images/livechat_logo.png';
import { stringify } from 'querystring';

function Login() {
  const { setUserData } = useContext(ChatContext);

  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newDisplayname, setNewDisplayname] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

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

    setUserData({
      username: response.message.username,
      displayname: response.message.displayname,
    });
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

  const loginPage = () => (
    <>
      <h2 className='login-title'>Login</h2>
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
      <Button
        colorScheme='teal'
        onClick={() => login()}
        className='login-button'
      >
        Entrar
      </Button>

      <span className='register-text'>
        Ainda não tem conta?{' '}
        <a onClick={() => setIsLogin(false)} className='register-button'>
          Crie agora
        </a>
      </span>
    </>
  );

  const registerPage = () => (
    <>
      <h2 className='login-title'>Crie sua conta</h2>
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
      <Button
        colorScheme='teal'
        onClick={() => createNewUser()}
        className='login-button'
      >
        Cadastrar
      </Button>
      <span className='register-text'>
        Já possui conta?{' '}
        <a onClick={() => setIsLogin(true)} className='register-button'>
          Faça Login
        </a>
      </span>
    </>
  );

  return (
    <div className='main-div'>
      <Image
        src={liveChatLogo}
        alt='Logo do LiveChat'
        width={400}
        className='chat-logo'
      />

      <div className='login-box'>{isLogin ? loginPage() : registerPage()}</div>
    </div>
  );
}

export default Login;
