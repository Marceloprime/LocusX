import * as React from 'react';
import { 
    FlatList,
    Image,
    ImageBackground,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions
} from 'react-native';
import {data} from '../../routes';
const { width, height } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Entypo';


export default function Profile(){
    const [info,useInfo] = React.useState()

    const ProfileStudent = async () => {
        let request = new XMLHttpRequest();
    
        request.open('GET', 'http://class-path-auth.herokuapp.com/my-class/');
        
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Token '+ data.token);
    
    
        request.onreadystatechange = async function () {
          if (this.readyState === 4) {
            console.log('/////////////////////////////////////////////');
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            let body = await JSON.parse(this.responseText,(key, value) =>{
              console.log('key: ' + key)
              console.log(value)
              console.log('///////////////////')
              return value
            });
            useInfo(body)
          }
        }
        request.send();
    }
    return(
        <View style={stylePerfil.main}>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Estudante</Text>
                <Icon style={stylePerfil.IconHead} name="user" size={20} color="white" />
            </View>
            <View style={stylePerfil.container}>
                <View style={stylePerfil.container2}>
                    <Text style={stylePerfil.DefaultText}>Nº de inscrição:</Text>
                    <Text style={stylePerfil.DefaultText}>Email:</Text>
                    <Text style={stylePerfil.DefaultText}>ID:</Text>
                </View>
                <View style={stylePerfil.container3}>
                    <Text style={stylePerfil.DefaultText2} >{data.registration_number}</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.email}</Text>
                    
                    <Button title='+' onPress={ProfileStudent}></Button>
                </View>
            </View>
        </View>
     )
 }


 const stylePerfil = StyleSheet.create({
    main:{
        flex: 1,
    },  
    container:{
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
    },
    container2:{
        width: (width*0.4),
    },
    container3:{
        display: 'flex',
        width:  (width*0.6),
    },
    head:{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46DBD2',
        width: width,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
    },
    TextAdm:{
        paddingLeft: width/10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    IconHead:{
        paddingRight: width/5
    },
    DefaultText:{
        fontWeight: 'bold'
    },
    DefaultText2:{
        textAlign: 'right'
    }
});

