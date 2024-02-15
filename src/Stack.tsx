import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import useModifyText from './hooks/useModifyText'
import Categories from './screens/Categories'
import Options from './screens/Options'
import Quiz from './screens/Quiz'
import Summary from './screens/Summary'
import Theory from './screens/Theory'
import Topics from './screens/Topics'
import { Feather } from '@expo/vector-icons'
const Stack = createStackNavigator()

const MyStack = () => {
  const navigation = useNavigation()
  const modifyText = useModifyText()

  const header = {
    headerRight: () => (
      <Entypo
        //@ts-ignore
        onPress={() => navigation.navigate('Options')}
        name="dots-three-vertical"
        size={28}
        color="black"
        style={{
          marginRight: 15,
        }}
      />

      // <Feather
      //   name="sliders"
      //   size={28}
      //   color="black"
      //   onPress={() => navigation.navigate('Options')}

      //     style={{
      //       marginRight: 15,
      //       borderRadius: 3,

      //     }}
      // />
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
          ...header, 
          title: //@ts-ignore
            `${modifyText(route.params?.categoryName)}` + ' - theory' ||
            'topic name',
        })}
      />

      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => ({
          ...header, 
          title: //@ts-ignore
            `${modifyText(route.params?.topicName) || 'topic name'}` +
            ' - quiz',
        })}
      />

      <Stack.Screen
        name="Summary"
        component={Summary}
        options={({ route }) => ({
          ...header, 
          title: //@ts-ignore
            `${route.params?.categoryName}` + ' - quiz summary' || 'topic name',
        })}
      />

      <Stack.Screen name="Options" component={Options} />
    </Stack.Navigator>
  )
}

export default MyStack
