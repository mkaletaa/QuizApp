import { Modal, View, Button, StyleSheet } from "react-native"
import { topics } from "../../data/data"
import QuizModalSwitch from "./QuizModalSwitch"


export default function ModalComponent({modalVisible, setModalVisible, dataToIterate, toggleTopic, showQuiz}){
return (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      {dataToIterate &&
        dataToIterate.map(topic => (
          <QuizModalSwitch key={topic.name} topic={topic} toggleTopic={toggleTopic} />
        ))}

      <Button title="Close Modal" onPress={() => setModalVisible(false)} />
      <Button
        title="Start the quiz"
        onPress={() => {
          setModalVisible(false)
          showQuiz()
        }}
      />
    </View>
  </Modal>
)
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
})