import * as React from 'react';
import {data} from '../../routes';
import Institution from '../../Screens/Institution.js';
import Teacher from '../../Screens/Teacher';
import Student from '../../Screens/Student'
import {View, Text} from 'react-native'

export default function Home(props) { 
    
    if(data.is_institution_adm === true){
        return(
            <Institution/>
        )
    }
    else if(data.is_teacher === true){
        return(
            <Teacher/>
        )
    }
    else if(data.is_student === true){
        return(
            <Student/>
        )
    }
    else{
        return(
            <View>
                <Text>Erro</Text>
            </View>
        )
    }
}
