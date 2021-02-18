import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #F4EDE8;
  line-height: 26px;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled(RectButton)`
  width: 100%;
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  margin: 0 auto;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  align-self: center;
`;

export const BackButton = styled(RectButton)`
  margin-top: 64px;
  background-color: #fff;
  width:500px;
`;
