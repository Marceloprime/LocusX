import * as React from 'react';
import { 
    Button, 
    Text, 
    Linking, 
    TextInput, 
    View,
    KeyboardAvoidingView, 
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
const axios = require('axios');
import HomeScreen from './Home'
import Generic from './component/generic'
import SignUp from './Global/signUp'


const Stack = createStackNavigator();
import {AuthContext} from './Global/context'

//Variaves de dados
let profile = null;
export let data;



export default function Routes() {
    
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
    let userToken;
    let username;
    let password;
    try {
      userToken = await AsyncStorage.getItem('userToken');
      username = await AsyncStorage.getItem('@username');
      password = await AsyncStorage.getItem('@password');
      data = await AsyncStorage.getItem('@data');
      console.log('Token: '+ userToken)
      console.log('username: '+ username)
      console.log('password: '+ password)
      console.log('Data: '+ data)
      axios.post('https://locusx.herokuapp.com/auth/login/',{
        "email": username,
        "password": password,
      }).then(function (response){
        console.log(response.data.key)
        axios.get('https://locusx.herokuapp.com/api/users/myprofile/', {
          headers: {
            'Authorization': `token ${response.data.key}`
          }
        })
        .then(async (res) => {
          data = res.data 
          profile = res.data 
          dispatch({ type: 'RESTORE_TOKEN', token: response.data.key });

          data = res.data
        })
        .catch((error) => {
          console.error(error)
        })

      }).catch(function (error){
        console.log(error)
      })

    } catch (e) {
      console.log('Falha no Token')
    }
    // After restoring token, we may need to validate it in production apps
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };
  
  bootstrapAsync();
  }, []);

  

  
const authContext = React.useMemo(() => ({
    signIn: async (username, password) => {
      axios.post('https://locusx.herokuapp.com/auth/login/',{
        "email": username,
        "password": password,
      }).then(function (response){
        console.log(response.data.key)
        axios.get('https://locusx.herokuapp.com/api/users/myprofile/', {
          headers: {
            'Authorization': `token ${response.data.key}`
          }
        })
        .then(async (res) => {
          const jsonValue = JSON.stringify(res.data)
          data = res.data
          await AsyncStorage.setItem('@data', jsonValue)
          await AsyncStorage.setItem('userToken',response.data.key);
          await AsyncStorage.setItem('@username',username);
          await AsyncStorage.setItem('@password',password);
          await dispatch({ type: 'SIGN_IN',token: response.data.key })
        })
        .catch((error) => {
          console.error(error)
        })
        
      }).catch(function (error){
        console.log(error)
      })
    },
    
    signOut: async () => {
      await AsyncStorage.clear();
      dispatch({ type: 'SIGN_OUT' })
    },
    
    signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
  
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
      }),
      []
    );
  
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer >
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={LoginScreen} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}//tela do login
                options={{
                  title: 'Locus X',
              // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            ) : (
              // User is signed in
              <Stack.Screen name="Home"  component={HomeScreen} />
            )}
            <Stack.Screen name="SignUP" component={SignUp}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }


function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPas, setShow] = React.useState(true)

  const eye = <Icon name="eye" size={20} color="grey" />;
  const eyeWithLine = <Icon name="eye-with-line" size={20} color="grey" />;
  const [eyes, setEyes] = React.useState(eye)


  const { signIn } = React.useContext(AuthContext);

  return (

    <KeyboardAvoidingView style = {styles.background}>
      <View style = {styles.container}>
           <View>
             <Text style={styles.title}>Locus X</Text>  
             <Image style={styles.logo} source={require('./assets/cnpq.png')}></Image>  
          </View>
          <TextInput style={styles.inscricao} value={username} placeholder='Email' autoCorrect={true} onChangeText={text => { setUsername(text)}}/>
          <View style={styles.senha}>
          <TextInput  value={password} placeholder='Senha' autoCorrect={false} secureTextEntry={showPas} onChangeText={text => { setPassword(text)}}/>
          <TouchableOpacity style={styles.iconEye} onPress={ async () => {
                if(showPas === true){
                  setShow(false)
                  setEyes(eye)
                }
                else{
                  setShow(true)
                  setEyes(eyeWithLine)
                }            

              }} >{eyes}</TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} 
          onPress={() => {signIn(username, password)}} >
            <Text style={styles.text}>Acessar</Text></TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonSignUp} onPress={ async () => {
            navigation.navigate('SignUP')
          }} ><Text style={styles.text}>Não Tenho conta</Text></TouchableOpacity>
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
      marginTop: 0,
      marginBottom: 20,
      fontFamily: 'Times',
      fontSize: 64,
      fontWeight: "bold"
  },
  inscricao:{
      marginTop: 20,
      backgroundColor: "#FFFFFF",
      width: 242,
      borderRadius: 12,
      paddingLeft: 10,
  },
  senha:{
      marginTop: 35,
      backgroundColor: "#FFFFFF",
      width: 242,
      marginBottom: 20,
      borderRadius: 12,
      paddingLeft: 10,
  },
  iconEye:{
    position: 'absolute',
    top: 15,
    left: 210,
    width: 30,
    height: 42,
    bottom: 20,
  },
  button:{
      marginTop: 15,
      marginBottom: 15,
      display: "flex",
      alignItems:"center",
      justifyContent: "center",
      height: 48,
      width: 180,
      backgroundColor: 'green',
      borderRadius: 20,
  },
  buttonSignUp:{
    marginTop: 5,
    marginBottom: 20,
    display: "flex",
    alignItems:"center",
    justifyContent: "center",
    height: 48,
    width: 180,
    backgroundColor: 'blue',
    borderRadius: 20,
},
  text:{
      color: '#ffffff',
      fontWeight: 'bold'
  },
  logo:{
      height: 50,
      width: 120,
      alignSelf: 'center',
      borderRadius: 20,

  }

});
