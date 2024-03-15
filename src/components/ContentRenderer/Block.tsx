import React from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'

import { renderComponent } from '../ContentRenderer'
type blockType = 'info' | 'warning' | 'important' | 'task'

export default function Block({
  value,
  type,
}: {
  value: any
  type: blockType
}) {
  const { width } = useWindowDimensions()

  function setBgColor(type: blockType): string {
    if (type === 'info') return 'lightblue'
    else if (type === 'warning') return '#ffae17'
    else if (type === 'important') return 'tomato'
    else if (type === 'task') return '#80ff8e'
  }

  function setBorderColor(type: blockType): string {
    if (type === 'info') return '#7dadfa'
    else if (type === 'warning') return '#ff8b17'
    else if (type === 'important') return 'red'
    else if (type === 'task') return '#3dd14e'
  }

  function returnIcon(type: blockType) {
    switch (type) {
      case 'info':
        return (
          <SimpleLineIcons
            name="info"
            size={24}
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
              //   backgroundColor: 'tomato',
              width: '90%',
            }}
          >
            {
              //@ts-ignore
              value.map((item, index) =>
                renderComponent(item, width)
              )
            }
          </View>
        </React.Fragment>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    padding: 5,
    borderRadius: 3,
    borderWidth: 2,

    flexDirection: 'row',
    // flexGrow: 1,
    // gap: 5,
  },
  icon: {
    width: '10%',
    justifyContent: 'center',
    // textAlign: 'center',
  },
})
