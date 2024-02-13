import React, { useState } from 'react'
import { Image, StyleSheet, Switch, Text, View } from 'react-native'
// import { isEnabled } from 'react-native/Libraries/Performance/Systrace'

export default function QuizModalSwitch({ topic, toggleTopic }) {
  const [isEnabled, setIsEnabled] = useState(true)

  return (
    <View key={topic.name}>
      <Text style={{ color: 'white' }}>{topic.name}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={() => {
          setIsEnabled(val => !val)
          toggleTopic(topic.name, isEnabled)
        }}
        value={isEnabled}
      />
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
