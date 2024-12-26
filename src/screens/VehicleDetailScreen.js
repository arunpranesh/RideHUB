import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const VehicleDetailScreen = ({ route, navigation }) => {
  const { vehicle, distance, sourcePlace, destinationPlace, userOrigin, userDestination } = route.params;
  const placeInfo = `From: ${sourcePlace}, To: ${destinationPlace}`;
  const dis = `${distance.toFixed(2)} km`;

  const [isLookingForDrivers, setIsLookingForDrivers] = useState(true);
  const [driverDetails, setDriverDetails] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLookingForDrivers(false);

      // Simulate finding a driver (replace with your logic)
      const driver = {
        name: 'John Doe',
        mobile: '123-456-7890',
        licenseNumber: 'ABCD1234',
      };
      setDriverDetails(driver);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  const navigateToPayment = () => {
    saveDataToFirebase();
    navigation.navigate('PaymentScreen', { fare: calculateFare(distance, vehicle.name), userOrigin, userDestination });
  };

  const saveDataToFirebase = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const database = getDatabase();
      const dataToSave = {
        vehicleName: vehicle.name,
        distance: distance,
        sourcePlace: sourcePlace,
        destinationPlace: destinationPlace,
        fare: calculateFare(distance, vehicle.name),
      };

      push(ref(database, `/users/${userId}/trips`), dataToSave)
        .then(() => {
          console.log('Data saved to Firebase');
        })
        .catch((error) => {
          console.error('Error saving data to Firebase:', error);
        });
    } else {
      console.error('User is not authenticated.');
    }
  };

  const calculateFare = (distance, vehicleType) => {
    // Define fare rates per kilometer for each vehicle type (you can adjust these values)
    const fareRates = {
      'Bike / Scooter': {
        baseFare: 20,         // Base fare in Rupees
        perKilometerRate: 10, // Rupees per kilometer
        waitingTimeRate: 5,  // Rupees per minute of waiting
      },
      'Auto Rickshaw': {
        baseFare: 30,
        perKilometerRate: 15,
        waitingTimeRate: 7,
      },
      'Car - city': {
        baseFare: 40,
        perKilometerRate: 20,
        waitingTimeRate: 10,
      },
      'Car - Sedan': {
        baseFare: 50,
        perKilometerRate: 25,
        waitingTimeRate: 12,
      },
      'Car - MUV/SUV': {
        baseFare: 60,
        perKilometerRate: 30,
        waitingTimeRate: 15,
      },
    };
  
    const fareInfo = fareRates[vehicleType];
  
    if (!fareInfo) {
      // Handle invalid vehicle type
      return 'Invalid Vehicle Type';
    }
  
    // Calculate the fare based on distance, base fare, per-kilometer rate, and waiting time
    const baseFare = fareInfo.baseFare;
    const perKilometerRate = fareInfo.perKilometerRate;
    const waitingTimeRate = fareInfo.waitingTimeRate;
  
    const fare = baseFare + perKilometerRate * distance;
    
    // You can also add waiting time charges if applicable
    // const waitingTimeMinutes = 5; // Replace with actual waiting time
    // const waitingTimeCharge = waitingTimeRate * waitingTimeMinutes;
    // const totalFare = fare + waitingTimeCharge;
  
    return `₹${fare.toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {isLookingForDrivers ? (
          <Text style={styles.lookingForDriversText}>Looking for drivers...</Text>
        ) : (
          <Text style={styles.driverDetailsText}>Driver Details</Text>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <Image source={vehicle.image} style={styles.vehicleImage} />
        <Text style={styles.vehicleName}>{vehicle.name}</Text>
        <Text style={styles.fareText}>{calculateFare(distance, vehicle.name)}</Text>
        <Text style={styles.placeInfoText}>{placeInfo}</Text>
        <Text style={styles.placeInfoText}>{dis}</Text>

        {driverDetails && !isLookingForDrivers && (
          <View style={styles.driverDetailsContainer}>
            <Text>Name: {driverDetails.name}</Text>
            <Text>Mobile: {driverDetails.mobile}</Text>
            <Text>License Number: {driverDetails.licenseNumber}</Text>
          </View>
        )}

        {!isLookingForDrivers && (
          <TouchableOpacity
            style={styles.confirmPickupButton}
            onPress={() => {
              navigateToPayment();
            }}
          >
            <Text style={styles.confirmPickupButtonText}>Confirm Pickup</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: '#4FC2BC',
    paddingTop: 40,
    alignItems: 'center',
  },
  lookingForDriversText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  driverDetailsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  vehicleImage: {
    width: 210,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  vehicleName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  fareText: {
    fontSize: 24,
    color: '#4FC2BC',
    marginTop: 10,
  },
  confirmPickupButton: {
    backgroundColor: '#4FC2BC',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  confirmPickupButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  placeInfoText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center',
  },
  driverDetailsContainer: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF', // White background
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  
  driverDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', // Dark text color
  },
  
  driverDetailsText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666666', // Slightly darker text color
  },
  
  driverDetailsInfo: {
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD', // Light gray border on top
    paddingTop: 10,
  },
  
  driverDetailsInfoText: {
    fontSize: 16,
    color: '#333333',
  },
  
});

export default VehicleDetailScreen;
