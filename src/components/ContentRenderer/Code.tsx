import React from 'react';
import { StyleSheet, View } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import { atelierCaveLight, atomOneDark, atomOneLight, dracula, github, gruvboxDark, hopscotch, irBlack, kimbieDark, monokai, nightOwl, nord, paraisoDark, shadesOfPurple, solarizedDark, srcery, tomorrow, tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';



import useStore from '../../utils/store';


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
    elevation: 2,
  },
})

function returnStyle(codeStyle) {
  switch (codeStyle) {
    // case 'a11yDark': return a11yDark;
    // case 'a11yLight': return a11yLight;
    // case 'agate': return agate;
    // case 'anOldHope': return anOldHope;
    // case 'androidstudio': return androidstudio;
    // case 'arduinoLight': return arduinoLight;
    // case 'arta': return arta;
    // case 'ascetic': return ascetic;
    // case 'atelierCaveDark': return atelierCaveDark;
    case 'atelierCaveLight': return atelierCaveLight;
    // case 'atelierDuneDark': return atelierDuneDark;
    // case 'atelierDuneLight': return atelierDuneLight;
    // case 'atelierEstuaryDark': return atelierEstuaryDark;
    // case 'atelierEstuaryLight': return atelierEstuaryLight;
    // case 'atelierForestDark': return atelierForestDark;
    // case 'atelierForestLight': return atelierForestLight;
    // case 'atelierHeathDark': return atelierHeathDark;
    // case 'atelierHeathLight': return atelierHeathLight;
    // case 'atelierLakesideDark': return atelierLakesideDark;
    // case 'atelierLakesideLight': return atelierLakesideLight;
    // case 'atelierPlateauDark': return atelierPlateauDark;
    // case 'atelierPlateauLight': return atelierPlateauLight;
    // case 'atelierSavannaDark': return atelierSavannaDark;
    // case 'atelierSavannaLight': return atelierSavannaLight;
    // case 'atelierSeasideDark': return atelierSeasideDark;
    // case 'atelierSeasideLight': return atelierSeasideLight;
    // case 'atelierSulphurpoolDark': return atelierSulphurpoolDark;
    // case 'atelierSulphurpoolLight': return atelierSulphurpoolLight;
    // case 'atomOneDarkReasonable': return atomOneDarkReasonable;
    case 'atomOneDark': return atomOneDark;
    case 'atomOneLight': return atomOneLight;
    // case 'brownPaper': return brownPaper;
    // case 'codepenEmbed': return codepenEmbed;
    // case 'colorBrewer': return colorBrewer;
    // case 'darcula': return darcula;
    // case 'dark': return dark;
    // case 'defaultStyle': return defaultStyle;
    // case 'docco': return docco;
    case 'dracula': return dracula;
    // case 'far': return far;
    // case 'foundation': return foundation;
    // case 'githubGist': return githubGist;
    case 'github': return github;
    // case 'gml': return gml;
    // case 'googlecode': return googlecode;
    // case 'gradientDark': return gradientDark;
    // case 'grayscale': return grayscale;
    case 'gruvboxDark': return gruvboxDark;
    // case 'gruvboxLight': return gruvboxLight;
    case 'hopscotch': return hopscotch;
    // case 'hybrid': return hybrid;
    // case 'idea': return idea;
    case 'irBlack': return irBlack;
    // case 'isblEditorDark': return isblEditorDark;
    // case 'isblEditorLight': return isblEditorLight;
    case 'kimbieDark': return kimbieDark;
    // case 'kimbieLight': return kimbieLight;
    // case 'lightfair': return lightfair;
    // case 'lioshi': return lioshi;
    // case 'magula': return magula;
    // case 'monoBlue': return monoBlue;
    // case 'monokaiSublime': return monokaiSublime;
    case 'monokai': return monokai;
    case 'nightOwl': return nightOwl;
    // case 'nnfxDark': return nnfxDark;
    // case 'nnfx': return nnfx;
    case 'nord': return nord;
    // case 'obsidian': return obsidian;
    // case 'ocean': return ocean;
    case 'paraisoDark': return paraisoDark;
    // case 'paraisoLight': return paraisoLight;
    // case 'pojoaque': return pojoaque;
    // case 'purebasic': return purebasic;
    // case 'qtcreatorDark': return qtcreatorDark;
    // case 'qtcreatorLight': return qtcreatorLight;
    // case 'railscasts': return railscasts;
    // case 'rainbow': return rainbow;
    // case 'routeros': return routeros;
    // case 'schoolBook': return schoolBook;
    case 'shadesOfPurple': return shadesOfPurple;
    case 'solarizedDark': return solarizedDark;
    // case 'solarizedLight': return solarizedLight;
    case 'srcery': return srcery;
    // case 'stackoverflowDark': return stackoverflowDark;
    // case 'stackoverflowLight': return stackoverflowLight;
    // case 'sunburst': return sunburst;
    case 'tomorrowNightBlue': return tomorrowNightBlue;
    // case 'tomorrowNightBright': return tomorrowNightBright;
    // case 'tomorrowNightEighties': return tomorrowNightEighties;
    // case 'tomorrowNight': return tomorrowNight;
    case 'tomorrow': return tomorrow;
    // case 'vs': return vs;
    // case 'vs2015': return vs2015;
    // case 'xcode': return xcode;
    // case 'xt256': return xt256;
    // case 'zenburn': return zenburn;
    default: return nightOwl;
  }
}

