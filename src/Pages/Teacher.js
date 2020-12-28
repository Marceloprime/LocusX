import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import {AuthContext} from '../Global/context';
import Generic from '../component/generic';
import Profile from '../component/Teacher/Profile';
import Myclasses from '../component/Teacher/Myclasses';
import Mycourses from '../component/Teacher/Mycourses';

const Drawer = createDrawerNavigator();

export default function Teacher() {  
    const { signOut } = React.useContext(AuthContext);
  
    return (
        <Drawer.Navigator initialRouteName="Perfil" drawerContent = {props =>{
            return(
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props}></DrawerItemList>
                    <DrawerItem label='Sair'inactiveBackgroundColor='#00FFFF' onPress={signOut}></DrawerItem>
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Listar Cursos" component={Generic} />
            <Drawer.Screen name="Disciplinas" component={Generic} />
            <Drawer.Screen name="Minhas turmas" component={Myclasses} />
            <Drawer.Screen name="Minhas Séries/Cursos" component={Mycourses} />
            <Drawer.Screen name="Minhas Tarefas Tarefa" component={Generic} />
        </Drawer.Navigator>
    );
}
  