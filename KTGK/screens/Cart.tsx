import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/type';

type CartItem = {
  id: string;
  foodId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartProps = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const Cart = ({ navigation }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Cart')
      .orderBy('addedAt', 'desc')
      .onSnapshot(snapshot => {
        const items: CartItem[] = snapshot.docs.map(doc => ({
          id: doc.id,
          foodId: doc.data().foodId,
          name: doc.data().name,
          price: doc.data().price,
          quantity: doc.data().quantity ?? 1,
        }));
        setCartItems(items);
        setLoading(false);
      }, error => {
        console.error('Lỗi khi tải giỏ hàng:', error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const updateQuantity = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      Alert.alert(
        'Xóa món',
        'Bạn có muốn xóa món này khỏi giỏ hàng?',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Xóa',
            style: 'destructive',
            onPress: async () => {
              try {
                await firestore().collection('Cart').doc(item.id).delete();
              } catch (error) {
                console.error('Lỗi khi xóa món:', error);
              }
            }
          }
        ]
      );
      return;
    }

    try {
      await firestore().collection('Cart').doc(item.id).update({ quantity: newQuantity });
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
    }
  };
const saveCartToFirestore = async () => {
  try {
    const batch = firestore().batch();
    cartItems.forEach(item => {
      const itemRef = firestore().collection('Cart').doc(item.id);
      batch.update(itemRef, { quantity: item.quantity });
    });

    await batch.commit();
    console.log('Đã lưu số lượng giỏ hàng thành công');
    return true;
  } catch (error) {
    console.error('Lỗi khi lưu giỏ hàng:', error);
    return false;
  }
};

  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const offerDiscount = -18; // bạn có thể thay đổi logic tính này theo thực tế
  const taxes = +(itemsTotal * 0.08).toFixed(2);
  const deliveryCharges = 30;
  const totalPay = +(itemsTotal + offerDiscount + taxes + deliveryCharges).toFixed(2);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item, item.quantity - 1)} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item, item.quantity + 1)} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>₹ {item.price * item.quantity}</Text>
    </View>
  );

  if (loading) return <Text>Đang tải giỏ hàng...</Text>;

  if (cartItems.length === 0) {
    return <View style={styles.emptyContainer}><Text>Giỏ hàng trống</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 200 }}
      />

      <View style={styles.billContainer}>
        <Text style={styles.billTitle}>Bill Receipt</Text>
        <View style={styles.billRow}>
          <Text>Items Total</Text>
          <Text>₹ {itemsTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Offer Discount</Text>
          <Text style={{ color: 'red' }}>₹ {offerDiscount}</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Taxes (8%)</Text>
          <Text>₹ {taxes.toFixed(2)}</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Delivery Charges</Text>
          <Text>₹ {deliveryCharges}</Text>
        </View>
        <View style={[styles.billRow, { borderTopWidth: 1, borderTopColor: '#ccc', marginTop: 8, paddingTop: 8 }]}>
          <Text style={{ fontWeight: 'bold' }}>Total Pay</Text>
          <Text style={{ fontWeight: 'bold' }}>₹ {totalPay.toFixed(2)}</Text>
        </View>
      </View>

<TouchableOpacity
  style={styles.checkoutBtn}
  onPress={async () => {
    const success = await saveCartToFirestore();
    if (success) {
      navigation.navigate('PaymentSuccess');
    } else {
      Alert.alert('Lỗi', 'Không thể lưu giỏ hàng. Vui lòng thử lại.');
    }
  }}
>
  <Text style={styles.checkoutBtnText}>Proceed To Pay</Text>
</TouchableOpacity>

    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
  itemContainer: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: { fontSize: 16, fontWeight: 'bold', color: '#a52a2a', flex: 1 },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtyBtnText: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  price: { fontSize: 16, color: 'green', fontWeight: 'bold', minWidth: 80, textAlign: 'right' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  billContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 12,
    borderRadius: 8,
    elevation: 3,
  },
  billTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    fontSize: 16,
  },
  checkoutBtn: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: 'green',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
