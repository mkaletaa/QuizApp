import React, { useState } from 'react'
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import ImageViewer from 'react-native-image-zoom-viewer';
import { close } from '../../../data/texts';

const ImageComponent = ({ width, description, value, orientation = null }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const scale = React.useRef(new Animated.Value(1)).current
const handlePinch = Animated.event(
  [{ nativeEvent: { scale } }],
  { useNativeDriver: true } // Specify options as an empty object
)


  function setHeight(
    orientation: 'vertical' | 'horizontal' | 'square' | null
  ): number {
    //TODO: pobrać szerokość w pixelach i na tej podstawie ustalić wysokość
    switch (orientation) {
      case 'vertical':
        return width * 1.2 //16/9 czy jakoś tak
      case 'horizontal':
        return width * 0.5
      case 'square':
        width * 3
      default:
        return width
    }
    // return
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPress={openModal}>
        <Image
          key={value}
          style={[styles.image, { height: setHeight(orientation) }]}
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
          {/* <PinchGestureHandler
            onGestureEvent={handlePinch}
            onHandlerStateChange={event => {
              if (event.nativeEvent.state === State.END) {
                Animated.spring(scale, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            }}
          > */}
            {/* <Animated.Image
              key={value}
              style={[
                styles.modalImage,
                {
                  transform: [{ scale }],
                },
              ]}
              source={{
                uri: value,
              }}
            /> */}
            <ImageViewer imageUrls={[{url:value}]} style={{width: '100%'}} renderIndicator={() => null} />
          {/* </PinchGestureHandler> */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={{ color: 'white' }}>{close}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    // height: 250,
    // backgroundColor: 'red',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    // width: 100,
    // height: 200,
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
