import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import logoImage from '../../assets/logo.png'

import { Alert, Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface SiginFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { sigIn, user } = useAuth();

  console.log(user);

  const navigation = useNavigation();

  const handleSignIn = useCallback(async(data: SiginFormData) => {
    try {


     /**
      * Formulario validação via Yup scheme
      */

     formRef.current?.setErrors({});
     const scheme = Yup.object().shape({
       email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
       password: Yup.string().required('Senha é obrigatória'),
     });

     /**
      * Checando se ocorreu algum errona validação dos inputs
      */
     await scheme.validate(data, {
       abortEarly: false
     })

     /**
      * Chamando de fato a função enviando as credenciais para logar
      */

      await sigIn({
        email: data.email,
        password: data.password
      });

    //  history.push('/dashboard');

    } catch(err) {
      if (err instanceof Yup.ValidationError) {
       const errors = getValidationErrors(err)

       formRef.current?.setErrors(errors)

       return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer o login, cheque as credenciais'
      )
    }
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
            <Title>Faça seu login</Title>
          </View>

         <Form
          ref={formRef}
          onSubmit={handleSignIn}
        >
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            name="email"
            icon="mail"
            placeholder="E-mail"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <Input
            ref={passwordInputRef}
            secureTextEntry
            onSubmitEditing={() => formRef.current?.submitForm()}
            returnKeyType="send"
            name="password"
            icon="lock"
            placeholder="Senha"
          />

          <Button onPress={() => formRef.current?.submitForm()}>
            Entrar
          </Button>
         </Form>

          <ForgotPassword onPress={() => console.log("Ok")}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>

        </ScrollView>

      </KeyboardAvoidingView>

     <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
       <Icon name="log-in" size={20} color="#FF9000" />
       <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
     </CreateAccountButton>
    </>
  );
};

export default SignIn;
