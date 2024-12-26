import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LogoutScreen({ navigation }) {
  const handleLogout = () => {
        navigation.navigate('LoginScreen');
      };

  return (
    <View>
      <Text>Logout Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
