import styled from 'styled-components/native';

export const Background = styled.ImageBackground.attrs({
    resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView`
  background-color: blue;
`;

export const Container = styled.SafeAreaView`
  flex: 2;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: white;
  text-align: center;
  margin-top: 30px;
`;
