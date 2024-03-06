import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer'
import { sendAnEmail, removeUnderscores } from '../utils/functions'

export default function Theory({ route }) {
  const [topicName, setTopicName] = useState('')
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const scrollViewRef = useRef(null)

  useEffect(() => {
    setTopicName(route.params.topicName)
  }, [route.params])

  const handleScroll = event => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const percent =
      (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100
    setScrollPercentage(percent)
  }

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false })
    setScrollPercentage(0)
  }

  return (
    <View>
      <View
        style={{
          width: `${scrollPercentage}%`,
          height: 5,
          backgroundColor: 'green',
          position: 'absolute',
          top: 0,
          zIndex: 2,
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        scrollEventThrottle={16}
      >
        <View style={styles.progressBarContainer}>
          <StatusBar style="auto" />
        </View>
        <Text style={{ marginTop: 20, fontSize: 20 }}>
          {removeUnderscores(topicName, true)}
        </Text>
        <View style={{ marginBottom: 50 }}>
          <ContentRenderer
            content={theory[route.params.categoryName][route.params.topicName]}
          />
        </View>
        <Button
          title="report a mistake"
          color="red"
          onPress={() => {
            sendAnEmail('Topic name: ' + removeUnderscores(topicName))
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: 'lightgray',
  },
})
