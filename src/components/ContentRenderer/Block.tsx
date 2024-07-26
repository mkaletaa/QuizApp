import { AntDesign, Feather, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View, useWindowDimensions } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'

import ContentRenderer, { renderComponent } from './_ContentRenderer'
import { textColor } from '../../utils/constants'
type blockType = 'info' | 'warning' | 'important' | 'task' | 'tip'

export default function Block({
  value,
  type,
}: {
  value: any
  type: blockType
}) {
  // const { width } = useWindowDimensions()

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
          <Ionicons name="information-circle-outline" size={32} color="black" style={styles.icon}/>
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

  // const viewRef = useRef(null)
  // const [viewWidth, setViewWidth] = useState(0)

  // useEffect(() => {
  //   if (viewRef.current) {
  //     viewRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       setViewWidth(width)
  //       console.log('szerokość bloku: ', width)
  //     })
  //   }
  // }, [])

  return (
    <View
      // ref={viewRef}
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
              width: '100%', //maxWidth
              gap: 10,
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
    width: Dimensions.get('window').width * 0.9, //maxWidth
    padding: 5,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 4,

    // flexDirection: 'row',
    // flexGrow: 1,
    // gap: 5,
  },
  icon: {
    width: '10%',
    justifyContent: 'center',
    marginTop: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: textColor,
    // backgroundColor: 'green',
    // padding:0
  },
})
