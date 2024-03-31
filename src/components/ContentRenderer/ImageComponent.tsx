import React, { useState } from 'react'
import {
  Animated,
  Button,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import ImageViewer from 'react-native-image-zoom-viewer'
import { close } from '../../../data/texts'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons'

const ImageComponent = ({
  width: containerWidth,
  description,
  value,
  orientation = null,
}) => {
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
    orientation:
      | 'vertical'
      | 'horizontal'
      | 'square'
      | null
      | 'portrait'
      | 'landscape'
  ): number {
    console.log('🚀 ~ orientation:', orientation)
    switch (orientation) {
      case 'portrait':
      case 'vertical':
        return containerWidth * ratio * 1.3 //16/9 czy jakoś tak
      case 'horizontal':
      case 'landscape':
        return containerWidth * ratio * 0.6
      case 'square':
        containerWidth * ratio
      default:
        return containerWidth * ratio
    }
  }

  const ratio = 0.9 //ratio between width of the image to screen (or container) width

  return (
    <React.Fragment>
      <TouchableOpacity onPress={openModal} activeOpacity={0.7}>
        <Image
          key={value}
          style={[
            styles.image,
            { width: containerWidth * ratio, height: setHeight(orientation) },
          ]}
          source={{
            uri: value,
          }}
        />
      </TouchableOpacity>
      {description && (
        <Text style={{ opacity: 0.5, marginTop: -10 }}>{description}</Text>
      )}
      {/* <StatusBar backgroundColor="rgba(255, 0, 0, 1)" hidden translucent /> */}

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
        statusBarTranslucent={true}
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
          {/* <TouchableOpacity> */}
          <ImageViewer
            imageUrls={[{ url: value }]}
            style={{ width: '100%' }}
            renderIndicator={() => null}
          />
          {/* </TouchableOpacity> */}
          {/* </PinchGestureHandler> */}


          <AntDesign
            onPress={closeModal}
            name="arrowleft"
            size={24}
            color="white"
            style={styles.closeButton}
          />

          {/* <Button title = "Zamknij" color = "transparent"></Button> */}
          {description && (
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                bottom: 0,
                paddingBottom: 20,
                backgroundColor: 'rgba(0, 0, 0, .5)',
                width: '100%',
                textAlign: 'center',
                paddingHorizontal: 10,
              }}
            >
              {description}
            </Text>
          )}
        </View>
      </Modal>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  image: {
    // width: "50%",
    // height: 250,
    // backgroundColor: '#fffff8',
    // backgroundColor: 'rgba(255, 255, 240, 1)',

    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 8,
  },
  modalContainer: {
    // flex: 1,
    // width: 100,

    height: Dimensions.get('window').height,
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
    top: 40,
    left: 20,
    padding: 5,
    textShadowColor: 'rgba(0, 0, 0, .9)', // kolor cienia
    textShadowRadius: 7, // promień cienia
  },
})

export default ImageComponent
