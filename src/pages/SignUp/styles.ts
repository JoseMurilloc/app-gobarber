import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #F4EDE8;
  line-height: 26px;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const BackToSigIn = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #312E38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;

`;
export const BackToSigInText = styled.Text`
  font-size: 18px;
  line-height: 18px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
