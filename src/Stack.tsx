import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Categories from './screens/Categories'
import Settings from './screens/Settings'
// import Quiz from './screens/Quiz'
import Quiz2 from './screens/Quiz'
// import Summary from './screens/Summary'
import Theory from './screens/Theory'
import Topics from './screens/Topics'
import { removeUnderscores } from './utils/functions'
import Saved from './screens/Saved'
import { AntDesign } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'

const Stack = createStackNavigator()

const MyStack = () => {
  const navigation = useNavigation()

  const header = {
    headerRight: () => (
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          gap: 20,
          marginRight: 20,
          alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        {/* <FontAwesome6 name="fire-flame-curved" size={26} color="black" /> */}
        <View style={{ flexDirection: 'row', gap: 1 }}>
          <Text style={{ fontSize: 18, marginTop: -2 }}>10</Text>
          <Octicons name="flame" size={26} color="orange" />
        </View>
        {/* <AntDesign name="star" size={28} color="black" /> */}
        <AntDesign
          name="staro"
          size={30}
          color="black"
          //@ts-ignore
          onPress={() => navigation.navigate('Saved')}
        />
        {/* <Entypo
          //@ts-ignore
          onPress={() => navigation.navigate('Options')}
          name="dots-three-vertical"
          size={28}
          color="black"
          style={{
            // marginRight: 15,
          }}
          /> */}
        <Feather
          name="sliders"
          size={28}
          color="black"
          //@ts-ignore
          onPress={() => navigation.navigate('Options')}
        />
      </View>
    ),
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ ...header }}
      />

      <Stack.Screen
        name="Topics"
        component={Topics}
        options={({ route }) => ({
          ...header,
          title:
            //@ts-ignore
            `${removeUnderscores(route.params?.categoryName, true)}` ||
            'category name',
        })}
      />

      <Stack.Screen
        name="Theory"
        component={Theory}
        options={({ route }) => ({
          ...header,

          title:
            //@ts-ignore
            `${removeUnderscores(route.params?.categoryName, true)}` +
              ' - theory' || 'topic name',
        })}
      />

      <Stack.Screen
        name="Quiz"
        component={Quiz2}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Saved"
        component={Saved}
        options={({ route }) => ({
          ...header,
          title: 'Saved questions',
          headerStyle: {
            // backgroundColor: 'lightblue',
          },
          headerTitleStyle: {
            // color: 'darkblue',
            fontSize: 18,
            marginLeft: -20,
            // fontWeight: 'bold',
          },
        })}
      />

      {/* <Stack.Screen
        name="Summary"
        component={Summary}
        options={({ route }) => ({
          ...header, 
          title: //@ts-ignore
            `${route.params?.categoryName}` + ' - quiz summary' || 'topic name',
            
        })}
      /> */}

      <Stack.Screen name="Options" component={Settings} />
    </Stack.Navigator>
  )
}

export default MyStack
