import styled from 'styled-components/native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

export const Loading = styled(AnimatedEllipsis)`
  color: ${({color}) => color};
  padding-top: 0;
  margin-top: 0;
  height: 100%;
`;
