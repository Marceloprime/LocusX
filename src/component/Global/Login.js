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
import Icon from 'react-native-vector-icons/Entypo';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {auth} from  '../../routes'

GoogleSignin.configure({"installed":{"client_id":"2358117893-m16rfvmk03nhm4oak782bct5u0nh6uvc.apps.googleusercontent.com","project_id":"locusx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}});

export default function Login(props){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPas, setShow] = React.useState(true);
    const [loading, setLoading] = React.useState('Acessar');
    const [dataLogin, setDataLogin] = React.useState({})
  
    const eye = <Icon name="eye" size={20} color="grey" />;
    const eyeWithLine = <Icon name="eye-with-line" size={20} color="grey" />;
    const [eyes, setEyes] = React.useState(eye);

    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setDataLogin({ userInfo });
          auth.signIn(userInfo.user.email,password,true)
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log(error)
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log(error)
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log(error)
          } else {
            // some other error happened
            console.log(error)
          }
        }
    }

    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        setDataLogin({ currentUser });
        console.log(dataLogin)
    };

    const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setDataLogin({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
    };

    return(
        <KeyboardAvoidingView style = {styles.background}>
            <View style = {styles.container}>
                <View>
                    <Image style={styles.logo} source={require('../../assets/earth.gif')}></Image>  
                    <Text style={styles.title}>Locus X</Text>  
                </View>
                <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                 />
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
                onPress={() => {
                        if(auth.signIn(username,password,false)){

                        }
                        else{
                            console.log('teste')
                        }
                    }} >
                    <Text style={styles.text}>{loading}</Text></TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonSignUp} onPress={()=>{props.navigation.navigate('SignUP')}} ><Text style={styles.text}>Não Tenho conta</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
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
        fontFamily: 'Times',
        fontSize: 64,
        fontWeight: "bold"
    },
    inscricao:{
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        width: 282,
        borderRadius: 4,
        paddingLeft: 10,
    },
    googleButton:{
        width: 290,
        height: 50
    },
    senha:{
        marginTop: 15,
        backgroundColor: "#FFFFFF",
        width: 282,
        borderRadius: 4,
        marginBottom: 20,
        paddingLeft: 10,
    },
    iconEye:{
      position: 'absolute',
      top: 15,
      left: 250,
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
        width: 220,
        backgroundColor: 'green',
        borderRadius: 12,
    },
    buttonSignUp:{
      marginTop: 5,
      marginBottom: 20,
      display: "flex",
      alignItems:"center",
      justifyContent: "center",
      height: 48,
      width: 220,
      backgroundColor: 'blue',
      borderRadius: 12,
  },
    text:{
        color: '#ffffff',
        fontWeight: 'bold'
    },
    logo:{
        height: 110,
        width: 170,
        alignSelf: 'center',
        borderRadius: 25,
        overlayColor: '#46DBD2',
        
    }
  
});
  