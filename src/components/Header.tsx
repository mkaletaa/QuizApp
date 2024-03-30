import React from "react"
import { View, Text } from "react-native"
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'


export default function Header(){
  const navigation = useNavigation()

    return (
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
    )
}