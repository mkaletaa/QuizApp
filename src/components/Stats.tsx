import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'

export default function Stats({ onClose, catOrTop }) {
  return (
    <View
      style={{
        height: '80%',
        width: '90%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        marginTop: 50
      }}
    >
      <AntDesign
        onPress={() => onClose()}
        name="closesquare"
        size={34}
        color="black"
      />
      {catOrTop === 'cat' ? (
        <React.Fragment>
          <Text>Ile topików:</Text>
          <Text>ile pytań:</Text>
          <Text>dupa</Text>
          <Text>dupa</Text>
        </React.Fragment>
      ) : null}
    </View>
  )
}
