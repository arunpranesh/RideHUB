import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from './StackNavigators';
import { Icon } from 'react-native-elements';
import { colors, title } from '../global/styles';
import CustomDrawerContent from './CustomDrawerContent'; // Import your custom drawer content component

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use the custom drawer content component
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <Icon
              type="material-community"
              name="home"
              color={focused ? '#7cc' : colors.grey2}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
