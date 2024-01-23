import {Box, FlatList, HStack, Image, VStack} from 'native-base';
import React, {FC, useCallback} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Linking,
  ListRenderItem,
  Pressable,
} from 'react-native';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {colors} from '../theme/colors';

interface DiscoverFullSizeFeatureCardProps {
  type: 'FULL_SIZE';
  image: ImageSourcePropType;
  header: string;
  description: string;
  buttonText: string;
  url: string;
}

const DiscoverFullSizeFeatureCard: FC<DiscoverFullSizeFeatureCardProps> = ({
  image,
  header,
  description,
  url,
  buttonText,
}) => {
  const handleButtonPress = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <Box paddingX={'16px'} paddingY={'8px'} borderRadius={'16px'}>
      <ImageBackground
        source={image}
        height={320}
        width={358}
        imageStyle={{borderRadius: 16, padding: 16}}>
        <VStack
          justifyContent={'flex-end'}
          height={320}
          width={358}
          padding={'16px'}
          flex={1}>
          <Text
            typography="text-xs/regular"
            color={colors.actionPrimaryText}
            style={{
              letterSpacing: 2,
              textTransform: 'uppercase',
              paddingBottom: 4,
            }}>
            Featured App
          </Text>
          <Text typography="text-4xl/bold" color={colors.actionPrimaryText}>
            {header}
          </Text>
          <Text
            typography="text-title/regular"
            color={colors.actionPrimaryText}
            paddingTop={'4px'}
            paddingBottom={'16px'}>
            {description}
          </Text>
          <Button
            onPress={handleButtonPress}
            paddingX={'24px'}
            endIcon={
              <Icon
                name={'chevron-right-thick'}
                size={20}
                color={colors.actionPrimaryText}
              />
            }>
            <Text
              flexShrink={1}
              typography="text-sm/bold"
              color={colors.actionPrimaryText}>
              {buttonText}
            </Text>
          </Button>
        </VStack>
      </ImageBackground>
    </Box>
  );
};

interface DiscoverFeatureCardProps {
  type: 'FEATURE_CARD';
  image: ImageSourcePropType;
  header: string;
  description: string;
  pills: {
    color?: string;
    text: string;
    url: string;
  }[];
}

const DiscoverFeatureCard: FC<DiscoverFeatureCardProps> = ({
  image,
  header,
  description,
  pills,
}) => {
  return (
    <Box paddingTop={'8px'} paddingBottom={'16px'} paddingX={'16px'}>
      <Image source={image} width={'100%'} />
      <VStack>
        <Text paddingTop={'12px'} typography="text-base/bold">
          {header}
        </Text>
        <Text paddingTop={'4px'} typography="text-sm/regular">
          {description}
        </Text>
        <HStack paddingTop={'12px'}>
          {pills.map((pill, index) => (
            <Pressable onPress={() => Linking.openURL(pill.url)} key={index}>
              <Box
                zIndex={10}
                shadow={4}
                borderRadius={'24px'}
                paddingY={'4px'}
                paddingX={'12px'}
                backgroundColor={'white'}
                marginX={'12px'}>
                <Text typography="text-caption/regular">{pill.text}</Text>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

interface DiscoverListItemProps {
  image: ImageSourcePropType;
  header: string;
  description: string;
  url: string;
}

const DiscoverListItem: FC<DiscoverListItemProps> = ({
  image,
  header,
  description,
  url,
}) => {
  return (
    <Pressable onPress={() => Linking.openURL(url)}>
      <HStack
        space={3}
        alignItems={'center'}
        w={'100%'}
        paddingTop={'8px'}
        paddingBottom={'16px'}>
        <Image source={image} height={'48px'} w={'48px'} />
        <VStack flex={1} style={{justifyContent: 'flex-end'}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            typography="text-lg/bold">
            {header}
          </Text>
          <Text numberOfLines={1} typography="text-base/regular">
            {description}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

interface DiscoverListProps {
  type: 'LIST';
  items: DiscoverListItemProps[];
}

const DiscoverList: FC<DiscoverListProps> = ({items}) => {
  return (
    <FlatList
      keyExtractor={(item, index) => `${item.header}-${index}`}
      paddingX={'16px'}
      paddingTop={'32px'}
      ListHeaderComponent={
        <Text typography="text-xl/bold" paddingBottom={'8px'}>
          {translate('xmtp_app_directory')}
        </Text>
      }
      renderItem={({item}) => <DiscoverListItem {...item} />}
      data={items}
    />
  );
};

type DiscoverItem =
  | DiscoverFullSizeFeatureCardProps
  | DiscoverFeatureCardProps
  | DiscoverListProps;

const useData = () => {
  const items: DiscoverItem[] = [
    {
      type: 'FULL_SIZE',
      image: require('../../assets/images/discover1.png'),
      header: 'Sales3',
      description:
        'Stay connected to your sales leads confidently and securely',
      buttonText: 'Visit site',
      url: 'https://sales3.com',
    },
    {
      type: 'FEATURE_CARD',
      image: require('../../assets/images/discover2.png'),
      header: 'Reverb.xyz',
      description:
        'The all-in-one voice recording app built on XMTP so you can sonically communicate with your friends and colleagues securely.',
      pills: [
        {
          text: '💬  Messaging',
          url: 'https://reverb.xyz',
        },
        {
          text: '🎧  Audio',
          url: 'https://reverb.xyz',
        },
      ],
    },
    {
      type: 'LIST',
      items: [
        {
          image: require('../../assets/images/discover3.png'),
          header: 'Relay',
          description: 'Messaging/Communication',
          url: 'https://sales3.com',
        },
        {
          image: require('../../assets/images/discover3.png'),
          header: 'SnapSnap',
          description: 'Photography',
          url: 'https://reverb.xyz',
        },
      ],
    },
  ];

  return {items};
};

export const DiscoverScreen = () => {
  const {items} = useData();
  const {goBack} = useTypedNavigation();
  const renderItem: ListRenderItem<DiscoverItem> = ({item}) => {
    if (item.type === 'FULL_SIZE') {
      return <DiscoverFullSizeFeatureCard {...item} />;
    } else if (item.type === 'FEATURE_CARD') {
      return <DiscoverFeatureCard {...item} />;
    } else if (item.type === 'LIST') {
      return <DiscoverList type={item.type} items={item.items} />;
    }
    return null;
  };

  return (
    <Screen
      title={
        <Text typography="text-lg/heavy" textAlign={'center'}>
          Discover
        </Text>
      }
      left={
        <Pressable onPress={goBack}>
          <Icon name="chevron-left-thick" />
        </Pressable>
      }
      right={<Box />}>
      <FlatList
        renderItem={renderItem}
        data={items}
        ListFooterComponent={<Box height={50} />}
      />
    </Screen>
  );
};
