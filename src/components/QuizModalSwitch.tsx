import React, { useState } from 'react'
import { Image, StyleSheet, Switch, Text, View } from 'react-native'
import { Topic } from '../utils/types'
// import { isEnabled } from 'react-native/Libraries/Performance/Systrace'

export default function QuizModalSwitch({
  topic,
  toggleTopic,
}: {
  topic: Topic
  toggleTopic: (string, boolean) => void
}) {
  const [isEnabled, setIsEnabled] = useState(true)

  return (
    <View key={topic.name}>
      <Text style={{ color: 'white' }}>{topic.name}</Text>
      <Switch
        trackColor={{ false: '#767577', true: 'lightblue' }}
        thumbColor={isEnabled ? 'gold' : '#f4f3f4'}
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
