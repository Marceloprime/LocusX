import React, { useState , useEffect} from 'react';
import { 
    StyleSheet, 
    View, 
    TouchableOpacity,
    TextInput,
    Text
} from 'react-native';
const axios = require('axios');
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default (props) =>{
    const [answer, setAnswer] = useState(-1)
    const [styleAlte, setStyleAlte] = useState({})
    const [styleAlte1, setStyleAlte1] = useState({})
    const [styleAlte2, setStyleAlte2] = useState({})
    const [styleAlte3, setStyleAlte3] = useState({})

    async function sendAnwser(question,alternative,activityRealization){
            console.log(question + ' ' + alternative + ' ' + activityRealization)
            await AsyncStorage.getItem('@data')
            .then((data)=>{
                const obj = JSON.parse(data)
                AsyncStorage.getItem('userToken')
                .then((token)=>{
        
                    let access_token = token
                    console.log(token)
                    axios.post('https://locusx.herokuapp.com/api/answerteacherMultipleChoice/',{
                        "question": question,
                        "alternative": alternative,
                        "activityRealization": activityRealization,
                    }, {
                    headers: {
                        'Authorization': `token ${access_token}`
                    }
                    }).then(function (response){
                    console.log(response)
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

    return (
        <View>
            <TouchableOpacity style={styleAlte} onPress={() => {
                setStyleAlte({ backgroundColor:'#74C69D'})
                setStyleAlte1({})
                setStyleAlte2({})
                setStyleAlte3({})
                setAnswer(props.a.id)
            }}>
                <Text>A-){props.a.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleAlte1} onPress={() => {
                setStyleAlte({})
                setStyleAlte1({backgroundColor:'#74C69D'})
                setStyleAlte2({})
                setStyleAlte3({})
                setAnswer(props.b.id)
            }}>
                <Text>B-){props.b.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleAlte2} onPress={() => {
                setStyleAlte({})
                setStyleAlte1({})
                setStyleAlte2({backgroundColor:'#74C69D'})
                setStyleAlte3({})
                setAnswer(props.c.id)
            }}>
                <Text>C-){props.c.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleAlte3} onPress={() => {
                setStyleAlte({})
                setStyleAlte1({})
                setStyleAlte2({})
                setStyleAlte3({backgroundColor:'#74C69D'})
                setAnswer(props.d.id)
                sendAnwser(props.question_id,props.d.id,props.id_realization)
            }}>
                <Text>D-){props.d.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                sendAnwser(props.question_id,answer,props.id_realization)
            }}>
                <Icon size={32} name='send' color='blue'/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
    }
})