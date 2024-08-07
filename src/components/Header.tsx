import { SimpleLineIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { AntDesign, Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import Octicons from '@expo/vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { Tooltip } from 'react-native-paper'

import { Colors } from '../utils/constants'
import Flame from './molecules/Flame'

export default function Header({ title }) {
  const navigation = useNavigation()

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingRight: 20,
        alignItems: 'center',
        height: '100%',
        width: Dimensions.get('window').width,
      }}
    >
      {navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{
            width: 60,
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <AntDesign
            name="left"
            size={28}
            color={Colors.boldText}
            style={{
              textAlign: 'center',
            }}
          />
        </TouchableOpacity>
      )}

      <React.Fragment>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Tooltip title={title}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.boldText,
                textAlign: 'center',
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
          </Tooltip>
        </View>

        {/* <FontAwesome6 name="circle-dollar-to-slot" size={24} color="black" /> */}
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
          }}
        >
          <Flame />
          {/* <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              navigation.navigate('Saved')
            }}
          >
            <Ionicons name="bookmark-outline" size={30} color={Colors.boldText} />
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              navigation.navigate('Settings')
            }}
          >
            {/* <Feather name="sliders" size={28} color={Colors.boldText} /> */}
            <SimpleLineIcons name="menu" size={25} color={Colors.boldText} />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    </View>
  )
}
