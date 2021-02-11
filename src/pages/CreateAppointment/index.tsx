import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProviderList,
  ProviderListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles';
interface RouteParams {
  providerId: string;
}

export interface Provider{
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();

  const { user } = useAuth()
  const { goBack } = useNavigation();
  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack])

  useEffect(() => {
    api.get(`/providers`).then(response => {
      setProviders(response.data);
    })
  }, []);

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabelereiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url}} />
      </Header>
      <ProviderListContainer>
        <ProviderList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider}) => (
            <ProviderContainer
              onPress={() => handleSelectedProvider(provider.id)}
              selected={selectedProvider === provider.id}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url}} />

              <ProviderName  selected={selectedProvider === provider.id}>{provider.name}</ProviderName>
            </ProviderContainer>
          )}
        />

      </ProviderListContainer>
    </Container>
  );
};

export default CreateAppointment;