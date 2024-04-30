import React from 'react'
import { View } from 'react-native'
import { renderComponent } from './_ContentRenderer'
import { Entypo } from '@expo/vector-icons'
import RenderHtml from 'react-native-render-html'

export function List({ value, width }) {
  return (
    <React.Fragment>
      <View
        style={{
          // backgroundColor: 'lightblue',
          maxWidth: '100%',
          gap: 5,
          //
        }}
      >
        {
          //@ts-ignore tutaj można też ListElement zamiast renderComponent
          value.map((item, index) => renderComponent(item, width))
        }
      </View>
    </React.Fragment>
  )
}

export function ListElement({ value, width }) {
  // console.warn(value)
  let listValue =
    '<span style="margin-bottom: 0px;  font-size: 18px">' + value + '</span>'
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'blue',
      }}
    >
      <View
        style={{
          width: '10%',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <Entypo name="dot-single" size={26} color="black" />
      </View>
      <View
        style={{
          width: '90%',
        }}
      >
        <RenderHtml contentWidth={width} source={{ html: listValue }} />
      </View>
    </View>
  )
}
