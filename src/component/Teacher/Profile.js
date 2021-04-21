import * as React from 'react';
import { Button } from 'react-native';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import {data} from '../../routes';
import { TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get("window");


export default function Profile(props){
    const [ProfileData,setProfileData] = React.useState("")
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
                <Text style={stylePerfil.TextAdm}>Professor(a)</Text>
                <View style={stylePerfil.IconHead} >
                <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
                    <Icon size={32} name='menu' color='#ffffff'/>
                </TouchableOpacity>
                </View>
            </View>
            <Image style={stylePerfil.image} source={require('../../assets/How-to-Study-featured-image.jpg')}/>
            <View style={stylePerfil.container}>

                <View style={stylePerfil.DefaultViewText}>
                    <Text style={stylePerfil.DefaultText}>Email:</Text>
                    <Text style={stylePerfil.DefaultText2} >{ProfileData}</Text>
                </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    TextAdm:{
        paddingLeft: 5,
        paddingTop: 9,
        fontSize: 17,
        fontWeight: 'bold'
    },
    IconHead:{
        display: 'flex',
        paddingTop: 3,
        alignItems: 'flex-end',
        marginLeft: 10
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
    },
    image:{
        height: 130,
        width: width
    }
});