function returnColor(codeStyle) {
  switch (codeStyle) {
    // case 'a11yDark': return '#2b2b2b';
    // case 'a11yLight': return '#fefefe';
    // case 'agate': return '#333';
    // case 'anOldHope': return '#1c1d21';
    // case 'androidstudio': return '#282b2e';
    // case 'arduinoLight': return '#ffffff';
    // case 'arta': return '#000000';
    // case 'ascetic': return 'white';
    // case 'atelierCaveDark': return '#19171c';
    case 'atelierCaveLight': return '#efecf4';
    // case 'atelierDuneDark': return '#20201d';
    // case 'atelierDuneLight': return '#fefbec';
    // case 'atelierEstuaryDark': return '#22221b';
    // case 'atelierEstuaryLight': return '#f4f3ec';
    // case 'atelierForestDark': return '#1b1918';
    // case 'atelierForestLight': return '#f1efee';
    // case 'atelierHeathDark': return '#1b181b';
    // case 'atelierHeathLight': return '#f7f3f7';
    // case 'atelierLakesideDark': return '#161b1d';
    // case 'atelierLakesideLight': return '#ebf8ff';
    // case 'atelierPlateauDark': return '#1b1818';
    // case 'atelierPlateauLight': return '#f4ecec';
    // case 'atelierSavannaDark': return '#171c19';
    // case 'atelierSavannaLight': return '#ecf4ee';
    // case 'atelierSeasideDark': return '#131513';
    // case 'atelierSeasideLight': return '#f4fbf4';
    // case 'atelierSulphurpoolDark': return '#202746';
    // case 'atelierSulphurpoolLight': return '#f5f7ff';
    // case 'atomOneDarkReasonable': return '#282c34';
    case 'atomOneDark': return '#282c34';
    case 'atomOneLight': return '#fafafa';
    // case 'brownPaper': return '#d9d9d9';
    // case 'codepenEmbed': return '#222';
    // case 'colorBrewer': return '#ffffff';
    // case 'darcula': return '#2b2b2b';
    // case 'dark': return '#000';
    // case 'defaultStyle': return '#ffffff';
    // case 'docco': return '#f8f8ff';
    case 'dracula': return '#282a36';
    // case 'far': return '#00070a';
    // case 'foundation': return '#eeeeee';
    // case 'githubGist': return '#ffffff';
    case 'github': return '#f8f8f8';
    // case 'gml': return '#2d2d2d';
    // case 'googlecode': return '#ffffff';
    // case 'gradientDark': return '#111';
    // case 'grayscale': return '#fefefe';
    case 'gruvboxDark': return '#282828';
    // case 'gruvboxLight': return '#fdf4c1';
    case 'hopscotch': return '#322931';
    // case 'hybrid': return '#1d1f21';
    // case 'idea': return '#ffffff';
    case 'irBlack': return '#000000';
    // case 'isblEditorDark': return '#363c69';
    // case 'isblEditorLight': return '#f3f3f3';
    case 'kimbieDark': return '#221a0f';
    // case 'kimbieLight': return '#ffffff';
    // case 'lightfair': return '#f0f0f0';
    // case 'lioshi': return '#272822';
    // case 'magula': return '#f4f4f4';
    // case 'monoBlue': return '#eaeef3';
    // case 'monokaiSublime': return '#23241d';
    case 'monokai': return '#272822';
    case 'nightOwl': return '#011627';
    // case 'nnfxDark': return '#313550';
    // case 'nnfx': return '#fefefe';
    case 'nord': return '#2e3440';
    // case 'obsidian': return '#282b2e';
    // case 'ocean': return '#2b303b';
    case 'paraisoDark': return '#2f1e2e';
    // case 'paraisoLight': return '#e7e9db';
    // case 'pojoaque': return '#ffffff';
    // case 'purebasic': return '#3f3f3f';
    // case 'qtcreatorDark': return '#000000';
    // case 'qtcreatorLight': return '#ffffff';
    // case 'railscasts': return '#2b2b2b';
    // case 'rainbow': return '#474646';
    // case 'routeros': return '#f0f0f0';
    // case 'schoolBook': return '#f9f9f9';
    case 'shadesOfPurple': return '#2d2b57';
    case 'solarizedDark': return '#002b36';
    // case 'solarizedLight': return '#fdf6e3';
    case 'srcery': return '#1c1b19';
    // case 'stackoverflowDark': return '#1c1b19';
    // case 'stackoverflowLight': return '#ffffff';
    // case 'sunburst': return '#000';
    case 'tomorrowNightBlue': return '#002451';
    // case 'tomorrowNightBright': return '#000';
    // case 'tomorrowNightEighties': return '#2d2d2d';
    // case 'tomorrowNight': return '#1d1f21';
    case 'tomorrow': return '#ffffff';
    // case 'vs': return '#ffffff';
    // case 'vs2015': return '#1e1e1e';
    // case 'xcode': return '#f8f8f8';
    // case 'xt256': return '#000';
    // case 'zenburn': return '#3f3f3f';
    default: return '#011627';
  }
}