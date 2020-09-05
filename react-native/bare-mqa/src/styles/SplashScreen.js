import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
    colors: ['#ff8978', '#ff3e6f'],
})`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const Logo = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: ${({width}) => width || '50%'};
`;

export const Text = styled.Text`
    font-size: 22px;
    color: white;
`;