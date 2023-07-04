import { HStack, Text, IconButton, CloseIcon, Pressable, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OSNotification } from 'react-native-onesignal';

type Props = {
  data: OSNotification;
  onClose: () => void;
};

export function Notification({ data, onClose }: Props) {
  const navigation = useNavigation();
  const { route, product_id } = data.additionalData as {
    route?: string;
    product_id?: string;
  };

  async function handleOnPress() {
    if (route === 'details' && product_id) {
      navigation.navigate(route, { productId: product_id });
    }

    onClose();
  }
  return (
    <Pressable
      w='full'
      p={4}
      pt={12}
      bgColor='gray.200'
      position='absolute'
      top={0}
      onPress={handleOnPress}
    >
      <HStack justifyContent='space-between' alignItems='center'>
        <Icon as={Ionicons} name='notifications-outline' size={5} color='black' mr={2} />

        <Text fontSize='md' color='black' flex={1}>
          {data.title}
        </Text>

        <IconButton
          variant='unstyled'
          _focus={{ borderWidth: 0 }}
          icon={<CloseIcon size='3' />}
          _icon={{ color: 'coolGray.600' }}
          color='black'
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}
