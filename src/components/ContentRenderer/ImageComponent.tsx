import { AntDesign } from '@expo/vector-icons'
import { Image as ExpoImage } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { Colors } from '../../utils/constants'
import useStore from '../../utils/store'

const ImageComponent = ({ width: containerWidth, description, value }) => {
  const images = useStore(state => state.images)

  const [modalVisible, setModalVisible] = useState(false)
  const [indexState, setIndexState] = useState(0)
  const [imageSize, setImageSize] = useState({
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
  })
  const [descriptionState, setDescriptionState] = useState<string | undefined>(
    undefined,
  )

  const ratio = 0.9 // ratio between width of the image to screen (or container) width

  useEffect(() => {
    if (useStore.getState().carousel) {
      useStore.getState().addImage(value, description)
      setIndexState(useStore.getState().images.length - 1)
    }
  }, [])

  useEffect(() => {
    Image.getSize(
      value,
      (width, height) => {
        const scaledWidth = containerWidth * ratio
        const scaledHeight = (height / width) * scaledWidth
        setImageSize({ width: scaledWidth, height: scaledHeight })
      },
      error => {
        console.error(`Failed to get image size: ${error.message}`)
      },
    )
  }, [value, containerWidth, ratio])

  useEffect(() => {
    setDescriptionState(description || images[indexState]?.des)
  }, [modalVisible, indexState])

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPress={openModal} activeOpacity={0.7}>
        <View style={[styles.imageContainer]}>
          <ExpoImage
            key={value}
            style={[
              styles.image,
              { width: imageSize.width, height: imageSize.height },
            ]}
            source={{
              uri: value,
            }}
            placeholder={require('../../../assets/failImage.png')}
            contentFit="cover"
          />
        </View>
      </TouchableOpacity>
      {description && (
        <Text style={{ opacity: 0.5, marginTop: -10 }}>{description}</Text>
      )}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          {/* <ActivityIndicator
            style={{
              position: 'absolute',
              zIndex: 0,
            }}
            size={50}
            color={Colors.primary}
          /> */}

          <AntDesign
            onPress={closeModal}
            name="left"
            size={24}
            color="white"
            style={styles.closeButton}
          />

          <ImageViewer
            imageUrls={images.length !== 0 ? images : [{ url: value }]}
            onChange={i =>
              setDescriptionState(
                images.length !== 0 ? images[i]?.des : description,
              )
            }
            style={{ width: '100%' }}
            renderIndicator={() => null}
            index={indexState}
            enableSwipeDown
            swipeDownThreshold={100}
            onCancel={() => {
              setModalVisible(false)
            }}
            // menuContext={()=>{}}
            menus={({ cancel }) => {
              return (
                <Pressable
                  onPressIn={() => {
                    cancel() // Anulowanie menu
                  }}
                  style={{ flex: 1 }}
                ></Pressable>
              )
            }}
            loadingRender={() => {
              return (
                <ActivityIndicator
                  style={{
                    position: 'absolute',
                    zIndex: 0,
                  }}
                  size={50}
                  color={Colors.primary}
                />
              )
            }}
          />
          {descriptionState && (
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                position: 'absolute',
                bottom: 0,
              }}
            >
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .5)']}
                style={{ width: '100%', height: 20 }}
              ></LinearGradient>
              <Text
                style={{
                  color: 'white',
                  paddingBottom: 20,
                  backgroundColor: 'rgba(0, 0, 0, .5)',
                  width: '100%',
                  textAlign: 'center',
                  paddingHorizontal: 10,
                }}
              >
                {descriptionState}
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .1)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
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
    padding: 8,
    zIndex: 1,
    textShadowRadius: 7,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 50,
    paddingRight: 10,
  },
})

export default ImageComponent
