import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login'; // Import your LoginScreen component

const Auth = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
}
