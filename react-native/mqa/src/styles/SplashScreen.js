import styled from 'styled-components/native';

export const Container = styled.View``;

export const Logo = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 90%;
    height: 90%;
`;

export const Text = styled.Text`
    font-size: 22px;
    color: white;
`;