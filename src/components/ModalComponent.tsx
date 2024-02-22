import {
  Modal,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
  Pressable,
} from 'react-native'
import { topics } from '../../data/data'
import QuizModalSwitch from './ui/QuizModalSwitch'
import { AntDesign } from '@expo/vector-icons'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace'
import { useEffect } from 'react'
import Slider from '@react-native-community/slider'
import useQuizData from '../hooks/useQuizData'
export default function ModalComponent({
  modalVisible,
  setModalVisible,
  dataToIterate,
  toggleTopic,
  showQuiz,
  sliderHandle,
  nrOfItems,
  catName,
  chosenTopics,
}: {
  modalVisible: boolean
  setModalVisible: any
  dataToIterate: any
  toggleTopic: any
  showQuiz: () => void
  sliderHandle?: (value: number) => void
  nrOfItems?: number
  catName?: string
  chosenTopics: string[]
}) {
  useEffect(() => {
    console.log('🚀 ~ showQuiz:', showQuiz)
  }, [])
  const { countItemsInTopics } = useQuizData()
  // const[slider]
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      // animationIn="slideInLeft"
      // animationOut="slideOutRight"
    >
      <View style={styles.closeContainer}>
        <AntDesign
          onPress={() => setModalVisible(false)}
          name="closesquare"
          size={34}
          color="red"
          style={styles.close}
        />
      </View>
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <Text style={{ color: 'white', fontSize: 18 }}>Choose topics</Text>
        <Text style={{ color: 'white' }}>mark/unmark every topic</Text>

        <Switch onValueChange={() => {}} value={true} />
        {dataToIterate &&
          dataToIterate.map(topic => (
            <QuizModalSwitch
              key={topic.name}
              topic={topic}
              toggleTopic={toggleTopic}
            />
          ))}
        <Text style={{ color: 'white', fontSize: 20 }}>
          {nrOfItems === 0 ? 'infinity' : nrOfItems}
        </Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={countItemsInTopics(chosenTopics, catName)}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={value => sliderHandle(value)}
        />
        <Pressable
          style={{ marginBottom: 50 }}
          // title="Start the quiz"
          onPress={() => {
            setModalVisible(false)
            showQuiz()
          }}
        >
          <Text
            style={{ color: 'white', backgroundColor: 'blue', fontSize: 20 }}
          >
            dede
          </Text>
        </Pressable>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingVertical: 10,
    gap: 10,
  },
  closeContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1, // Aby przycisk był na wierzchu
  },
  close: {
    // Dodaj dodatkowe style, jeśli są potrzebne
  },
})
