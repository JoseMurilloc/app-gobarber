import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin-top: 48px;
  text-align: center;
`;
export const Description = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #999591;
  margin-top: 16px;
`;
export const OkButton = styled(RectButton)`
  background-color: #ff9000;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  margin-top: 24px;
  border-radius: 20px;
`;
export const OkButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
