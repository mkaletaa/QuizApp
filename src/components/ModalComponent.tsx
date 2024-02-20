import { Modal, View, Button, StyleSheet, ScrollView , Text, Switch, Pressable} from 'react-native'
import { topics } from '../../data/data'
import QuizModalSwitch from './QuizModalSwitch'
import { AntDesign } from '@expo/vector-icons'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace'

export default function ModalComponent({
  modalVisible,
  setModalVisible,
  dataToIterate,
  toggleTopic,
  showQuiz,
}) {
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
        <Pressable
          style={{ marginBottom: 50 }}
          // title="Start the quiz"
          onPress={() => {
            setModalVisible(false)
            showQuiz()
          }}
        ><Text style={{color: 'white', backgroundColor: 'blue'}}>dede</Text></Pressable>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
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
