import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
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
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  Content,
} from './styles';
import { format } from 'date-fns';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();

  const { user } = useAuth();
  const { goBack } = useNavigation();
  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        console.log(response.data);
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  useEffect(() => {
    api.get(`/providers`).then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleChangeDatePicker = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleSelectorHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, [])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available: availability}) => {
        return {
          hour,
          availability,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        }
      })
  }, [availability]);

  const afterAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available: availability}) => {
        return {
          hour,
          availability,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        }
      })
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabelereiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <Content>
        <ProviderListContainer>
          <ProviderList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectedProvider(provider.id)}
                selected={selectedProvider === provider.id}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />

                <ProviderName selected={selectedProvider === provider.id}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProviderListContainer>
        <Calendar>
          <Title>Escolha a data</Title>

          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              onChange={handleChangeDatePicker}
              mode="date"
              display="calendar"
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, availability }) => (
                <Hour
                  enabled={availability}
                  selected={selectedHour === hour}
                  availability={availability}
                  key={hourFormatted}
                  onPress={() => handleSelectorHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}

            </SectionContent>
          </Section>


          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afterAvailability.map(({ hourFormatted, hour, availability }) => (
                <Hour
                  enabled={availability}
                  selected={selectedHour === hour}
                  availability={availability}
                  key={hourFormatted}
                  onPress={() => handleSelectorHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}

            </SectionContent>
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
