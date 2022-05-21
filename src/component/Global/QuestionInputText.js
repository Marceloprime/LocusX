import React, { useState , useEffect} from 'react';
import { 
    StyleSheet, 
    View, 
    TouchableOpacity,
    TextInput
} from 'react-native';
const axios = require('axios');
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

async function sendAnwser(question,id_realization,answer){
    await AsyncStorage.getItem('@data')
    .then((data)=>{
        const obj = JSON.parse(data)
        AsyncStorage.getItem('userToken')
        .then((token)=>{

        let access_token = token
        axios.post('https://locusx.herokuapp.com/api/answerteacher/',{
          "answer": answer,
          "question": question,
          "activityRealization" : id_realization
        },{
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

export default (props) =>{
    const [answer, setAnswer] = useState('')
    return(
        <View>
            <TextInput  value={answer} placeholder='Sua Resposta' autoCorrect={true} onChangeText={(text) => {setAnswer(text)}}/>
            <TouchableOpacity onPress={()=>{
                sendAnwser(props.question_id,props.id_realization,answer)
            }}>
                <Icon size={32} name='send' color='green'/>
            </TouchableOpacity>
        </View>
    )
}