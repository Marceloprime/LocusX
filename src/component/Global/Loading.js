import * as React from 'react';
import {View, Text, KeyboardAvoidingView,Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const axios = require('axios');

export let auth; //Futuramente sera subtituido por redux
import {AuthContext} from '../Global/context'
export let data;
//Tela de carregamento
export default function Loading(props) {
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
              dispatch({ type: 'RESTORE_TOKEN', token: response.data.key });
    
              data = res.data
            })
            .catch((error) => {
              console.error(error)
              props.navigation.navigate('Login')
            })
    
          }).catch(function (error){
            console.log(error)
            props.navigation.navigate('Login')
          })
    
        } catch (e) {
          console.log('Falha no Token')
          props.navigation.navigate('Login')
        }
        // After restoring token, we may need to validate it in production apps
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
      };

      bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
      () => ({
        signIn: async (username, password) => {
          console.log(username)
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
              dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            })
            .catch((error) => {
              console.error(error)
              props.navigation.navigate('Login')
            })
            return true
          }).catch(function (error){
            console.log(error)
            props.navigation.navigate('Login')
          })
        },
        signOut: async () => {
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
      <KeyboardAvoidingView style = {styles.background}>
        <View style = {styles.container}>
          <View>
             <Text style={styles.title}>Locus X</Text>  
             <Image style={styles.logo} source={require('../../src/assets/cnpq.png')}></Image>  
          </View>
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
    
    text:{
        color: '#ffffff',
        fontWeight: 'bold'
    },
    logo:{
        height: 50,
        width: 120,
        alignSelf: 'center',
        borderRadius: 20,
  
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5
    }
  
  });
  