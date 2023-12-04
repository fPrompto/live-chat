import { useEffect, useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import validadeNewAccount from '@/utils/validateNewAccount';
import LoginInput from '@/components/LoginInput';
import ChatContext from '@/context/ChatContext';

function Login() {
  const { setUserData } = useContext(ChatContext);

  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');
  
  const [newEmail, setNewEmail] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newDisplayname, setNewDisplayname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const { push } = useRouter();
  
  useEffect(() => {
    console.log('---------- LOGIN PAGE ----------');
    console.log('email / user:', emailUser);
    console.log('password:', password);
    console.log('new user:', newUser);
    console.log('new email:', newEmail);
    console.log('new password:', newPassword);
    console.log('--------------------------------');
  });

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
    setUserData(
      {
        username: emailUser,
        displayname: 'Login feito',
      }
    );
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

  return (
    <>
      <div>Tela de Login</div>
      <span>Entrar</span>
      <br />
      <LoginInput
        placeholder='Insira seu Email ou Usuário'
        setLoginValue={setEmailUser}
      />
      <br />
      <LoginInput placeholder='Insira sua Senha' setLoginValue={setPassword} />
      <br />
      <button onClick={() => login()}>Entrar</button>

      <br />
      <br />
      <span>Cadastrar</span>
      <br />
      <LoginInput placeholder='Insira seu Usuário' setLoginValue={setNewUser} />
      <br />
      <LoginInput placeholder='Insira seu Email' setLoginValue={setNewEmail} />
      <br />
      <LoginInput
        placeholder='Insira seu Nome'
        setLoginValue={setNewDisplayname}
      />
      <br />
      <LoginInput
        placeholder='Insira sua Senha'
        setLoginValue={setNewPassword}
      />
      <br />
      <button onClick={() => createNewUser()}>Cadastrar</button>
    </>
  );
}

export default Login;
