import * as React from 'react';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get("window");
import {data} from '../../routes';
import Head2 from '../generalUse/header_level_2'
import axios from 'axios';


let Activities = {}
const getActivity = async () =>{
    await AsyncStorage.getItem('@data')
    .then((data)=>{
        const obj = JSON.parse(data)
        AsyncStorage.getItem('userToken')
        .then((token)=>{

        let access_token = token
        axios.get('https://locusx.herokuapp.com/api/courseTeacher/',{
          headers: {
            'Authorization': `token ${access_token}`
          }
        }).then(function (response){
            let test = response.data.data
            test = JSON.stringify(test)
            test = JSON.parse(test)
            Activities = test
            console.log(Activities)
        }).catch(function (error){
          console.log(error)
        })
    }).catch(function (error){
        console.log(error)
    })

    }).catch(function (error){
        console.log(error)
    })
}

getActivity()

export default function Course(props){
    const [activities, setActivities] = React.useState(Activities)
    let list = []

    for(const count in activities){
        list.push((                             
            <View style={stylePerfil.containerActivity}>
                <Text style={stylePerfil.titleActivity} >{activities[count].name}</Text>
                <Text>{activities[count].class}</Text>
                <TouchableOpacity style={stylePerfil.button} onPress={()=>{
                    props.navigation.navigate('Atividade',{ params:{tasks: activities[count].tasks, name:activities[count].name}})
                }}><Text>Fazer</Text></TouchableOpacity>
            </View>
        ))
        console.log(activities[count].tasks)
    }

    return(
        <ScrollView style={stylePerfil.main}>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Estudante</Text>
                <View style={stylePerfil.IconHead} >
                <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
                    <Icon size={32} name='menu' color='#ffffff'/>
                </TouchableOpacity>
                </View>
            </View>
            <Image style={stylePerfil.image} source={require('../../assets/course.jpeg')}/>
            <Head2 name='Disciplinas e Cursos'/>
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
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    },
    button:{
        backgroundColor: "#FDAF2D",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        width: 100,
        height: 30
    },
    containerActivity:{
        borderColor: "#FDAF2D",
        borderWidth: 2,
        padding: 24,
        marginVertical: 8,
        backgroundColor: '#E0F8F7'
    },
    titleActivity:{
        color: "#0f6fc5",
        fontSize: 20,
        fontWeight: 'bold'
    }
});

