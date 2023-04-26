import React from 'react';
import {View, Text, Platform} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Button} from 'react-native-paper';

function App() {
  return (
    <PaperProvider>
      {Platform.OS === 'web' ? (
        <style type="text/css">{`
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
        }
      `}</style>
      ) : null}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{width: 200, margin: 20}}>
        <Text>React Native</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Button
        </Button>
      </View>
    </PaperProvider>
  );
}

export default App;
