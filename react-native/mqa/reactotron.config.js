import Reactotron, {networking} from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .use(networking())
  .connect();

console.tron = Reactotron;
console.tron.clear();
