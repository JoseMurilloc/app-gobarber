import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;

  sigIn(credentials: Credentials): Promise<void>;
  sigOut(): void;
  updatedAvatar(user: User): Promise<void>;
}

/**
 * Criando o contexto incializando vázio
 */
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/**
 * O Componente de fato que irá encapsular os demais que pertecem
 * a esse contexto de autentificação
 */
const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet(['@GBB:token', '@GBB:user']);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) })
      }

    }

    loadStorageData();

    setLoading(false)

  }, [])

  /**
   * Login de fato (chamando api post "/sessions")
   */
  const sigIn = useCallback(async ({ email, password}) => {
    const response = await api.post('/sessions', {
      email,
      password
    })

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GBB:token', token],
      ['@GBB:user', JSON.stringify(user)]
    ])

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, [])


  const sigOut = useCallback(async () => {

    await AsyncStorage.multiRemove(['@GBB:token', '@GBB:user']);

    setData({ } as AuthState);
  }, [])

  const updatedAvatar = useCallback(async(user: User) => {
    await AsyncStorage.setItem('@GBB:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    })
  }, [setData, data.token])


  return (
    <AuthContext.Provider value={{
      user: data.user,
      loading,
      sigIn,
      sigOut,
      updatedAvatar
    }}>
      { children }
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a Authentication')
  }

  return context;
}

export { AuthProvider, useAuth }
