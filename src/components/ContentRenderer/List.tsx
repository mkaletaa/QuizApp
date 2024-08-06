import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import RenderHtml from 'react-native-render-html'

import { boldTextColor, textColor } from '../../utils/constants'
import { renderComponent } from './_ContentRenderer'

export function List({ value, width }) {
  return (
    <React.Fragment>
      <View
        style={{
          maxWidth: '100%',
          gap: 5,
        }}
      >
        {
          //@ts-ignore
          value.map((item, index) => renderComponent(item, width))
        }
      </View>
    </React.Fragment>
  )
}

export function ListElement({ value, width }) {
  let listValue =
    `<span style="margin-bottom: 0px;  font-size: 18px; color: ${textColor}">` +
    value +
    '</span>'
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <View
        style={{
          width: '10%',
          alignItems: 'center',
        }}
      >
        <Entypo name="dot-single" size={26} color={boldTextColor} />
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
