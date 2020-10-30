import React, {useState}  from 'react';
import { View, Text, StyleSheet,KeyboardAvoidingView,TextInput,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './teste1'

export default function Login({ navigation }) {

    const [inscricao, setInscricao] = useState('');
    const [senha, setSenha] = useState('');

    return(
        <KeyboardAvoidingView style = {styles.background}>
            <View>
                <Text style={styles.title}>Locus X</Text>    
            </View>
            <View>
                <TextInput style={styles.inscricao} placeholder='Nº de inscrição' autoCorrect={false} onChangeText={text => { setInscricao(text)}}/>
                <TextInput style={styles.senha} placeholder='Senha' autoCorrect={false} secureTextEntry={true} onChangeText={text => { setSenha(text)}}/>
                <TouchableOpacity onPress={login(inscricao, senha, {navigation})} style={styles.button}><Text style={styles.buttonContent}>Acessar</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
  }



function login(inscricao, senha, {navigation}){
   
    let request = new XMLHttpRequest();

    request.open('POST', 'http://class-path-auth.herokuapp.com/login/');

    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);

            const respost = JSON.parse(this.responseText) 

            //Verificacao do Token
            if(respost.token !== ''){
                console.log('Body:', respost.token);
                navigation.navigate('HomeScreen', respost)
            }
            else{
                console.log('Status:', this.status);
                console.log('Falha')
            }
        }
        else{
            console.log('Status:', this.status);
            console.log('Falha')
        }
    };

    var body = {
        'username': inscricao,
        'password': senha,
    };

    request.send(JSON.stringify(body));
    

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
    },
    button:{
        marginTop: 40,
        display: "flex",
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "#3279A2",
        height: 48
    },
    buttonContent:{
        color:"#FFFFFF",
        fontWeight: "bold",
        fontSize: 24,
    }

});