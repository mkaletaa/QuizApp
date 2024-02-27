import React, { useState } from 'react'
import { Pressable, Switch, Text, View } from 'react-native'

export default function SavedOptions({
  onPressQuiz,
  onToggleSwitch,
  isEnabled,
}) {
  return (
    <View>
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

      <Switch onValueChange={onToggleSwitch} value={isEnabled} />
    </View>
  )
}
