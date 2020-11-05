import * as React from 'react';
import {data} from '../routes';
import Institution from '../pages/Institution';
import Teacher from '../pages/Teacher';
import Student from '../pages/Student'


export default function Home() {    
    
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