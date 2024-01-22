import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/StackParams';

export const useTypedNavigation = () =>
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
