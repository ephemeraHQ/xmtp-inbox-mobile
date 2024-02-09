import Constants from 'expo-constants';
import {Box, HStack} from 'native-base';
import React, {FC} from 'react';
import {Platform, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';

interface ScreenProps {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
  containerStlye?: ViewStyle;
  includeTopPadding?: boolean;
  includeBackground?: boolean;
  testId?: string;
}

export const Screen: FC<ScreenProps> = ({
  children,
  left,
  right,
  title,
  containerStlye,
  includeTopPadding = true,
  includeBackground = true,
  testId,
}) => {
  const showHeader = left || right || title;
  return (
    <Box
      testID={testId}
      flex={1}
      backgroundColor={includeBackground ? colors.backgroundPrimary : undefined}
      paddingTop={
        includeTopPadding
          ? Platform.OS === 'ios'
            ? Constants.statusBarHeight
            : 10
          : 0
      }>
      {showHeader && (
        <HStack
          justifyContent="space-between"
          alignItems="center"
          marginY={'16px'}
          marginX={'16px'}>
          <Box flex={1}>{left ?? null}</Box>
          <Box flex={1} alignItems={'center'}>
            {title}
          </Box>
          <Box flex={1} alignItems={'flex-end'}>
            {right ?? null}
          </Box>
        </HStack>
      )}
      <Box flex={1} alignItems={'center'} style={containerStlye}>
        {children}
      </Box>
    </Box>
  );
};
