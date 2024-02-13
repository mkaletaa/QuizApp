import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native'
import Finish from '../components/Finish'
import Question from '../components/Question'
import Options from './Options'

export default function Summary({ route }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContents, setModalContents] = useState()

  return (
    <View>
      <Text>Summary</Text>

      <FlatList
        data={route.params}
        horizontal={false}
        pagingEnabled
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true), setModalContents(item.isCorrect)
            }}
          >
            <View
              style={[
                styles.item,
                {
                  backgroundColor: item.isCorrect === 'true' ? 'green' : 'red',
                },
              ]}
            >
              <Text>
                {item.id}, {item.isCorrect}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>{modalContents}</Text>
          <Button title="Close Modal" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  item: {
    width: 50,
    height: 50,
  },
})
