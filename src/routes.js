import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const axios = require('axios');

//My components
import Home from './component/Global/Home'
import Generic from './component/Global/generic'
import DoAtividades from './component/Student/DoAtividade';
import SignUp from './component/Global/signUp'
import Login from './component/Global/Login'

const Stack = createStackNavigator();

export let auth; //Futuramente sera subtituido por redux
import {AuthContext} from './component/Global/context'
export let data;

export default function Routes({ navigation }) {
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
        //console.log('Token: '+ userToken)
        //console.log('username: '+ username)
        //console.log('password: '+ password)
        //console.log('Data: '+ data)
        axios.post('https://locusx.herokuapp.com/auth/login/',{
          "email": username,
          "password": password,
        }).then(function (response){
          //console.log(response.data.key)
          axios.get('https://locusx.herokuapp.com/api/users/myprofile/', {
            headers: {
              'Authorization': `token ${response.data.key}`
            }
          })
          .then(async (res) => {
            data = res.data 
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

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password,socialLogin) => {
        if(socialLogin){
          axios.post('https://locusx.herokuapp.com/api/users/socialLogin/',{
            "email": username,
          }).then(function (response){
            axios.get('https://locusx.herokuapp.com/api/users/myprofile/', {
              headers: {
                'Authorization': `token ${response.data.token}`
              }
            })
            .then(async (res) => {
              const jsonValue = JSON.stringify(res.data)
              data = res.data
              //await AsyncStorage.setItem('@data', jsonValue)
              await AsyncStorage.setItem('userToken',response.data.token);
              await AsyncStorage.setItem('@username',username);
              await AsyncStorage.setItem('@password',password);
              dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            })
            .catch((error) => {
              console.error(error)
            })
            return true
          }).catch(function (error){
            console.log(error)
          })      
        }
        else{
          //console.log(username)
          axios.post('https://locusx.herokuapp.com/auth/login/',{
            "email": username,
            "password": password,
          }).then(function (response){
            //console.log(response.data.key)
    
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
              dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            })
            .catch((error) => {
              console.error(error)
            })
            return true
          }).catch(function (error){
            console.log(error)
          })
        }
      },///////////////////////////////////
      signOut: async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        } catch (error) {
          console.error(error);
        }
        await AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  auth = authContext
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown: false}}>
          {state.userToken == null ? (
            <Stack.Screen name="SignIn"  component={Login} />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
          <Stack.Screen name="Atividade" component={DoAtividades}/>
          <Stack.Screen name="SignUP" component={SignUp}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}