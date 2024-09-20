import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



import { selectCodeTheme } from '../../data/texts';
import { Colors } from '../utils/constants';
import useStore from '../utils/store';
import { setValue } from '../utils/utilStorage';
import ContentRenderer from './ContentRenderer/_ContentRenderer';


export default function CodeSettings() {
  const setHljsStyle = useStore(state => state.setHljsStyle)
  const hljsStyle = useStore(state => state.hljsStyle)

  useEffect(() => {
    setValue('hljsStyle', hljsStyle)
  }, [hljsStyle])

  const stylesArray = [
    { label: 'A11y Dark', value: 'a11yDark' },
    { label: 'A11y Light', value: 'a11yLight' },
    { label: 'Agate', value: 'agate' },
    { label: 'An Old Hope', value: 'anOldHope' },
    { label: 'Android Studio', value: 'androidstudio' },
    { label: 'Arduino Light', value: 'arduinoLight' },
    { label: 'Arta', value: 'arta' },
    { label: 'Ascetic', value: 'ascetic' },
    { label: 'Atelier Cave Dark', value: 'atelierCaveDark' },
    { label: 'Atelier Cave Light', value: 'atelierCaveLight' },
    { label: 'Atelier Dune Dark', value: 'atelierDuneDark' },
    { label: 'Atelier Dune Light', value: 'atelierDuneLight' },
    { label: 'Atelier Estuary Dark', value: 'atelierEstuaryDark' },
    { label: 'Atelier Estuary Light', value: 'atelierEstuaryLight' },
    { label: 'Atelier Forest Dark', value: 'atelierForestDark' },
    { label: 'Atelier Forest Light', value: 'atelierForestLight' },
    { label: 'Atelier Heath Dark', value: 'atelierHeathDark' },
    { label: 'Atelier Heath Light', value: 'atelierHeathLight' },
    { label: 'Atelier Lakeside Dark', value: 'atelierLakesideDark' },
    { label: 'Atelier Lakeside Light', value: 'atelierLakesideLight' },
    { label: 'Atelier Plateau Dark', value: 'atelierPlateauDark' },
    { label: 'Atelier Plateau Light', value: 'atelierPlateauLight' },
    { label: 'Atelier Savanna Dark', value: 'atelierSavannaDark' },
    { label: 'Atelier Savanna Light', value: 'atelierSavannaLight' },
    { label: 'Atelier Seaside Dark', value: 'atelierSeasideDark' },
    { label: 'Atelier Seaside Light', value: 'atelierSeasideLight' },
    { label: 'Atelier Sulphurpool Dark', value: 'atelierSulphurpoolDark' },
    { label: 'Atelier Sulphurpool Light', value: 'atelierSulphurpoolLight' },
    { label: 'Atom One Dark Reasonable', value: 'atomOneDarkReasonable' },
    { label: 'Atom One Dark', value: 'atomOneDark' },
    { label: 'Atom One Light', value: 'atomOneLight' },
    { label: 'Brown Paper', value: 'brownPaper' },
    { label: 'Codepen Embed', value: 'codepenEmbed' },
    { label: 'Color Brewer', value: 'colorBrewer' },
    { label: 'Darcula', value: 'darcula' },
    { label: 'Dark', value: 'dark' },
    { label: 'Default Style', value: 'defaultStyle' },
    { label: 'Docco', value: 'docco' },
    { label: 'Dracula', value: 'dracula' },
    { label: 'Far', value: 'far' },
    { label: 'Foundation', value: 'foundation' },
    { label: 'GitHub Gist', value: 'githubGist' },
    { label: 'GitHub', value: 'github' },
    { label: 'GML', value: 'gml' },
    { label: 'Google Code', value: 'googlecode' },
    { label: 'Gradient Dark', value: 'gradientDark' },
    { label: 'Grayscale', value: 'grayscale' },
    { label: 'Gruvbox Dark', value: 'gruvboxDark' },
    { label: 'Gruvbox Light', value: 'gruvboxLight' },
    { label: 'Hopscotch', value: 'hopscotch' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Idea', value: 'idea' },
    { label: 'IR Black', value: 'irBlack' },
    { label: 'ISBL Editor Dark', value: 'isblEditorDark' },
    { label: 'ISBL Editor Light', value: 'isblEditorLight' },
    { label: 'Kimbie Dark', value: 'kimbieDark' },
    { label: 'Kimbie Light', value: 'kimbieLight' },
    { label: 'Lightfair', value: 'lightfair' },
    { label: 'Lioshi', value: 'lioshi' },
    { label: 'Magula', value: 'magula' },
    { label: 'Mono Blue', value: 'monoBlue' },
    { label: 'Monokai Sublime', value: 'monokaiSublime' },
    { label: 'Monokai', value: 'monokai' },
    { label: 'Night Owl', value: 'nightOwl' },
    { label: 'NNFX Dark', value: 'nnfxDark' },
    { label: 'NNFX', value: 'nnfx' },
    { label: 'Nord', value: 'nord' },
    { label: 'Obsidian', value: 'obsidian' },
    { label: 'Ocean', value: 'ocean' },
    { label: 'Paraiso Dark', value: 'paraisoDark' },
    { label: 'Paraiso Light', value: 'paraisoLight' },
    { label: 'Pojoaque', value: 'pojoaque' },
    { label: 'Purebasic', value: 'purebasic' },
    { label: 'Qt Creator Dark', value: 'qtcreatorDark' },
    { label: 'Qt Creator Light', value: 'qtcreatorLight' },
    { label: 'Railscasts', value: 'railscasts' },
    { label: 'Rainbow', value: 'rainbow' },
    { label: 'RouterOS', value: 'routeros' },
    { label: 'School Book', value: 'schoolBook' },
    { label: 'Shades of Purple', value: 'shadesOfPurple' },
    { label: 'Solarized Dark', value: 'solarizedDark' },
    { label: 'Solarized Light', value: 'solarizedLight' },
    { label: 'Srcery', value: 'srcery' },
    { label: 'StackOverflow Dark', value: 'stackoverflowDark' },
    { label: 'StackOverflow Light', value: 'stackoverflowLight' },
    { label: 'Sunburst', value: 'sunburst' },
    { label: 'Tomorrow Night Blue', value: 'tomorrowNightBlue' },
    { label: 'Tomorrow Night Bright', value: 'tomorrowNightBright' },
    { label: 'Tomorrow Night Eighties', value: 'tomorrowNightEighties' },
    { label: 'Tomorrow Night', value: 'tomorrowNight' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'VS', value: 'vs' },
    { label: 'VS 2015', value: 'vs2015' },
    { label: 'Xcode', value: 'xcode' },
    { label: 'XT 256', value: 'xt256' },
    { label: 'Zenburn', value: 'zenburn' },
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