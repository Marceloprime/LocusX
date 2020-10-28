import * as React from 'react';
import { Button, Text, TextInput, View,KeyboardAvoidingView, StyleSheet } from 'react-native';
import { AsyncStorage} from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const AuthContext = React.createContext();
const Stack = createStackNavigator();
let profile

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function Home({route, navigation}) {
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



function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (

    <KeyboardAvoidingView style = {styles.background}>
      <View >
           <View>
             <Text style={styles.title}>Locus X</Text>    
          </View>
          <TextInput style={styles.inscricao} value={username} placeholder='Nº de inscrição' autoCorrect={false} onChangeText={text => { setUsername(text)}}/>
          <TextInput style={styles.senha} value={password} placeholder='Senha' autoCorrect={false} secureTextEntry={true} onChangeText={text => { setPassword(text)}}/>
          <Button style={styles.button} title="Acessar" onPress={() => {
            signIn(username, password)
            navigation.navigate('Home',{
                profile: {profile},
            })
          }} />
          <Button style={styles.button2} title='Não Tenho Conta' onPress={() => {
              console.log('Não tenho Conta')
          }} />
      </View>
    </KeyboardAvoidingView>
  );
}





export default function Login({ navigation }) {
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

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password) => {
      let request = new XMLHttpRequest();

      request.open('POST', 'http://class-path-auth.herokuapp.com/login/');

      request.setRequestHeader('Content-Type', 'application/json');

      request.onreadystatechange = function () {
          if (this.readyState === 4) {
              console.log('Status:', this.status);
              console.log('Headers:', this.getAllResponseHeaders());
              console.log('Body:', this.responseText);

              profile = JSON.parse(this.responseText) 
              dispatch({ type: 'SIGN_IN', token: profile.token });

          }
          else{
              console.log('Status:', this.status);
              console.log('Falha')
          }
      };

      let body = {
          'username': username,
          'password': password,
      };

      request.send(JSON.stringify(body));

      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
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
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
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
            <Stack.Screen name="Home"  component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  background:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#46DBD2'
  },
  title:{
      fontFamily: 'Times',
      fontSize: 64,
      fontWeight: "bold"
  },
  inscricao:{
      marginTop: 20,
      backgroundColor: "#FFFFFF",
      width: 242,
  },
  senha:{
      marginTop: 30,
      backgroundColor: "#FFFFFF",
      width: 242,
      marginBottom: 20,
  },
  button:{
      marginTop: 40,
      marginBottom: 20,
      display: "flex",
      alignItems:"center",
      justifyContent: "center",
      backgroundColor: "#3279A2",
      height: 48,
      width: 100,
  },
  button2:{
    marginTop: 40,
    display: "flex",
    alignItems:"center",
    justifyContent: "center",
    backgroundColor: "#3279B2",
    width: 100,
  },

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