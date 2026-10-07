import React from 'react';
import LiveStreamScreen from './LiveStreamScreen';

export default function App() {
  return (
    <LiveStreamScreen 
      route={{
        params: {
          userId: 'shopon_123',
          userName: 'Shopon',
          roomId: 'deluxe_room_101'
        }
      }}
      navigation={{
        goBack: () => console.log('Exit clicked')
      }}
    />
  );
}
