import * as React from 'react';
import { 
    Button, 
    Text, 
    Linking, 
    TextInput, 
    View,
    KeyboardAvoidingView, 
    StyleSheet,
    TouchableOpacity 
} from 'react-native';
import { AsyncStorage} from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default function Home({route, navigation}) {
    const { signOut } = React.useContext(AuthContext);
    
    return (
      <View style={stylePerfil.main}>
          <View style={stylePerfil.container}>
              <View style={stylePerfil.container2}>
                  <Text>Nº Inscrição: </Text>
                  <Text>Email: </Text>
              </View>
              <View style={stylePerfil.container3}>
                  <Text>{profile.email}</Text>
                  <Text>{JSON.stringify(profile.addresses)}</Text>
                  <Text>{JSON.stringify(profile.is_teacher)}</Text>
                  <Text>{JSON.stringify(profile.is_student)}</Text>
                  <Text>{JSON.stringify(profile.is_admin)}</Text>
                  <Text>{JSON.stringify(profile.token)}</Text>
                  <Text>{JSON.stringify(profile.has_institution)}</Text>
              </View>
          </View>
          <Button title="Sair" onPress={signOut} />
      </View>
    );
  }