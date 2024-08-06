import {
  AntDesign,
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { textColor } from '../../utils/constants'
import ContentRenderer from './_ContentRenderer'

type blockType = 'info' | 'warning' | 'important' | 'task' | 'tip'

export default function Block({
  value,
  type,
}: {
  value: any
  type: blockType
}) {

  function setBgColor(type: blockType): string {
    if (type === 'info') return 'lightblue'
    else if (type === 'warning') return '#fcc964'
    else if (type === 'important') return '#ff765b'
    else if (type === 'task') return '#80ff8e'
    else if (type === 'tip') return '#fcf283'
  }

  function setBorderColor(type: blockType): string {
    if (type === 'info') return '#7dadfa'
    else if (type === 'warning') return 'orange'
    else if (type === 'important') return '#fc4835'
    else if (type === 'task') return '#3dd14e'
    else if (type === 'tip') return '#f9e104'
  }

  function returnIcon(type: blockType) {
    switch (type) {
      case 'info':
        return (
          <Ionicons
            name="information-circle-outline"
            size={32}
            color="black"
            style={styles.icon}
          />
        )
      case 'important':
        return (
          <AntDesign
            name="exclamationcircleo"
            size={24}
            color="black"
            style={styles.icon}
          />
        )
      case 'warning':
        return (
          <Feather
            name="alert-triangle"
            size={24}
            color="black"
            style={styles.icon}
          />
        )
      case 'task':
        return (
          <MaterialCommunityIcons
            name="dumbbell"
            size={24}
            color="black"
            style={styles.icon}
          />
        )
      case 'tip':
        return (
          <FontAwesome6
            name="lightbulb"
            size={24}
            color="black"
            style={styles.icon}
          />
        )
    }
  }

  return (
    <View
      style={[
        styles.block,
        {
          borderColor: setBorderColor(type),
          backgroundColor: setBgColor(type),
        },
      ]}
    >
      {
        <React.Fragment>
          {returnIcon(type)}
          <View
            style={{
              flexWrap: 'wrap',
              // backgroundColor: 'tomato',
              width: '95%',
              gap: 10,
              marginHorizontal: 'auto',
            }}
          >
            <ContentRenderer
              content={value}
              width={Dimensions.get('window').width * 0.9 - 8}
            ></ContentRenderer>
          </View>
        </React.Fragment>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    width: Dimensions.get('window').width * 0.9, 
    padding: 5,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 4,
  },
  icon: {
    width: '10%',
    justifyContent: 'center',
    marginTop: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: textColor,
  },
})
