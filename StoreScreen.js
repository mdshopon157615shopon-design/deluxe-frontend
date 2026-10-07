import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';

export default function StoreScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://deluxe-backend-1.onrender.com/api/store/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const buyItem = (item) => {
    fetch('https://deluxe-backend-1.onrender.com/api/store/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'user123', itemId: item._id }),
    })
      .then((res) => res.json())
      .then((data) => Alert.alert('Success', data.message || 'Item Purchased!'))
      .catch((err) => Alert.alert('Error', 'Failed to purchase'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deluxe Live Store</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.itemName}>{item.name || 'Store Item'}</Text>
                <Text style={styles.itemPrice}>Price: {item.price || 0} Coins</Text>
              </View>
              <TouchableOpacity style={styles.buyButton} onPress={() => buyItem(item)}>
                <Text style={styles.buyText}>Buy</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  itemName: { fontSize: 18, fontWeight: '600', color: '#222' },
  itemPrice: { fontSize: 14, color: '#666', marginTop: 4 },
  buyButton: { backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  buyText: { color: '#fff', fontWeight: 'bold' },
});
