import { AntDesign, Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'



import { Colors } from '../../utils/constants';


// import { getDailyStreak } from '../../utils/utilStorage'

export default function Flame() {
  const navigation = useNavigation()
  // const [streak, setStreak] = useState(0)

  // useEffect(() => {
  //   ;(async () => {
  //     const str = await getDailyStreak()
  //     setStreak(str)
  //   })()
  // }, [])

  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-ignore
        navigation.navigate('Achievements')
      }}
    >
      <View style={{ flexDirection: 'row', gap: 0 }}>
        <Text
          style={{
            fontSize: 15,
            marginTop: -7,
            backgroundColor: 'rgba(245, 161, 39, 0.0)',
            borderRadius: 10,
            minWidth: 20,
            paddingHorizontal: 5,
            textAlign: 'center',
            marginRight: -10,
            zIndex: 1,
          }}
        >
          {/* {streak === 0 ? null : streak} */}
        </Text>
        <FontAwesome6 name="fire-flame-curved" size={26} color={Colors.primary} />
        {/* <MaterialIcons name="star-half" size={28} color={Colors.primary}  /> */}
        {/* <Octicons name="feed-star" size={26} /> */}
        {/* <Octicons name="flame" size={26} color="orange" /> */}
      </View>
    </TouchableOpacity>
  )
}