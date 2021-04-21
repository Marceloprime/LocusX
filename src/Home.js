import * as React from 'react';
import {data} from './routes';
import Institution from './Pages/Institution.js';
import Teacher from './Pages/Teacher';
import Student from './Pages/Student'
import {View, Text} from 'react-native'

export default function HomeScreen(props) { 
    
    if(data.is_institution_adm === "True"){
        return(
            <Institution/>
        )
    }
    else if(data.is_teacher === "True"){
        return(
            <Teacher/>
        )
    }
    else if(data.is_student === "True"){
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
