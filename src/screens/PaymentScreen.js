import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import UPIModal from './UPIModal'; // Import the UPIModal component

const PaymentScreen = ({ route, navigation }) => {
  const { fare, userOrigin, userDestination } = route.params;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const navigateToDriverTrack = () => {
    navigation.navigate('DriverTrackScreen', { userOrigin, userDestination });
  };

  const handleCreditCardPayment = async () => {
    // Your credit card payment logic here
  };

  const handlePaymentMethodSelect = (method) => {
    // Handle the selected UPI payment method (Google Pay, PhonePe, Paytm)
    setSelectedPaymentMethod(method);
    setIsModalVisible(false);

    // You can add logic here to initiate the UPI payment with the selected method.
    // For example, you can call a function to open the respective UPI app or payment gateway.
  };

  return (
    <ImageBackground
      source={require('../../assets/back1.jpg')} // Add your background image
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.contentContainer}>
        <Text style={styles.paymentAmount}>Payment Amount</Text>
        <Text style={styles.fareAmount}>{fare}</Text>

        <TouchableOpacity style={styles.paymentButton} onPress={navigateToDriverTrack}>
          <Text style={styles.paymentButtonText}>Pay with Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentButton} onPress={handleCreditCardPayment}>
          <Text style={styles.paymentButtonText}>
            {isLoading ? 'Processing...' : 'Pay with Credit/Debit Card'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.paymentButtonText}>UPI Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Render the UPI modal */}
      <UPIModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onPaymentMethodSelect={handlePaymentMethodSelect} navigation={navigation}  />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  paymentAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 50,
  },
  fareAmount: {
    fontSize:38,
    fontWeight: 'bold',
    color: 'white', // Customize the color
    marginBottom: 50,
  },
  paymentButton: {
    backgroundColor: 'black', // Customize the color
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default PaymentScreen;
