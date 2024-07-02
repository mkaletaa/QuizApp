import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { savedQuestions, aboutTheApp, settings } from '../data/texts'
import Header from './components/Header'
import Chapters from './screens/Chapters'
import Quiz from './screens/Quiz'
import QuizResults from './screens/QuizResults'
import Saved from './screens/Saved'
import Settings from './screens/Settings'
import Theory from './screens/Theory'
import Topics from './screens/Topics'
import { removeUnderscores } from './utils/functions'
import About from './screens/About'
import Questions from './screens/Questions'
import { borderColor, screenBackground } from './utils/constants'

const Stack = createStackNavigator()

const MyStack = () => {
  const header = params => {
    return {
      headerRight: () => <Header title={params.title || null} />,
    }
  }

  const headerOptions = {
    title: null,

    headerStyle: {
      backgroundColor: screenBackground,

      elevation: 0,
      borderBottomColor: borderColor,
      // borderColor: borderColor,

      borderBottomWidth: 0.5,
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      display: 'none',
    },
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: null,
        // headerTransparent: true,
        headerLeft: null,
      }}
    >
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        //@ts-ignore
        options={{
          ...header({ title: null }),
          ...headerOptions,
        }}
      />

      <Stack.Screen
        name="Topics"
        component={Topics}
        options={({ route }) => ({
          ...header({
            //@ts-ignore
            title: removeUnderscores(route.params?.chapterName, true),
          }),
          ...headerOptions,
        })}
      />

      <Stack.Screen
        name="Theory"
        component={Theory}
        options={({ route }) => ({
          ...header({
            //@ts-ignore
            title: removeUnderscores(route.params?.topicName, true),
          }),
          ...headerOptions,
        })}
      />

      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="QuizResults"
        component={QuizResults}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Saved"
        component={Saved}
        options={({ route }) => ({
          ...header({
            title: savedQuestions,
          }),
          ...headerOptions,
        })}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={({ route }) => ({
          ...header({
            title: aboutTheApp,
          }),
          ...headerOptions,
        })}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => ({
          ...header({
            title: settings,
          }),
          ...headerOptions,
        })}
      />

      <Stack.Screen
        name="Questions"
        component={Questions}
        options={({ route }) => ({
          ...header({
            //@ts-ignore
            title: removeUnderscores(route.params?.topicName, true),
          }),
          ...headerOptions,
        })}
      />
    </Stack.Navigator>
  )
}

export default MyStack
