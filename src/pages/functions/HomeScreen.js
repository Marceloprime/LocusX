import * as React from 'react';
import { Button, Text, Linking, TextInput, View,KeyboardAvoidingView, StyleSheet,TouchableOpacity } from 'react-native';
import { AsyncStorage} from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function Home({route, navigation}) {
    const {profile} = route.params;
    console.log(profile)
    return (
      <View style={stylePerfil.main}>
          
      </View>
    );
  }
  

const stylePerfil = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: '#46DBD2'
    },  
    container:{
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
    },
    container2:{
        width: 180,
        height: 600,
    },
    container3:{
        width: 180,
        height: 600,
    }
});