import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { savedQuestions } from '../data/texts'
import Header from './components/Header'
import Chapters from './screens/Chapters'
import Quiz from './screens/Quiz'
import Saved from './screens/Saved'
import Settings from './screens/Settings'
import Theory from './screens/Theory'
import Topics from './screens/Topics'
import { removeUnderscores } from './utils/functions'
import Settings2 from './screens/Settings2'
import Settings3 from './screens/Settings3'
import About from './screens/About'

const Stack = createStackNavigator()

const MyStack = () => {

  const header = {
    headerRight: () => <Header />
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{ ...header, title: '' }}
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
            `${removeUnderscores(route.params?.topicName, true)}` ||
            'topic name',
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
          title: savedQuestions,
          headerStyle: {
            // backgroundColor: 'lightblue',
          },
          headerTitleStyle: {
            // color: 'darkblue',
            // fontSize: 18,
            // marginLeft: -20,
            // fontWeight: 'bold',
          },
        })}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={({ route }) => ({
          ...header,
          title: "About the App",

        })}
      />

      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Settings2" component={Settings2} />
      <Stack.Screen name="Settings3" component={Settings3} />
    </Stack.Navigator>
  )
}

export default MyStack
