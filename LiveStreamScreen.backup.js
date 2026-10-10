import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  ScrollView, 
  Alert 
} from 'react-native';

export default function LiveStreamScreen({ route, navigation }) {
  const { userId = 'shopon_123', userName = 'Shopon', roomId = 'deluxe_room_101' } = route?.params || {};

  // States
  const [messages, setMessages] = useState([
    { id: '1', user: 'System', text: 'Welcome to Deluxe Live Stream!' },
    { id: '2', user: 'Viewer1', text: 'Hello Shopon Bro! 🔥' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [coins, setCoins] = useState(500);
  const [activeGift, setActiveGift] = useState(null);

  // Send Message Logic
  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: Date.now().toString(),
      user: userName,
      text: inputText.trim()
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  // Send Gift Logic
  const sendGift = (giftName, price) => {
    if (coins >= price) {
      setCoins(coins - price);
      setActiveGift(`${userName} sent a ${giftName}! 🎁✨`);
      
      // Add gift message to chat
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), user: '🎁 System', text: `${userName} sent ${giftName}!` }
      ]);

      // Clear gift banner after 3 seconds
      setTimeout(() => setActiveGift(null), 3000);
    } else {
      Alert.alert("কয়েন খালি!", "আপনার পর্যাপ্ত কয়েন নেই। স্টোর থেকে রিচার্জ করুন।");
    }
  };

  return (
    <View style={styles.container}>
      {/* Video Stream Container */}
      <View style={styles.videoContainer}>
        {isCamOn ? (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.liveBadge}>🔴 LIVE</Text>
            <Text style={styles.hostName}>{userName}'s Live Stream</Text>
            <Text style={styles.roomInfo}>Room ID: {roomId}</Text>
          </View>
        ) : (
          <View style={[styles.cameraPlaceholder, { backgroundColor: '#1c1c1e' }]}>
            <Text style={{ color: '#fff', fontSize: 16 }}>📷 Camera Turned Off</Text>
          </View>
        )}

        {/* Gift Animation Overlay */}
        {activeGift && (
          <View style={styles.giftBanner}>
            <Text style={styles.giftBannerText}>{activeGift}</Text>
          </View>
        )}

        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtnText}>✕ Exit</Text>
        </TouchableOpacity>
      </View>

      {/* Control Bar (Mic / Cam / Coins) */}
      <View style={styles.controlsBar}>
        <TouchableOpacity 
          style={[styles.controlBtn, !isMicOn && styles.btnOff]} 
          onPress={() => setIsMicOn(!isMicOn)}
        >
          <Text style={styles.btnText}>{isMicOn ? '🎙️ Mic On' : '🎙️ Mic Off'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlBtn, !isCamOn && styles.btnOff]} 
          onPress={() => setIsCamOn(!isCamOn)}
        >
          <Text style={styles.btnText}>{isCamOn ? '📹 Cam On' : '📹 Cam Off'}</Text>
        </TouchableOpacity>

        <View style={styles.coinBadge}>
          <Text style={styles.coinText}>💰 {coins}</Text>
        </View>
      </View>

      {/* Gift Bar */}
      <View style={styles.giftSection}>
        <Text style={styles.sectionHeader}>Send Virtual Gifts:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.giftList}>
          <TouchableOpacity style={styles.giftItem} onPress={() => sendGift('Rose 🌹', 10)}>
            <Text style={styles.giftEmoji}>🌹</Text>
            <Text style={styles.giftName}>Rose</Text>
            <Text style={styles.giftPrice}>10 Coins</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.giftItem} onPress={() => sendGift('Heart ❤️', 50)}>
            <Text style={styles.giftEmoji}>❤️</Text>
            <Text style={styles.giftName}>Heart</Text>
            <Text style={styles.giftPrice}>50 Coins</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.giftItem} onPress={() => sendGift('Super Car 🏎️', 200)}>
            <Text style={styles.giftEmoji}>🏎️</Text>
            <Text style={styles.giftName}>Car</Text>
            <Text style={styles.giftPrice}>200 Coins</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.giftItem} onPress={() => sendGift('Rocket 🚀', 500)}>
            <Text style={styles.giftEmoji}>🚀</Text>
            <Text style={styles.giftName}>Rocket</Text>
            <Text style={styles.giftPrice}>500 Coins</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Live Chat Area */}
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.chatMessage}>
              <Text style={styles.chatUser}>{item.user}: </Text>
              <Text style={styles.chatText}>{item.text}</Text>
            </View>
          )}
        />

        {/* Chat Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Say something in live..."
            placeholderTextColor="#8e8e93"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f14' },
  videoContainer: { height: 260, width: '100%', position: 'relative' },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#2c2c3e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#ff3b30',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: 12,
  },
  hostName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  roomInfo: { color: '#aaa', fontSize: 13, marginTop: 4 },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  giftBanner: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  giftBannerText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#1a1a24',
  },
  controlBtn: {
    backgroundColor: '#28a745',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnOff: { backgroundColor: '#dc3545' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 12 },
  coinBadge: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  coinText: { color: '#ffd700', fontWeight: 'bold', fontSize: 13 },
  giftSection: { padding: 10, backgroundColor: '#14141e' },
  sectionHeader: { color: '#8e8e93', fontSize: 12, marginBottom: 8 },
  giftList: { flexDirection: 'row' },
  giftItem: {
    backgroundColor: '#232332',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 80,
  },
  giftEmoji: { fontSize: 22 },
  giftName: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginTop: 2 },
  giftPrice: { color: '#ffd700', fontSize: 10, marginTop: 2 },
  chatContainer: { flex: 1, padding: 10 },
  chatMessage: { flexDirection: 'row', marginBottom: 8, flexWrap: 'wrap' },
  chatUser: { color: '#007aff', fontWeight: 'bold', fontSize: 13 },
  chatText: { color: '#fff', fontSize: 13 },
  inputContainer: { flexDirection: 'row', marginTop: 5 },
  input: {
    flex: 1,
    backgroundColor: '#232332',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 13,
  },
  sendBtn: {
    backgroundColor: '#007aff',
    borderRadius: 20,
    paddingHorizontal: 18,
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});
