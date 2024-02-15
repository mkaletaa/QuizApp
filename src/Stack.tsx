import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Categories from './screens/Categories'
import Topics from './screens/Topics'
import Options from './screens/Options'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Theory from './screens/Theory'
import Quiz from './screens/Quiz'
import Summary from './screens/Summary'
import useModifyText from './hooks/useModifyText'

const Stack = createStackNavigator()

const MyStack = () => {
  const navigation = useNavigation()
  const modifyText = useModifyText()

  const header = {
    headerRight: () => (
      <Button //@ts-ignore
        onPress={() => navigation.navigate("Options")}
        title="opcje"
        color="#000"
      />
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
          ...header, //@ts-ignore
          title: `${modifyText(route.params?.categoryName)}` || 'category name',
        })}
      />

      <Stack.Screen
        name="Theory"
        component={Theory}
        options={({ route }) => ({
          ...header, //@ts-ignore
          title: `${modifyText(route.params?.categoryName)}` + ' - theory' || 'topic name',
        })}
      />

      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => ({
          ...header, //@ts-ignore
          title: `${modifyText(route.params?.topicName) || 'topic name'}`+' - quiz',
        })}
      />

      <Stack.Screen
        name="Summary"
        component={Summary}
        options={({ route }) => ({
          ...header, //@ts-ignore
          title: `${route.params?.categoryName}` + ' - quiz summary' || 'topic name',
        })}
      />

      <Stack.Screen name="Options" component={Options} />
    </Stack.Navigator>
  )
}

export default MyStack
