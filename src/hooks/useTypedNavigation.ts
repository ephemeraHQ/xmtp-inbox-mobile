import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackParams';

export const useTypedNavigation = () =>
  useNavigation<NavigationProp<RootStackParams>>();
