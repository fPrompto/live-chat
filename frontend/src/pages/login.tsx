import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import validadeNewAccount from '@/utils/validateNewAccount';
import LoginInput from '@/components/LoginInput';

function Login() {
  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newDisplayname, setNewDisplayname] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    console.log('---------- LOGIN PAGE ----------');
    console.log('email / user:', emailUser);
    console.log('password:', password);
    console.log('new user:', newUser);
    console.log('new email:', newEmail);
    console.log('new password:', newPassword);
    console.log('--------------------------------');
  });

  const postAxios = async (path: string, data: object) => {
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
      <div />
      <LoginInput placeholder='Insira seu Email' setLoginValue={setEmailUser} />
      <LoginInput placeholder='Insira sua Senha' setLoginValue={setPassword} />

      <div />
      <span>Cadastrar</span>
      <LoginInput placeholder='Insira seu Usuário' setLoginValue={setNewUser} />
      <LoginInput placeholder='Insira seu Email' setLoginValue={setNewEmail} />
      <LoginInput
        placeholder='Insira seu Nome'
        setLoginValue={setNewDisplayname}
      />
      <LoginInput
        placeholder='Insira sua Senha'
        setLoginValue={setNewPassword}
      />
      <button onClick={() => createNewUser()}>Cadastrar</button>
    </>
  );
}

export default Login;
