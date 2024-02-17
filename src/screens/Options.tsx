import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CodeHighlighter from 'react-native-code-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const CODE_STR = `var hello = "worldggggggggg\n\n\nggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"`

export default function Options() {
  return (
    <ScrollView style={{ height: 50 }}>
      <CodeHighlighter
        hljsStyle={atomOneDarkReasonable}
        containerStyle={styles.codeContainer}
        textStyle={styles.text}
        language="typescript"
      >
        {CODE_STR}
      </CodeHighlighter>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  codeContainer: {
    padding: 16,
    backgroundColor: 'transparent', // Ustaw tło na przezroczyste
    width: '100%',
  },
  text: {
    // fontSize: 16,
    // fontFamily: 'Courier New',
  },
})
