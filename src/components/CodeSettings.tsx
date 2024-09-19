import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { selectCodeTheme } from '../../data/texts'
import { Colors } from '../utils/constants'
import useStore from '../utils/store'
import { setValue } from '../utils/utilStorage'
import ContentRenderer from './ContentRenderer/_ContentRenderer'

export default function CodeSettings() {
  const setHljsStyle = useStore(state => state.setHljsStyle)
  const hljsStyle = useStore(state => state.hljsStyle)

  useEffect(() => {
    setValue('hljsStyle', hljsStyle)
  }, [hljsStyle])

  const stylesArray = [
    { label: 'Night Owl', value: 'nightOwl' },
    { label: 'Ascetic', value: 'ascetic' },
    { label: 'Atom One Dark', value: 'atomOneDark' },
    { label: 'Atom One Light', value: 'atomOneLight' },
    { label: 'Dracula', value: 'dracula' },
    { label: 'Solarized Dark', value: 'solarizedDark' },
    { label: 'Solarized Light', value: 'solarizedLight' },
    { label: 'Monokai Sublime', value: 'monokaiSublime' },
    { label: 'Tomorrow Night', value: 'tomorrowNight' },
  ]

  return (
    <React.Fragment>
      <ContentRenderer
        content={[
          {
            type: 'Code',
            value:
              'function print(greet){\n   console.log(`${greet} World!`)\n}\n\nlet greet = \'Hello\'\nprint(greet) // prints "Hello World!"',
            props: { language: 'javascript' },
          },
        ]}
      ></ContentRenderer>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {selectCodeTheme}
        </Text>

        <View style={styles.optionsContainer}>
          {stylesArray.map(item => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item.value}
              style={[
                styles.optionButton,
                hljsStyle === item.value && styles.selectedOption,
              ]}
              onPress={() => setHljsStyle(item.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  hljsStyle === item.value && styles.selectedText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  optionButton: {
    width: 150,
    paddingVertical: 10,
    backgroundColor: 'rgb(210,215,255)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontSize: 15,
    color: 'black',
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'white',
  },
})
