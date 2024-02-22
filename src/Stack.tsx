import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Categories from './screens/Categories'
import Options from './screens/Options'
// import Quiz from './screens/Quiz'
import Quiz2 from './screens/Quiz'
// import Summary from './screens/Summary'
import Theory from './screens/Theory'
import Topics from './screens/Topics'
import { removeUnderscores } from './utils/functions'
import Report from './screens/Report'

const Stack = createStackNavigator()

const MyStack = () => {
  const navigation = useNavigation()

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
        name="Report"
        component={Report}
        options={({ route }) => ({
          ...header,
          title: 'report'
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

      <Stack.Screen name="Options" component={Options} />
    </Stack.Navigator>
  )
}

export default MyStack
