import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

// import RenderHtml from 'react-native-render-html'
import { Colors } from '../../utils/constants'
import { renderComponent } from './_ContentRenderer'
import Paragraph from './Paragraph'

export function List({ value, width }) {
  return (
    <React.Fragment>
      <View
        style={{
          maxWidth: '100%',
          gap: 5,
        }}
      >
        {value.map((item, index) =>
          typeof item === 'object' && item !== null ? (
            // If item is an object, render using renderComponent
            renderComponent(item, width)
          ) : (
            // If item is a string, render using ListElement
            <ListElement key={index} value={item} width={width} />
          ),
        )}
      </View>
    </React.Fragment>
  )
}

export function ListElement({ value, width }) {
  let listValue =
    `<span style="margin-bottom: 0px;  font-size: 18px; color: ${Colors.text}">` +
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
        <Entypo name="dot-single" size={26} color={Colors.boldText} />
      </View>
      <View
        style={{
          width: '90%',
        }}
      >
        <Paragraph
          width={width * 0.9 - 5}
          value={listValue}
          props={undefined}
        ></Paragraph>
        {/* <RenderHtml contentWidth={width} source={{ html: listValue }} /> */}
      </View>
    </View>
  )
}
