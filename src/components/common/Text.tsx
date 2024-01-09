import {ITextProps, Text as NativeText} from 'native-base';
import React, {FC} from 'react';
import {TextStyle} from 'react-native';
import {colors} from '../../theme/colors';

type Typography =
  | 'text-4xl/bold'
  | 'text-base/regular'
  | 'text-base/medium'
  | 'text-base/bold'
  | 'text-lg/bold'
  | 'text-lg/heavy'
  | 'text-xl/bold'
  | 'text-title/bold'
  | 'text-sm/regular'
  | 'text-sm/semibold'
  | 'text-sm/mono medium'
  | 'text-sm/heavy'
  | 'text-sm/bold'
  | 'text-xs/regular'
  | 'text-xs/mono medium'
  | 'text-xs/semi-bold'
  | 'text-xs/bold'
  | 'text-title/regular'
  | 'text-caption/regular';

const typography: Record<Typography, TextStyle> = {
  'text-4xl/bold': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  'text-base/regular': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  'text-base/medium': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  'text-base/bold': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  'text-lg/bold': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  'text-lg/heavy': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  'text-sm/mono medium': {
    fontFamily: 'SF Mono',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21,
  },
  'text-sm/semibold': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21 /* 140% */,
    letterSpacing: 0.25,
  },
  'text-xl/bold': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  'text-title/bold': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 23,
    letterSpacing: 0.5,
  },
  'text-sm/bold': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 23,
    letterSpacing: 0.5,
  },
  'text-sm/heavy': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 21,
    letterSpacing: 0.5,
  },
  'text-sm/regular': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
  'text-xs/regular': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
  'text-title/regular': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 23,
    letterSpacing: 0.5,
  },
  'text-caption/regular': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 17,
    letterSpacing: 0.5,
  },
  'text-xs/mono medium': {
    fontFamily: 'SF Mono',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: -0.5,
  },
  'text-xs/semi-bold': {
    textAlign: 'right',
    fontFamily: 'SF Pro Rounded',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: colors.primaryN200,
  },
  'text-xs/bold': {
    fontFamily: 'SF Pro Rounded',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 17,
    letterSpacing: 0.5,
  },
};

export interface TextProps extends ITextProps {
  typography?: Typography;
  children: React.ReactNode;
  style?: TextStyle;
}

export const Text: FC<TextProps> = ({
  typography: typographyName = 'text-base/regular',
  children,
  style,
  color = colors.textPrimary,
  ...rest
}) => {
  const textStyle = typography[typographyName];
  return (
    <NativeText style={[textStyle, style, {color: color as string}]} {...rest}>
      {children}
    </NativeText>
  );
};
