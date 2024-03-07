import React, { useState } from 'react'
import { Pressable, Switch, Text, View } from 'react-native'

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
      <Pressable
        style={{
          backgroundColor: 'rgb(0, 150, 255)',
          width: 100,
          padding: 10,
          elevation: 5,
          borderRadius: 3,
        }}
        onPress={onPressQuiz}
      >
        <Text>TAKE A QUIZ</Text>
      </Pressable>

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
          <Text>reverse the order</Text>
        </Pressable>
      )}
    </View>
  )
}
