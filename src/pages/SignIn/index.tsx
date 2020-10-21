import React from 'react';
import logoImage from '../../assets/logo.png'

import { Image, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';


const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImage} />
      <Title>Faça seu login</Title>

      <Input
        name="email"
        icon="mail"
        placeholder="E-mail"
      />
      <Input
        name="password"
        icon="lock"
        placeholder="Senha"
      />

      <Button onPress={() => console.log("Ok")}>
        Entrar
      </Button>
    </Container>
  );
};

export default SignIn;
