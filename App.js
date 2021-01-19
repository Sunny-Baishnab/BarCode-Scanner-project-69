import * as React from 'react';
import { View , Image } from 'react-native';
import {createAppContainer , createSwitchNavigator} from 'react-navigation';
import ScanScreen from './Screens/ScanScreen';

export default class App extends React.Component {
  render(){
    return (
      <View>
        <Image style={{marginLeft:85 , marginTop:130}} source={require('./assets/220px-Barcode-scanner.jpg')}/>
        <AppContainer/>
      </View>
    );
  }
}

const AppNavigator = createSwitchNavigator({
      Scan:ScanScreen
})

const AppContainer = createAppContainer(AppNavigator);

