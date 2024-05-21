import {NativeBaseProvider as BaseProvider, extendTheme} from 'native-base';
import React, {FC, PropsWithChildren} from 'react';
import {colors} from '../theme/colors';

const newColorTheme = {
  primary: {
    900: colors.actionPrimary,
    800: colors.actionPrimary,
    700: colors.actionPrimary,
    600: colors.actionPrimary,
    500: colors.actionPrimary,
    400: colors.actionPrimary,
    300: colors.actionPrimary,
  },
  brand: {
    900: colors.actionPrimary,
    800: colors.actionPrimary,
    700: colors.actionPrimary,
    600: colors.actionPrimary,
    500: colors.actionPrimary,
    400: colors.actionPrimary,
    300: colors.actionPrimary,
  },
};

export const NativeBaseProvider: FC<PropsWithChildren> = ({children}) => {
  const theme = extendTheme({colors: newColorTheme});
  return <BaseProvider theme={theme}>{children}</BaseProvider>;
};
