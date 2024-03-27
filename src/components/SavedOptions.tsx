import React, { useState } from 'react'
import { Button, Pressable, Switch, Text, View } from 'react-native'
import { takeAQuiz, reverseTheOrder } from '../../data/texts'

export default function SavedOptions({
  itemsCount,
  onPressQuiz,
  onToggleSwitch,
  isEnabled,
}) {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center', // Wyśrodkowanie w pionie
        alignItems: 'center',
        gap: 30,
        flexDirection: 'row',
        // backgroundColor: 'red',
      }}
    >
      {/* <Pressable
        style={{
          backgroundColor: 'rgb(0, 150, 255)',
          width: 100,
          padding: 10,
          elevation: 5,
          borderRadius: 3,
        }}
        onPress={onPressQuiz}
      >
        <Text>{takeAQuiz}</Text>
      </Pressable> */}
      <Button onPress={onPressQuiz} title={takeAQuiz} />
      {itemsCount > 1 && (
        <Pressable
          onPress={() => onToggleSwitch()}
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: -15,
            marginBottom: 10,

            // backgroundColor: 'blue',
          }}
        >
          <Switch onValueChange={onToggleSwitch} value={isEnabled} />
          <Text>{reverseTheOrder}</Text>
        </Pressable>
      )}
    </View>
  )
}
