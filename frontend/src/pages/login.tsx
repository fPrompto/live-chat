import { useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import validadeNewAccount from '@/utils/validateNewAccount';
import LoginInput from '@/components/LoginInput';
import ChatContext from '@/context/ChatContext';
import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import Alert from '@/components/Alert';

import liveChatLogo from '../images/livechat_logo.png';

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

  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
      setAlertMessage(response.message);
      return setIsOpen(true);
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
      console.log('erro no cadastro!!!');
      console.log('message:', vAccount.message);
      setAlertMessage(vAccount.message);
      setIsOpen(true);
      return setRegisterError(true);
    }

    const response = await postAxios('create', {
      email: newEmail,
      username: newUser,
      displayname: newDisplayname,
      password: newPassword,
    });

    console.log('novo cadastro!!');
    console.log('response:', response);
    setUserData({
      username: response.username,
      displayname: response.displayname,
    });
    return push('/chat');
  };

  const loginPage = () => (
    <>
      <h2 className='login-title'>Login</h2>
      <LoginInput
        label='Email ou Usuário'
        errorValue={loginError}
        errorMessage=''
        value={emailUser}
        setValue={setEmailUser}
        inputType='email'
      />

      <LoginInput
        label='Senha'
        errorValue={loginError}
        errorMessage=''
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
        errorMessage=''
        value={newUser}
        setValue={setNewUser}
        inputType='email'
      />
      <LoginInput
        label='Email'
        errorValue={registerError}
        errorMessage=''
        value={newEmail}
        setValue={setNewEmail}
        inputType='email'
      />
      <LoginInput
        label='Nome'
        errorValue={registerError}
        errorMessage=''
        value={newDisplayname}
        setValue={setNewDisplayname}
        inputType='email'
      />
      <LoginInput
        label='Senha'
        errorValue={registerError}
        errorMessage=''
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
      <Alert
        message={alertMessage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default Login;
