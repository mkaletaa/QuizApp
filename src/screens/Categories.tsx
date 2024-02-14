import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../../data/data'

export default function Categories() {
  const navigation = useNavigation()

  useEffect(() => {
    if (categories.length === 1) 
      // @ts-ignore
      navigation.navigate('Topics', { categoryName: categories[0].name })
    
  }, [])

  const onPressButton = catName => {
    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {categories.map(cat => (
        <View key={cat.name}>
          <Text>{cat.des}</Text>
          <Button title={cat.name} onPress={() => onPressButton(cat.name)} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
