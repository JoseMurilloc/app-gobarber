import React from 'react';
import { Image, Text } from 'react-native';

import { Container, Title } from './styles';

import logoImage from '../../assets/logo.png'

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImage} />
      <Title>Faça seu login</Title>
    </Container>
  );
};

export default SignIn;
