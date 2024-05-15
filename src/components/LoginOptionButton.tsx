import {HStack} from 'native-base';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Icon, IconName} from './common/Icon';
import {Text} from './common/Text';

interface LoginOptionButtonProps {
  onPress: () => void;
  title: string;
  icon: IconName;
  testId: string;
}

export const LoginOptionButton: FC<LoginOptionButtonProps> = ({
  onPress,
  title,
  icon,
  testId,
}) => {
  return (
    <Pressable onPress={onPress} testID={testId}>
      <HStack
        w="100%"
        justifyContent={'space-between'}
        borderRadius={'16px'}
        borderColor={'#E5E5E5'}
        borderWidth={1}
        alignItems={'center'}
        marginY={'4px'}
        padding={'16px'}>
        <HStack alignItems={'center'}>
          <Icon name={icon} size={33} />
          <Text typography="text-title/bold" paddingLeft={'9px'}>
            {title}
          </Text>
        </HStack>
        <Icon
          style={{justifyContent: 'flex-end', alignSelf: 'center'}}
          name="arrow-right-circle-thick"
          type="mini"
          size={24}
        />
      </HStack>
    </Pressable>
  );
};
