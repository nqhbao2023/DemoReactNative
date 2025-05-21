import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/Type';

const PaymentSuccess = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

const handleBackHome = () => {
  navigation.navigate({ name: 'Cuisine', params: { category: 'Chinese' } });
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Complete</Text>
      <View style={styles.content}>
        <Icon name="check-circle" size={100} color="green" />
        <Text style={styles.success}>Payment Successful</Text>
        <Text style={styles.approved}>Your payment has been approved!</Text>
        <Text style={styles.amount}>₹ 1147.08</Text>
        <TouchableOpacity style={styles.button} onPress={handleBackHome}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    color: 'darkred',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  success: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 20,
  },
  approved: {
    fontSize: 16,
    color: 'green',
    marginVertical: 10,
  },
  amount: {
    fontSize: 28,
    color: '#003366',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#B22222',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
