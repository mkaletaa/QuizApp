import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { selectCodeTheme } from '../../data/texts'
import { Colors } from '../utils/constants'
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
  // { label: 'Atom One Light', value: 'atomOneLight' },
  // { label: 'Dracula', value: 'dracula' },
  // { label: 'Hopscotch', value: 'hopscotch' },
  // { label: 'GitHub', value: 'github' },
  // { label: 'IR Black', value: 'irBlack' },
  // { label: 'Nord', value: 'nord' },
  // { label: 'Tomorrow', value: 'tomorrow' },

  // { label: 'A11y Dark', value: 'a11yDark' },
  // { label: 'Agate', value: 'agate' },
  // { label: 'An Old Hope', value: 'anOldHope' },
  // { label: 'Android Studio', value: 'androidstudio' },
  // { label: 'Atelier Cave Dark', value: 'atelierCaveDark' },
  // { label: 'Atelier Estuary Dark', value: 'atelierEstuaryDark' },
  // { label: 'Atelier Estuary Light', value: 'atelierEstuaryLight' },
  // { label: 'Atelier Forest Dark', value: 'atelierForestDark' },
  // { label: 'Atelier Forest Light', value: 'atelierForestLight' },
  // { label: 'Atelier Heath Dark', value: 'atelierHeathDark' },
  // { label: 'Atelier Heath Light', value: 'atelierHeathLight' },
  // { label: 'Atelier Plateau Dark', value: 'atelierPlateauDark' },
  // { label: 'Atelier Plateau Light', value: 'atelierPlateauLight' },
  // { label: 'Atelier Seaside Dark', value: 'atelierSeasideDark' },
  // { label: 'Atelier Sulphurpool Dark', value: 'atelierSulphurpoolDark' },
  // { label: 'Atelier Sulphurpool Light', value: 'atelierSulphurpoolLight' },
  // { label: 'Atom One Dark Reasonable', value: 'atomOneDarkReasonable' },
  // { label: 'Darcula', value: 'darcula' },
  // { label: 'Codepen Embed', value: 'codepenEmbed' },
  // { label: 'Foundation', value: 'foundation' },
  // { label: 'GitHub Gist', value: 'githubGist' },
  // { label: 'Google Code', value: 'googlecode' },
  // { label: 'Hybrid', value: 'hybrid' },
  // { label: 'Mono Blue', value: 'monoBlue' },
  // { label: 'Monokai Sublime', value: 'monokaiSublime' },
  // { label: 'NNFX', value: 'nnfx' },
  // { label: 'Obsidian', value: 'obsidian' },
  // { label: 'Ocean', value: 'ocean' },
  // { label: 'Qt Creator Dark', value: 'qtcreatorDark' },
  // { label: 'Qt Creator Light', value: 'qtcreatorLight' },
  // { label: 'RouterOS', value: 'routeros' },
  // { label: 'StackOverflow Dark', value: 'stackoverflowDark' },
  // { label: 'Sunburst', value: 'sunburst' },
  // { label: 'Tomorrow Night Bright', value: 'tomorrowNightBright' },
  // { label: 'Tomorrow Night', value: 'tomorrowNight' },
  // { label: 'VS', value: 'vs' },
  // { label: 'Arduino Light', value: 'arduinoLight' },
  // { label: 'Arta', value: 'arta' },
  // { label: 'Ascetic', value: 'ascetic' },
  // { label: 'Atelier Dune Dark', value: 'atelierDuneDark' },
  // { label: 'Atelier Dune Light', value: 'atelierDuneLight' },
  // { label: 'Atelier Lakeside Dark', value: 'atelierLakesideDark' },
  // { label: 'Atelier Lakeside Light', value: 'atelierLakesideLight' },
  // { label: 'Atelier Savanna Dark', value: 'atelierSavannaDark' },
  // { label: 'Atelier Savanna Light', value: 'atelierSavannaLight' },
  // { label: 'Atelier Seaside Light', value: 'atelierSeasideLight' },
  // { label: 'Brown Paper', value: 'brownPaper' },
  // { label: 'Color Brewer', value: 'colorBrewer' },
  // { label: 'Dark', value: 'dark' },
  // { label: 'Default Style', value: 'defaultStyle' },
  // { label: 'Far', value: 'far' },
  // { label: 'GML', value: 'gml' },
  // { label: 'Gradient Dark', value: 'gradientDark' },
  // { label: 'Grayscale', value: 'grayscale' },
  // { label: 'Gruvbox Light', value: 'gruvboxLight' },
  // { label: 'Idea', value: 'idea' },
  // { label: 'ISBL Editor Dark', value: 'isblEditorDark' },
  // { label: 'ISBL Editor Light', value: 'isblEditorLight' },
  // { label: 'Kimbie Light', value: 'kimbieLight' },
  // { label: 'Lightfair', value: 'lightfair' },
  // { label: 'Lioshi', value: 'lioshi' },
  // { label: 'Magula', value: 'magula' },
  // { label: 'Paraiso Light', value: 'paraisoLight' },
  // { label: 'NNFX Dark', value: 'nnfxDark' },
  // { label: 'Pojoaque', value: 'pojoaque' },
  // { label: 'Purebasic', value: 'purebasic' },
  // { label: 'Railscasts', value: 'railscasts' },
  // { label: 'Rainbow', value: 'rainbow' },
  // { label: 'School Book', value: 'schoolBook' },
  // { label: 'Solarized Light', value: 'solarizedLight' },
  // { label: 'StackOverflow Light', value: 'stackoverflowLight' },

  // { label: 'Tomorrow Night Eighties', value: 'tomorrowNightEighties' },
  // { label: 'VS 2015', value: 'vs2015' },
  // { label: 'Xcode', value: 'xcode' },
  // { label: 'XT 256', value: 'xt256' },
  // { label: 'Zenburn', value: 'zenburn' },
]

export default function CodeSettings() {
  const setHljsStyle = useStore(state => state.setHljsStyle)
  const hljsStyle = useStore(state => state.hljsStyle)

  const [localStyle, setLocalStyle] = useState(hljsStyle) // helper variable improving performance

  useEffect(() => {
    setHljsStyle(localStyle)
    setValue('hljsStyle', hljsStyle)
  }, [localStyle])

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
      {/* <LinearGradient style={{}}></LinearGradient> */}
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
              onPress={() => setLocalStyle(item.value)}
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
