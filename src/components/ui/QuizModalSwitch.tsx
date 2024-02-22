import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { Topic } from '../../utils/types'
// import { isEnabled } from 'react-native/Libraries/Performance/Systrace'

export default function QuizModalSwitch({
  topic,
  toggleTopic,
}: // isToggled,
{
  topic: Topic
  toggleTopic: (string, boolean) => void
  // isToggled: boolean
}) {
  const [isEnabled, setIsEnabled] = useState(true)
  // useEffect(() => {
  //   setIsEnabled(isToggled)
  //   console.log('first toggle')
  // }, [])

  return (
    <Pressable
      // style={{ backgroundColor: 'red' }}
      onPress={() => {
        setIsEnabled(val => !val)
        toggleTopic(topic.name, isEnabled)
      }}
    >
      <View key={topic.name} style={styles.container}>
        <View style={styles.switchContainer}>
          <Switch
            // style={{ backgroundColor: 'red' }}
            // trackColor={{ false: '#767577', true: 'lightblue' }}
            // thumbColor={isEnabled ? 'gold' : '#f4f3f4'}
            onValueChange={() => {
              setIsEnabled(val => !val)
              toggleTopic(topic.name, isEnabled)
            }}
            value={isEnabled}
          />
        </View>
        <View style={styles.textContainer}>
          {/* <View> */}

          <Text style={{ color: 'white', fontSize: 20 }}>{topic.name}</Text>
          {/* </View> */}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    gap: 10,
    // width: 200,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  switchContainer: {
    // backgroundColor: 'blue',
    width: '50%',
    paddingRight: 2,
  },
  textContainer: {
    width: '50%',
    paddingLeft: 2,
    flexGrow: 1,
    // height: '100%',
  },
})
