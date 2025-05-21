import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native';
import { Text, Card, Appbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/type';
import { useMyContextProvider } from '../store/Index';

export type Dish = {
  id: string;
  name: string;
  image: ImageSourcePropType;
};

type UserLogin = {
  fullName?: string;
  email?: string;
} | null;

type AppContext = {
  userLogin: UserLogin;
};

type CuisineProps = NativeStackScreenProps<RootStackParamList, 'Cuisine'>;

const categories: Dish[] = [
  { id: '1', name: 'Chinese', image: require('../images/chinese.png') },
  { id: '2', name: 'South Indian', image: require('../images/south-indian.png') },
  { id: '3', name: 'Beverages', image: require('../images/beverages.png') },
  { id: '4', name: 'North Indian', image: require('../images/north-indian.png') },
];

const Cuisine = ({ navigation }: CuisineProps) => {
  const [context, dispatch] = useMyContextProvider() as [AppContext, React.Dispatch<any>];
  const { userLogin } = context || {};
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!userLogin);

  useEffect(() => {
    setIsLoggedIn(!!userLogin);
  }, [userLogin]);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setIsLoggedIn(false);
    Alert.alert('Thông báo', 'Đã đăng xuất!');
  };

  const goToFoodList = (category: string) => {
    navigation.navigate('FoodList', { category });
  };

  const renderCategoryItem = ({ item }: { item: Dish }) => (
    <TouchableOpacity onPress={() => goToFoodList(item.name)}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image source={item.image} style={styles.dishImage} />
          <View style={styles.dishInfo}>
            <Text style={styles.dishName}>{item.name}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Restaurant Menu" />
        {isLoggedIn ? (
          <Appbar.Action icon="logout" onPress={handleLogout} />
        ) : (
          <Appbar.Action icon="login" onPress={handleLogin} />
        )}
      </Appbar.Header>
      {isLoggedIn && userLogin && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Xin chào, {userLogin.fullName || 'Khách hàng'}</Text>
        </View>
      )}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item: Dish) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  userInfo: { padding: 10, backgroundColor: '#e0e0e0', alignItems: 'center' },
  userText: { fontSize: 16, color: '#333' },
  list: { padding: 10, paddingBottom: 20 },
  card: { marginBottom: 10, borderRadius: 10, elevation: 3, backgroundColor: '#fff' },
  cardContent: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  dishImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  dishInfo: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dishName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});

export default Cuisine;
