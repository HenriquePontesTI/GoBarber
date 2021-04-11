import React, { useCallback, useContext, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import * as yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { Background, Container, Content } from './styles';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/AuthContext';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        email: yup.string().required('E-mail obrigatório').email("Digite um e-mail válido"),
        password: yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current?.setErrors({
        name: 'Nome obrigatorio',
      });
      signIn({ ...data });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, [signIn]);
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça Seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
        Criar conta
      </a>
      </Content>

      <Background />
    </Container>
  );
}
export default SignIn;
