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

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '2358117893-poiqnc4erelgpbpue6ege645ngab2m6s.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});

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
          console.log(dataLogin)
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
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
                        if(auth.signIn(username,password)){

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
        height: 110,
        width: 170,
        alignSelf: 'center',
        borderRadius: 25,
        overlayColor: '#46DBD2',
        
    }
  
});
  