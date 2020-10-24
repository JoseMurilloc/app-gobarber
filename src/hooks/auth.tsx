import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import api from "../services/api";

interface AuthState {
  token: string;
  user: object;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;

  sigIn(credentials: Credentials): Promise<void>;
  sigOut(): void;
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

  useEffect(() => {

    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet(['@GBB:token', '@GBB:user']);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) })
      }

    }

    loadStorageData();

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

    setData({ token, user });
  }, [])


  const sigOut = useCallback(async () => {

    await AsyncStorage.multiRemove(['@GBB:token', '@GBB:user']);

    setData({ } as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, sigIn, sigOut }}>
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
