import React, { useCallback, useRef } from 'react';
import logoImage from '../../assets/logo.png'

import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container,
  Title,
  BackToSigIn,
  BackToSigInText
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';

import { Form } from '@unform/mobile';


const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback((data: object) => {
    console.log(data)
  }, [])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding': undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
          <Image source={logoImage} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
            />

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

            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Form>
        </Container>

        </ScrollView>

      </KeyboardAvoidingView>

     <BackToSigIn onPress={() => navigation.goBack()}>
       <Icon name="arrow-left" size={20} color="#FFF" />
       <BackToSigInText>Voltar para logon</BackToSigInText>
     </BackToSigIn>
    </>
  );
};

export default SignUp;
