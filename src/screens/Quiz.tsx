import React, { useEffect, useState } from 'react'
// import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native'
import Question from '../components/Question'
import Options from '../components/Options'
import Finish from '../components/Finish'
import { useHeaderHeight } from '@react-navigation/elements'
import { BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useResults from '../hooks/useResults'
export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()
  const navigation = useNavigation()
  const itemSet = route.params.quiz
  const quizToIterate = [...itemSet, { id: -1 }]
  const [modalVisible, setModalVisible] = useState(false)

  const [results, setResults, compare] = useResults(itemSet)

  useEffect(() => {
    console.log('rerender')
    for (const item of itemSet) {
      //@ts-ignore
      setResults(prev => [...prev, { id: item.id, userChoices: [], item }])
    }
  }, [])

  function closeModalAndGoBack(): void {
    setModalVisible(false)
    navigation.goBack() // powrót do poprzedniego ekranu
  }

  return (
    <View>
      <FlatList
        data={quizToIterate}
        horizontal
        pagingEnabled
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView
            contentContainerStyle={[
              styles.card,
              { width: screenWidth, minHeight: screenHeight - headerHeight },
            ]}
          >
            {item?.question ? (
              <Question question={item?.question} />
            ) : (
              <Finish userChoices={results} nrOfItems={itemSet.length} />
            )}

            {item?.options ? (
              <Options
                item={item}
                fn={compare}
                multiChoice={item.multiChoice}
              />
            ) : null}
          </ScrollView>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={false} //modalVisible
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{ textAlign: 'center', fontSize: 15, marginBottom: 10 }}
            >
              Are you sure you want to go back? Your progress won't be saved
            </Text>
            <View style={styles.buttonsContainer}>
              <Button
                title="yes, quit the quiz"
                color="red"
                onPress={closeModalAndGoBack}
              />
              <Button
                title="nah, I want to stay here"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'lightgray',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  button: {
    fontSize: 10,
  },
})
