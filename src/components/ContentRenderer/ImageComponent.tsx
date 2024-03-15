import React, { useState } from 'react'
import {
    Animated,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

const ImageComponent = ({ description, value }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [scale, setScale] = useState(1)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setScale(1)
  }

  const onPinchGestureEvent = event => {
    setScale(event.nativeEvent.scale)
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPress={openModal}>
        <Image
          key={value}
          style={styles.image}
          source={{
            uri: value,
          }}
        />
      </TouchableOpacity>
      {description && (
        <Text style={{ opacity: 0.5, marginTop: -10 }}>{description}</Text>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>

          <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={event =>
              event.nativeEvent.state === State.END && setScale(1)
            }
          >
            <Animated.Image
              key={value}
              style={[styles.modalImage, { transform: [{ scale }] }]}
              source={{
                uri: value,
              }}
            />
          </PinchGestureHandler>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 150,
    backgroundColor: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .8)',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
})

export default ImageComponent
