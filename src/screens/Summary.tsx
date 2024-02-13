import React, { useState } from 'react'
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import ContentRenderer from '../components/ContentRenderer'

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
              setModalVisible(true), setModalContents(item.explanation)
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
          <ContentRenderer data={modalContents}></ContentRenderer>
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
