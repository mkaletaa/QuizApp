import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { selectCodeTheme } from '../../data/texts'
import { Colors } from '../utils/constants'
import { throttle } from '../utils/functions'
import useStore from '../utils/store'
import { setValue } from '../utils/utilStorage'
import ContentRenderer from './ContentRenderer/_ContentRenderer'

const stylesArray = [
  { label: 'Atelier Cave Light', value: 'atelierCaveLight' },
  { label: 'Atom One Dark', value: 'atomOneDark' },
  { label: 'Docco', value: 'docco' },
  { label: 'Gruvbox Dark', value: 'gruvboxDark' },
  { label: 'Kimbie Dark', value: 'kimbieDark' },
  { label: 'Monokai', value: 'monokai' },
  { label: 'Night Owl', value: 'nightOwl' },
  { label: 'Paraiso Dark', value: 'paraisoDark' },
  { label: 'Shades of Purple', value: 'shadesOfPurple' },
  { label: 'Solarized Dark', value: 'solarizedDark' },
  { label: 'Srcery', value: 'srcery' },
  { label: 'Tomorrow Night Blue', value: 'tomorrowNightBlue' },
]

export default function CodeSettings() {
  const setHljsStyle = useStore(state => state.setHljsStyle)
  const hljsStyle = useStore(state => state.hljsStyle)

  const [localStyle, setLocalStyle] = useState(hljsStyle)

  useEffect(() => {
    setHljsStyle(localStyle)
    setValue('hljsStyle', localStyle)
  }, [localStyle])

  // Funkcja opakowana w throttle z limitem 500ms
  const handlePressThrottled = useCallback(
    throttle(value => setLocalStyle(value), 500),
    [],
  )

  return (
    <React.Fragment>
      <View style={{ padding: 20, paddingBottom: 10, gap: 10 }}>
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
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {selectCodeTheme}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.optionsContainer}>
          {stylesArray.map(item => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item.value}
              style={[
                styles.optionButton,
                localStyle === item.value && styles.selectedOption,
              ]}
              onPress={() => handlePressThrottled(item.value)} // użycie throttled function
            >
              <Text
                style={[
                  styles.optionText,
                  localStyle === item.value && styles.selectedText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
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
