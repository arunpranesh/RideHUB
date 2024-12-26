import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { PieChart } from 'react-native-chart-kit';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [inputText, setInputText] = useState('');
  const [showContent, setShowContent] = useState(false);

  // Sample chart data (replace with actual data from Firestore)
  const [chartData, setChartData] = useState([
    {
      name: 'Terrible',
      population: 2,
      color: '#F44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Bad',
      population: 5,
      color: '#FF9800',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'OK',
      population: 8,
      color: '#FFC107',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Good',
      population: 12,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Excellent',
      population: 15,
      color: '#2196F3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]);

  // Sample vehicle mode data (sum is 58)
  const vehicleModeData = [
    { name: 'Bike / Scooter', count: 10, color: '#F44336' },
    { name: 'Auto Rickshaw', count: 8, color: '#FF9800' },
    { name: 'Car - city', count: 12, color: '#FFC107' },
    { name: 'Car - Sedan', count: 10, color: '#4CAF50' },
    { name: 'Car - MUV/SUV', count: 18, color: '#2196F3' },
  ];

  useEffect(() => {
    // Initialize Firebase Database
    const database = getDatabase();

    // Reference to the 'users' node in the Firebase Database
    const usersRef = ref(database, 'users');

    // Function to handle database updates
    const handleDatabaseUpdate = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Count the number of users
        const userKeys = Object.keys(data);
        setUserCount(userKeys.length);

        // Calculate the total number of trips
        let tripCount = 0;
        for (const userId in data) {
          const user = data[userId];
          if (user.trips) {
            tripCount += Object.keys(user.trips).length;
          }
        }
        setTotalTrips(tripCount);
      }
    };

    // Attach the listener to the 'users' node
    const usersListener = onValue(usersRef, handleDatabaseUpdate);

    // Automatically set the driver count to 14 after 8 seconds
    const driverCountTimeout = setTimeout(() => {
      setDriverCount(14);
    }, 8000);

    // Cleanup the listeners and timeout when the component unmounts
    return () => {
      // Detach the listeners
      off(usersListener);
      // Clear the timeout
      clearTimeout(driverCountTimeout);
    };
  }, []);

  // Function to handle input change
  const handleInputChange = (text) => {
    setInputText(text);
  };

  // Function to reveal content if input is "admin"
  const revealContent = () => {
    if (inputText.toLowerCase() === 'admin') {
      setShowContent(true);
    }
  };

  // Use useEffect to watch for changes in inputText and reveal content accordingly
  useEffect(() => {
    if (inputText.toLowerCase() === 'admin') {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [inputText]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      {/* Input Box */}
      {!showContent && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={handleInputChange}
            value={inputText}
            
          />
          
          <Button title="Unlock" onPress={revealContent} />
        </View>
      )}
      
      {/* Content */}
      {showContent && (
        <View>
          {/* Rest of your content here */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryCount}>{userCount}</Text>
              <Text style={styles.summaryLabel}>Total Users</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryCount}>{driverCount}</Text>
              <Text style={styles.summaryLabel}>Total Drivers</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryCount}>{totalTrips}</Text>
              <Text style={styles.summaryLabel}>Total Trips</Text>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartHeading}>Review Ratings Distribution</Text>
            <PieChart
              data={chartData}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartHeading}>Vehicle Mode Selection</Text>
            <PieChart
              data={vehicleModeData}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    width: 200,
    marginBottom: 10,
  },
  inputHint: {
    color: '#888',
    marginBottom: 10,
  },
});

export default AdminDashboard;
