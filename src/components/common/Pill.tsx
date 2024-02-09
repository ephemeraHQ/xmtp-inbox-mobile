import {Box, HStack, Pressable} from 'native-base';
import React, {FC, useMemo} from 'react';
import {Icon, IconName} from './Icon';
import {Text, TextProps} from './Text';

interface PillProps {
  leftIconName?: IconName;
  rightIconName?: IconName;
  text: string;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  testId?: string;
}

export const Pill: FC<PillProps> = ({
  leftIconName,
  text,
  onPress,
  rightIconName,
  size,
  testId,
}) => {
  const sizeProps = useMemo(() => {
    if (size === 'sm') {
      return {
        paddingY: '4px',
        paddingX: '4px',
      };
    } else if (size === 'lg') {
      return {
        paddingX: '16px',
        paddingY: '8px',
      };
    } else {
      return {
        paddingX: '16px',
        paddingY: '8px',
      };
    }
  }, [size]);

  const textSizeProps = useMemo((): Partial<TextProps> => {
    if (size === 'sm') {
      return {
        typography: 'text-caption/regular',
      };
    }

    return {};
  }, [size]);

  return (
    <Pressable onPress={onPress} testID={testId}>
      <Box
        {...sizeProps}
        borderRadius={'24px'}
        zIndex={10}
        backgroundColor={'white'}
        marginRight={'8px'}
        marginY={'4px'}
        justifyContent={'center'}
        alignItems={'center'}
        shadow={4}>
        <HStack>
          {leftIconName ? (
            <Icon name={leftIconName} size={16} type="mini" color="#0F172A" />
          ) : undefined}
          <Text
            typography="text-sm/heavy"
            {...textSizeProps}
            textAlign={'center'}
            paddingRight={'4px'}
            paddingLeft={'8px'}>
            {text}
          </Text>
          {rightIconName ? (
            <Icon
              name="chevron-down-thick"
              size={16}
              type="mini"
              color="#0F172A"
            />
          ) : undefined}
        </HStack>
      </Box>
    </Pressable>
  );
};
