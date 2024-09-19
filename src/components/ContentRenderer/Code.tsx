import React from 'react'
import { StyleSheet, View } from 'react-native'
import CodeHighlighter from 'react-native-code-highlighter'
import {
  a11yDark,
  a11yLight,
  agate,
  androidstudio,
  anOldHope,
  arduinoLight,
  ascetic,
  atomOneDark,
  atomOneLight,
  dracula,
  github,
  monokaiSublime,
  nightOwl,
  solarizedDark,
  solarizedLight,
  tomorrowNight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs'

import useStore from '../../utils/store'

export default function Code({ width, props, value }) {
  const codeStyle = useStore(state => state.hljsStyle)

  
  return (
    <View
      style={{ width: width * 0.93, paddingBottom: 0 }} // można ustawić maksymalną szerokość dla większych ekranów
      >
      <CodeHighlighter
        hljsStyle={returnStyle(codeStyle)}
        textStyle={{ fontSize: 16 }}
        language={props.language}
        //@ts-ignore
        customStyle={styles.code}
        scrollViewProps={{
          contentContainerStyle: { paddingVertical: 10, paddingRight: 8 },
        }} // można ustawić szerokość na 100%
        additionalProps={{ color: returnColor(codeStyle) }}
      >
        {value}
      </CodeHighlighter>
    </View>
  )
}

const styles = StyleSheet.create({
  code: {
    overflow: 'hidden',
    borderRadius: 7,
    backgroundColor: '#111133', // domyślny kolor tła
    elevation: 4,
  },
})

  function returnStyle(codeStyle) {
    switch (codeStyle) {
      case 'nightOwl':
        return nightOwl
      case 'ascetic':
        return ascetic
      case 'a11yDark':
        return a11yDark
      case 'a11yLight':
        return a11yLight
      case 'agate':
        return agate
      case 'anOldHope':
        return anOldHope
      case 'androidstudio':
        return androidstudio
      case 'arduinoLight':
        return arduinoLight
      case 'atomOneDark':
        return atomOneDark
      case 'atomOneLight':
        return atomOneLight
      case 'dracula':
        return dracula
      case 'github':
        return github
      case 'solarizedDark':
        return solarizedDark
      case 'solarizedLight':
        return solarizedLight
      case 'monokaiSublime':
        return monokaiSublime
      case 'tomorrowNight':
        return tomorrowNight
      default:
        return nightOwl
    }
  }

  function returnColor(codeStyle) {
    switch (codeStyle) {
      case 'nightOwl':
        return '#011627'
      case 'ascetic':
        return 'white'
      case 'a11yDark':
        return '#2b2b2b'
      case 'a11yLight':
        return '#fefefe'
      case 'agate':
        return '#333'
      case 'anOldHope':
        return '#1c1d21'
      case 'androidstudio':
        return '#282b2e'
      case 'arduinoLight':
        return '#ffffff'
      case 'atomOneDark':
        return '#282c34'
      case 'atomOneLight':
        return '#fafafa'
      case 'dracula':
        return '#282a36'
      case 'github':
        return '#f8f8f8'
      case 'solarizedDark':
        return '#002b36'
      case 'solarizedLight':
        return '#fdf6e3'
      case 'monokaiSublime':
        return '#23241f'
      case 'tomorrowNight':
        return '#1d1f21'
      default:
        return '#011627'
    }
  }