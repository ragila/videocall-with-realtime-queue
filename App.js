import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
const initialState = {
  isAudioEnabled: true,
  status: 'disconnected',
  participants: new Map(),
  videoTracks: new Map(),
  userName: '',
  roomName: '',
  token: '',
};
const AppContext = React.createContext(initialState);
const dimensions = Dimensions.get('window')
import {SocketProvider} from './SocketProvider';
//page screen
import Register from './screen/register'
import Loby from './screen/loby'
import RuangAntrian from './screen/ruangAntrian'

export default function App() {
  const [props, setProps] = useState(initialState);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SocketProvider>
        <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="List Interview" component={Loby} />
                  <Stack.Screen name="Ruang Antrian" component={RuangAntrian} />
                <Stack.Screen name="Interview" component={Register} />
              </Stack.Navigator>
        </NavigationContainer>
      </SocketProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
