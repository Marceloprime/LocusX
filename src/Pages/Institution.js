import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList,useIsDrawerOpen } from '@react-navigation/drawer';


import {AuthContext} from '../Global/context';

import Generic from '../component/generic'
import List_courses from '../component/Adm/List_courses'
import Profile from '../component/Adm/Profile'


const Drawer = createDrawerNavigator();

export default function Institution() {    
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
            <Drawer.Screen name="Listar Cursos" component={List_courses} />
            <Drawer.Screen name="Disciplinas" component={Generic} />
            <Drawer.Screen name="Usuarios" component={Generic} />
            <Drawer.Screen name="Sobre" component={Generic} />
        </Drawer.Navigator>
    );
}
