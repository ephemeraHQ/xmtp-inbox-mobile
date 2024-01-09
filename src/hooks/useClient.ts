import {useContext} from 'react';
import {ClientContext} from '../context/ClientContext';

export const useClient = () => {
  return useContext(ClientContext);
};
