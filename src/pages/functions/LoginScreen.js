import * as React from 'react';
import { Button, Text, Linking, TextInput, View,KeyboardAvoidingView, StyleSheet,TouchableOpacity } from 'react-native';
import { AsyncStorage} from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './HomeScreen'
import login from './login'

const Stack = createStackNavigator();
const supportedURL = "https://google.com";


export default function LoginScreen({ navigation }) {
    return (
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginCertification}//tela do login
                options={{
                  title: 'Locus X',
                }}
              />
              <Stack.Screen name="Home"  component={Home} />
              <Stack.Screen name="CreateInstitution"  component={CreateInstitution} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
  


const OpenURLButton = ({ url, children }) => {
  const handlePress = React.useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};


//Criar instituição
function CreateInstitution({navigation}) {
    return (
        <View style={styles.container}>
          <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
        </View>
      );
  }
  

function  LoginCertification({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (

    <KeyboardAvoidingView style = {styles.background}>
      <View style = {styles.container}>
           <View>
             <Text style={styles.title}>Locus X</Text>    
          </View>
          <TextInput style={styles.inscricao} value={username} placeholder='Nº de inscrição' autoCorrect={false} onChangeText={text => { setUsername(text)}}/>
          <TextInput style={styles.senha} value={password} placeholder='Senha' autoCorrect={false} secureTextEntry={true} onChangeText={text => { setPassword(text)}}/>
          
          <TouchableOpacity style={styles.button} onPress={() => {
            let profile = login(username, password)
            console.log('LoginScreen ' + JSON.stringify(profile) )
            navigation.navigate('Home',{
                
            })
          }} ><Text style={styles.text}>Acessar</Text></TouchableOpacity>
          
          <TouchableOpacity style={styles.button2} onPress={() => {
             navigation.navigate('CreateInstitution')
          }}><Text style={styles.text}>Não Tenho Conta</Text></TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}














const styles = StyleSheet.create({
  background:{
      flex: 1,
      backgroundColor: '#46DBD2'
  },
  container:{
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
      marginTop: 20,
      fontFamily: 'Times',
      fontSize: 64,
      fontWeight: "bold"
  },
  inscricao:{
      marginTop: 40,
      backgroundColor: "#FFFFFF",
      width: 242,
  },
  senha:{
      marginTop: 35,
      backgroundColor: "#FFFFFF",
      width: 242,
      marginBottom: 20,
  },
  button:{
      marginTop: 10,
      marginBottom: 20,
      display: "flex",
      alignItems:"center",
      justifyContent: "center",
      height: 48,
      width: 180,
      backgroundColor: 'green'
  },
  button2:{
    marginTop: 10,
    display: "flex",
    alignItems:"center",
    justifyContent: "center",
    backgroundColor: "#3279A2",
    height: 48,
    width: 180,
  },
  text:{
      color: '#ffffff',
      fontWeight: 'bold'
  }

});

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