import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { colors, title } from '../global/styles';

// Import your user context or state management here
// For example:
// import { UserContext } from '../context/UserContext';

function CustomDrawerContent(props) {
  // Assuming you have a user context with the user's information
  // const { user } = useContext(UserContext);

  // Extract the user's name from the user context
  // const userName = user.name; // Replace 'name' with the actual property containing the user's name

  // If you don't have a user context, you can directly pass the user's name as a prop.
  const userName = props.userName; // Make sure to pass this prop when rendering CustomDrawerContent

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/blankProfilePic.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
