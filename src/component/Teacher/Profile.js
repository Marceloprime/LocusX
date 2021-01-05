import * as React from 'react';
import { Button } from 'react-native';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlightComponent
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import {data} from '../../routes';
import { TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get("window");


export default function Profile(props){
    const [ProfileData,setProfileData] = React.useState({
        "user_id":0,
        "email":"",
        "registration_number":"",
        "addresses":[],
        "profile":{
            "teacher_id":0,
            "user":0,
            "description":null,
            "created_at":"",
            "modified_at":""},
            "is_teacher":0,
            "is_student":false,
            "is_admin":false,
            "token":"",
            "has_institution":true
    })
    async function  update(){
        try{
            const store = await AsyncStorage.getItem('@data');
            await setProfileData(store)
            console.log(ProfileData)
        }
        catch(e){
            console.error(e)
        }
    }

    update()
    
    return(
        <ScrollView style={stylePerfil.main}>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Professor</Text>
                <View>
                <TouchableOpacity style={stylePerfil.IconHead} onPress={()=>props.navigation.openDrawer()}>
                    <Icon size={32} name='menu' color='#ffffff'/>
                </TouchableOpacity>

                </View>
            </View>
            <View style={stylePerfil.container}>

                <View style={stylePerfil.DefaultViewText}>
                    <Text style={stylePerfil.DefaultText}>Nº de inscrição:</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.registration_number}</Text>
                </View>

                <View style={stylePerfil.DefaultViewText}>
                    <Text style={stylePerfil.DefaultText}>Email:</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.email}</Text>
                </View>
                <Button title='Abrir' onPress={() => props.navigation.openDrawer()}></Button>
            </View>
        </ScrollView>
     )
 }


 const stylePerfil = StyleSheet.create({
    main:{
        flex: 1,
    },  
    container:{
        display: 'flex'
    },
    head:{
        display: 'flex',
        backgroundColor: '#46DBD2',
        width: width,
        height: 40,
        display: 'flex',
        flexDirection: 'row'
    },
    TextAdm:{
        paddingLeft: 3,
        paddingTop: 7,
        fontSize: 17,
        fontWeight: 'bold'
    },
    IconHead:{
        left: width-(width*0.32),
        paddingTop: 3,
    },
    DefaultViewText:{
        borderBottomColor: "blue",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    DefaultText:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    DefaultText2:{
        marginTop: 4,
        fontSize: 17
    }
});

