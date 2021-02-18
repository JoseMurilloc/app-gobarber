import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  UserAvatar,
  ProviderList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProviderListTitle,
} from './styles';

export interface Provider{
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {

  const { user, sigOut } = useAuth();
  const navigation = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    api.get(`/providers`).then(response => {
      setProviders(response.data);
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile')
  }, [navigation.navigate])

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigation.navigate('CreateAppointment', { providerId })
  }, [navigation.navigate])

  return (
    <Container>
      <StatusBar backgroundColor="#28262e" barStyle="light-content" />
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>

      </Header>

      <ProviderList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProviderListTitle>Cabeleireiros</ProviderListTitle>
        }
        renderItem={({ item: provider })=> (
          <ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)}>
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000"/>
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000"/>
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>

          </ProviderContainer>
        )}
      />
    </Container>
  );
}

export default Dashboard;
