import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';



import { aboutTheApp, savedQuestions, settings } from '../data/texts';
import Header from './components/Header';
import About from './screens/About';
import Chapters from './screens/Chapters';
import Questions from './screens/Questions';
import Quiz from './screens/Quiz';
import QuizResults from './screens/QuizResults';
import Saved from './screens/Saved';
import Settings from './screens/Settings';
import Theory from './screens/Theory';
import Topics from './screens/Topics';
import { Colors } from './utils/constants';
import { removeUnderscores } from './utils/functions';
import Achievements from './screens/Achievements';


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
      backgroundColor: Colors.screenBg,
      elevation: 0,
      borderBottomColor: Colors.border,
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
        //@ts-ignore
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
        //@ts-ignore
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
        //@ts-ignore
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
        //@ts-ignore
        options={({ route }) => ({
          ...header({
            title: aboutTheApp,
          }),
          ...headerOptions,
        })}
        />

      <Stack.Screen
        name="Achievements"
        component={Achievements}
        //@ts-ignore
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
        //@ts-ignore
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
        //@ts-ignore
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