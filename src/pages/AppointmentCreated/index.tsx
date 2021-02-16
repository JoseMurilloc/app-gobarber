import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface ParamsProps {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as ParamsProps;

  const handleOkPress = useCallback(() => {
    reset({
      routes: [
        { name: 'Dashboard' }
      ],
      index: 0
    })
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'ás' HH:mm'h'",
      { locale: ptBR}
    )
  }, [routeParams.date])

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído com sucesso</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPress}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
