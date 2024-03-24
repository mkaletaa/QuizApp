import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Chapters from './screens/Chapters'
import Settings from './screens/Settings'
import Quiz from './screens/Quiz'
import Theory from './screens/Theory'
import Topics from './screens/Topics'
import Saved from './screens/Saved'
import { removeUnderscores } from './utils/functions'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'


const Stack = createStackNavigator()

const MyStack = () => {
  const navigation = useNavigation()

  // Ustawienie słuchacza na otrzymywanie powiadomień
// Notifications.addNotificationReceivedListener(notification => {
//   console.log(notification)
// })

// Ustawienie powiadomienia
// Notifications.scheduleNotificationAsync({
//   content: {
//     title: 'Powiadomienie',
//     body: 'Nowe powiadomienie!',
//   },
//   trigger: {
//     seconds: 5, // Po jakim czasie ma zostać wysłane powiadomienie
//   },
// })


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
        {/* <View style={{ flexDirection: 'row', gap: 1 }}>
          <Text style={{ fontSize: 18, marginTop: -2 }}>10</Text>
          <Octicons name="flame" size={26} color="orange" />
        </View> */}

 
        {/* <FontAwesome6 name="circle-dollar-to-slot" size={24} color="black" /> */}
     

        <Ionicons
          name="bookmark-outline"
          size={30}
          color="black"
          //@ts-ignore
          onPress={() => navigation.navigate('Saved')}
        />
    
        {/* <Feather
          name="sliders"
          size={28}
          color="black"
          //@ts-ignore
          onPress={() => navigation.navigate('Options')}
        /> */}
      </View>
    ),
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{ ...header }}
      />

      <Stack.Screen
        name="Topics"
        component={Topics}
        options={({ route }) => ({
          ...header,
          title:
            //@ts-ignore
            `${removeUnderscores(route.params?.chapterName, true)}` ||
            'chapter name',
        })}
      />

      <Stack.Screen
        name="Theory"
        component={Theory}
        options={({ route }) => ({
          ...header,

          title:
            //@ts-ignore
            `${removeUnderscores(route.params?.chapterName, true)}` +
              ' - theory' || 'topic name',
        })}
      />

      <Stack.Screen
        name="Quiz"
        component={Quiz}
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

      <Stack.Screen name="Options" component={Settings} />
    </Stack.Navigator>
  )
}

export default MyStack
