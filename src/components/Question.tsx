import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const renderComponent = data => {
  const { componentType, props, value } = data
  console.log("🚀 ~ renderComponent ~ value:", data)

  switch (componentType) {
    case 'Text':
      return (
        //<View key={value}>
          <Text key={value}  {...props}>
            {value}
          </Text>
        //</View> 
      )

    case 'Image':
      return (
        // include at least width and height!
        <Image
        key={value}
          style={{
            width: 51,
            height: 51,
            // resizeMode: 'contain',
          }}
          source={{
            uri: value,
          }}
        />
      )

    default:
      return <Text {...props}>{data}</Text>
  }
}

export default function Question({ prop }) {
   const questionData = Array.isArray(prop) ? prop : [prop]


   return <View>{questionData.map((a, i) => renderComponent(a))}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
