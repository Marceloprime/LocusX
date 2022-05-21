import React, { useState , useEffect} from 'react';
import { 
    StyleSheet, 
    View, 
    Dimensions,
    Text,
    TouchableOpacity, 
    Modal, 
    Pressable,
    TextInput
} from 'react-native';
import MapView , {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import OpenQuestion from '../Global/QuestionInputText'
//import MultipleChoiceQuestion from '../Global/MultipleChoiceQuestion';
import MultipleChoiceQuestion from '../ContentComponents/MultipleChoiceQuestion';

const JSON5 = require('json5')


const { width, height } = Dimensions.get("window");

export default function DoAtividades(props){
    const [longitude, useLong] = useState(0);
    const [latitude, useLati] = useState(0);
    const [title, setTitle] = useState('Estudante');
    const [titleQuestion, setTitletitleQuestion] = useState('Legenda');
    const [modalVisible, setModalVisible] = useState(false);
    const [workspace, setWorkspace] = useState(
        <View>
            <View style={stylePerfil.containerSubLegenda}>
                <View style={stylePerfil.cubeAzure} ></View>
                <Text>Sua posição.</Text>
            </View>
            <View style={stylePerfil.containerSubLegenda}>
                <View style={stylePerfil.cubeRed}></View>
                <Text>Localização das tarefas a responder.</Text>
            </View>
            <View style={stylePerfil.containerSubLegenda}>
                <View style={stylePerfil.cubeGreen}></View>
                <Text>Tarefas respondidas.</Text>
            </View>
        </View>
    )
    const id_realization = props.route.params.params.id_realization
    useEffect(() => {
        setTitle(props.route.params.params.name)
    })
    var list =  [                        

    ]
    var locations = [

    ]
    try{
      
        let tasks = JSON.stringify(props.route.params.params.tasks)
        tasks = JSON.parse(tasks)
        tasks = JSON5.parse(tasks)
        
        for(const count in tasks){
            //console.log('********************\n')
            //console.log(tasks[count])
            //console.log('********************\n')
            let location = JSON5.parse(tasks[count].location)
            list.push((
                <Marker key={count+1} coordinate={{
                    latitude: parseFloat(location.latitude) ? parseFloat(location.latitude) : latitude,
                    longitude: parseFloat(location.longitude) ? parseFloat(location.longitude) : longitude,

                }} title={tasks[count].title} onPress={()=>{
                    //console.log(tasks[count].questions[0])
                    setTitletitleQuestion(tasks[count].title)
                    setWorkspace(
                        <View>
                            <View>
                                <Text>{tasks[count].title}</Text>
                                {tasks[count].questions[0] == null ? (<View><Text></Text></View>) : (
                                    <View style={stylePerfil.questionConatiner}>
                                        <Text style={styles.title}>
                                            {tasks[count].questions[0].title}
                                        </Text>
                                        <Text style={styles.questionDescription}>
                                            {tasks[count].questions[0].description}
                                        </Text>
                                        {tasks[count].questions[0].is_openQuestion == "True" ? (
                                            <View>
                                                <OpenQuestion question_id={tasks[count].questions[0].id} id_realization={id_realization}/>
                                            </View>
                                                
                                            ) : (

                                            <View>
                                                <MultipleChoiceQuestion 
                                                    id_realization={id_realization} 
                                                    question_id={tasks[count].questions[0].id}
                                                    a={tasks[count].questions[0].alternatives[0]} 
                                                    b={tasks[count].questions[0].alternatives[1]} 
                                                    c={tasks[count].questions[0].alternatives[2]} 
                                                    d={tasks[count].questions[0].alternatives[3]}/>
                                            </View>)}
                                    </View>
                                )}
                                    {tasks[count].questions[1] == null ? (<View>                                        
                                        <MultipleChoiceQuestion 
                                            id_realization={id_realization}
                                            question_id={tasks[count].questions[1].id}
                                            a={tasks[count].questions[1].alternatives[0]} 
                                            b={tasks[count].questions[1].alternatives[1]} 
                                            c={tasks[count].questions[1].alternatives[2]} 
                                            d={tasks[count].questions[1].alternatives[3]}/></View>) : (<View></View>)}
                                    {tasks[count].questions[2] == null ? (<View>                 
                                        <MultipleChoiceQuestion 
                                            id_realization={id_realization}
                                            question_id={tasks[count].questions[2].id}
                                            a={tasks[count].questions[2].alternatives[0]} 
                                            b={tasks[count].questions[2].alternatives[1]} 
                                            c={tasks[count].questions[2].alternatives[2]} 
                                            d={tasks[count].questions[2].alternatives[3]}/></View>) : (<View></View>)}
                            </View>
                        </View>
                    )
                }}></Marker>
            ))
            locations.push({latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude)})
        }
    }
    catch (e){
        console.log(e)
    }
 
    function myLocation(){
        setTimeout(()=>{
            Geolocation.getCurrentPosition(async info => {
                await useLati(info.coords.latitude)
                await useLong(info.coords.longitude)
            }) 
        },1000)      
    }


    myLocation()
    setTimeout(myLocation,5000)
    const [listTask, setListTask] = useState(list);
    const [answer, setAnswer] = useState('');
    return(
        <SafeAreaView>
            <ScrollView scrollEnabled={true} >
                <View style={stylePerfil.head}>
                    <Text style={stylePerfil.TextAdm}>{title}</Text>
                    <View style={stylePerfil.IconHead} >
                        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                            <Icon size={32} name='arrow-back' color='#000'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }} 
                        showsUserLocation={true}
                        userLocationUpdateInterval={1000}
                        onUserLocationChange={()=>{
                            myLocation()
                        }}
                    >
                    {listTask}
                    </MapView>
                    </View>
                    <View style={stylePerfil.containerActivity}>
                        <Text style={styles.title}>{titleQuestion}</Text>
                        <View style={stylePerfil.containerSubLegenda}>
                            <Text>latitude: {latitude}</Text>
                            <Text>.     .</Text>
                            <Text>longitude: {longitude}</Text>
                        </View>
                        {workspace}
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main:{
        flex : 1,
    },
    map: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height/2,
      },
    title:{
        backgroundColor: '#46DBD2',
        textAlign:'center',
        fontWeight: 'bold',
        color: '#fff'
    },
   descricao:{

    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth
   },
   questionDescription:{
    textAlign:'center',
    fontWeight: 'bold',
    color: '#000'
   },
   pergunta:{
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth
   },
   modalView: {
    margin: 20,
    marginTop: 130,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

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
        fontSize: 24,
    },
    button:{
        backgroundColor: "#8DB600",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        width: 140,
        height: 50,
        marginTop: 0,
        marginBottom: 15
    },
    buttonText:{
        fontWeight: 'bold',
        color: '#fff'
    },
    containerActivity:{
        borderColor: "#FDAF2D",
        borderWidth: 2,
        padding: 24,
        marginVertical: 8,
        backgroundColor: '#E0F8F7',
    },
    questionConatiner:{
        borderColor: "#FDAF2D",
        borderWidth: 2,
        padding: 14,
        marginVertical: 8,
        backgroundColor: '#E0F8F7',
    },
    containerSubLegenda:{
        display: 'flex',
        flexDirection: 'row'
    },
    cubeAzure:{
        width: 15,
        height: 13,
        backgroundColor: '#0FFFFF',
        borderColor: "#000",
        borderWidth: 2,
        margin: 4
    },
    cubeRed:{
        width: 15,
        height: 13,
        backgroundColor: 'red',
        borderColor: "#000",
        borderWidth: 2,
        margin: 4
    },
    cubeGreen:{
        width: 15,
        height: 13,
        backgroundColor: 'green',
        borderColor: "#000",
        borderWidth: 2,
        margin: 4
    }

});
