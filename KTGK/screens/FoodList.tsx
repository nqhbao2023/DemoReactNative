import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
import { collection, addDoc, getFirestore } from '@react-native-firebase/firestore';

import { RootStackParamList } from '../type/Type';

type FoodItem = {
  id: string;
  name: string;
  type: string;
  price: number;
  image: any;
};
const sampleFoods: FoodItem[] = [
  { id: '1', name: 'Noodles', type: 'Chinese', price: 100, image: require('../images/south-indian.png') },
  { id: '2', name: 'Pizza', type: 'Chinese', price: 100, image: require('../images/pizza.png') },
  { id: '3', name: 'Dosa', type: 'South Indian', price: 80, image: require('../images/south-indian.png') },
  { id: '4', name: 'Lassi', type: 'Beverages', price: 50, image: require('../images/beverages.png') },
  { id: '5', name: 'Butter Chicken', type: 'North Indian', price: 150, image: require('../images/north-indian.png') },
];

const FoodList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'FoodList'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'FoodList'>>();
  const category = route.params.category; // Nhận category từ route

  const [cart, setCart] = useState<string[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const db = getFirestore();

  const addToCart = async (item: FoodItem) => {
    try {
      await addDoc(collection(db, 'Cart'), {
        id: item.id,
        name: item.name,
        type: item.type,
        price: item.price,
        addedAt: serverTimestamp(),
      });

      setCart([...cart, item.id]);
      setSnackbarMessage('Đã thêm vào giỏ hàng thành công!');
      setSnackbarVisible(true);
    } catch (error) {
      setSnackbarMessage('Thêm vào giỏ hàng thất bại');
      setSnackbarVisible(true);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category, // Đặt tiêu đề động theo category
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 16 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 20 }}>
            <Icon name="cart-outline" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Đăng xuất',
                'Bạn có chắc chắn muốn đăng xuất không?',
                [
                  { text: 'Hủy', style: 'cancel' },
                  {
                    text: 'Đồng ý',
                    onPress: () => navigation.navigate('Login'),
                    style: 'destructive',
                  },
                ]
              );
            }}
          >
            <Icon name="log-out-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, category]);

  // Lọc món ăn theo loại đã chọn
  const filteredFoods = sampleFoods.filter(food => food.type.toLowerCase() === category.toLowerCase());

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.price}>₹ {item.price}</Text>
      <TouchableOpacity onPress={() => addToCart(item)}>
        <Text style={styles.addToCart}>ADD TO CART</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFoods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1500}
        action={{ label: 'Đóng', onPress: () => setSnackbarVisible(false) }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default FoodList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: '#a52a2a',
    fontWeight: 'bold',
  },
  type: {
    color: '#b8860b',
    marginBottom: 4,
  },
  price: {
    color: 'green',
    fontSize: 16,
    marginBottom: 8,
  },
  addToCart: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});
