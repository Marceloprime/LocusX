import * as React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const axios = require('axios');
const { width, height } = Dimensions.get("window");

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Mycourses(props) {
    const [data,SetData] = React.useState({
      "username":"Bem Vindo",
      "email":"email",
      "is_student":"False",
      "is_teacher":"False",
      "is_institution_adm":"False"
    }) 
    const [course, SetCourse] = React.useState([])

    const renderItem = ({ item }) => (
      <Item title={item.name} />
    );

    async function init(){
      try{
          const store = await AsyncStorage.getItem('@data');
          const token = await AsyncStorage.getItem('userToken');

          SetData(await JSON.parse(store))

          axios.get('https://locusx.herokuapp.com/api/courseTeacher/', {
            headers: {
              'Authorization': `token ${token}`
            }
          })
          .then((res) => {
            SetCourse(res.data)
            console.log(course)
            console.log("oi")
          })
          .catch((error) => {
            console.error(error)
          })
      }
      catch(e){
          console.error(e)
      }
    }

    React.useEffect(()=>{init()},[])
    return (
      <View >
          <View style={styles.head}>
                <Text style={styles.TextAdm}>Séries/Cursos</Text>
                <View style={styles.IconHead} >
                  <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
                      <Icon size={32} name='menu' color='#ffffff'/>
                  </TouchableOpacity>
                </View>
          </View>
          <FlatList
            data={course}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
      </View>
    );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})