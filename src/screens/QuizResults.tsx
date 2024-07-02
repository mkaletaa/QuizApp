import React, { useEffect, useRef, useState } from 'react'
import {
  Modal,
  View,
  Text,
  Button,
  BackHandler,
  FlatList,
  StatusBar,
  Pressable,
} from 'react-native'
import { setColor } from '../utils/functions'
import { Item, Option } from '../utils/types'
import ItemResult from '../components/ItemResult'
import Tile from '../components/Tile'
import { close } from '../../data/texts'
import { Button as PaperButton } from 'react-native-paper'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { retake, retakeWrong } from '../../data/texts'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'
import { surfaceBg } from '../utils/constants'
export default function QuizResults({ route }) {
  const [resultsArray, setResultsArray] = useState([])
  const [correctNr, setCorrectNr] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState<Item>()
  const [modalChoices, setModalChoices] = useState<Option[]>()
  const { openQuiz } = useOpenQuiz()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setResultsArray(route.params.resultsArray)
    let correct = 0
    route.params.resultsArray.forEach(result => {
      if (result.isCorrect === 'correct') correct++
    })
    setCorrectNr(correct)
    console.log(route.params.resultsArray)
    // const backHandler = BackHandler.addEventListener('hardwareBackPress', null)
    // return () => backHandler.remove()
  }, [])

  const transformData = data => {
    const counts = data.reduce((acc, item) => {
      acc[item.isCorrect] = (acc[item.isCorrect] || 0) + 1
      return acc
    }, {})

    return [
      {
        name: 'Correct',
        population: counts.correct || 0,
        color: 'rgb(131, 167, 234)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Kind of',
        population: counts.kindof || 0,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Incorrect',
        population: counts.incorrect || 0,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ]
  }

  function handlePress(item: Item, choices: Option[], index: number) {
    setIndex(index)
    setShowModal(true)
    setModalItem(item)
    setModalChoices(choices)
  }

  useEffect(() => {
    if (showModal === true) scrollToIndex(index)
  }, [showModal])

  const flatListRef = useRef(null)
  const scrollToIndex = index => {
    flatListRef.current.scrollToOffset({ animated: false, offset: 360 * index })
  }

  function retakeQuiz(incorrectOnly = false) {
    let itemsArray
    if (incorrectOnly) {
      itemsArray = resultsArray
        .filter(el => el.isCorrect !== 'correct')
        .map(el => el.item)
    } else {
      itemsArray = resultsArray.map(el => el.item)
    }
    openQuiz({
      chapterName: '__Saved__', // todo: change
      itemsArray: itemsArray,
      howManyItems: itemsArray.length,
    })
  }

  // Renderowanie elementu listy
  const renderItem = ({ item, index }) => (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Tile
        item={item.item}
        handlePress={() => handlePress(item.item, item.userChoices, index)}
        color={setColor(item)}
      />
    </View>
  )

  const ListHeader = () => (
    <View
      style={{
        backgroundColor: surfaceBg,
        margin: 20,
        borderRadius: 10,
        elevation: 1,
      }}
    >
      <PieChart
        data={transformData(resultsArray)}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[10, 50]}
        absolute
      ></PieChart>
    </View>
  )

  const ListFooter = () => (
    <View style={{ marginVertical: 20, alignItems: 'center', gap: 20 }}>
      <PaperButton
        mode="contained"
        style={{ backgroundColor: 'slateblue', paddingVertical: 10, flex: 1 }}
        onPress={() => retakeQuiz()}
      >
        <Text style={{ color: 'white' }}>{retake}</Text>
      </PaperButton>

      {resultsArray.every(el => el.isCorrect === 'correct') ? null : ( //jeśli we wszystkich elementach itemsArray klucz isCorrect ma wartość correct to ukryj button
        <PaperButton
          mode="contained"
          style={{ backgroundColor: 'slateblue', paddingVertical: 10, flex: 1 }}
          onPress={() => retakeQuiz(true)}
        >
          <Text style={{ color: 'white' }}>{retakeWrong}</Text>
        </PaperButton>
      )}
    </View>
  )

  return (
    <React.Fragment>
      {/* <Text>
        Your score is {correctNr}/{resultsArray.length}
        </Text> */}
      <StatusBar
        // backgroundColor="#6200EE" // Change this to the desired color
        // barStyle="light-content" // Change this to "dark-content" for dark text
        translucent={false} // Ensure the status bar is not transparent
      />

      <FlatList
        data={resultsArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        style={{}}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <FlatList
          pagingEnabled
          horizontal={true}
          ref={flatListRef}
          // contentContainerStyle={{
          //   width: '100%',
          // }}
          data={resultsArray} // Pass resultsArray directly to data prop
          keyExtractor={(item, index) => index.toString()} // Use a unique key for each item
          renderItem={(
            { item } // Destructure item from the object passed by FlatList
          ) => (
            <ItemResult
              item={item.item} // Assuming item is structured as { item: Item, userChoices: Option[] }
              chosenOptions={item.userChoices} // Access userChoices similarly
              handleBtnPress={() => setShowModal(false)}
              btnTitle={close}
            />
          )}
        />
      </Modal>
    </React.Fragment>
  )
}
