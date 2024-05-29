import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const useAuthed = () => {
  return useContext(AuthContext);
};
