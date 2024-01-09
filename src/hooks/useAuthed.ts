// import {useConnectionStatus, useSigner} from '@thirdweb-dev/react-native';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const useAuthed = () => {
  return useContext(AuthContext);
};
