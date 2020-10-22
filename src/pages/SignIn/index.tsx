import React from 'react';
import logoImage from '../../assets/logo.png'

import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const SignIn: React.FC = () => {

  const navigation = useNavigation();

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
