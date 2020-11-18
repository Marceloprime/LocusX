import * as React from 'react';
import {data} from './routes';
import Institution from './Pages/Institution.js';
import Teacher from './Pages/Teacher';
import Student from './Pages/Student'

export default function HomeScreen() {    

    if(data.is_admin === true){
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
}