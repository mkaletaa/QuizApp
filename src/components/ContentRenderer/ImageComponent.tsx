import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  // Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native'
import { Image } from 'expo-image'
import ImageViewer from 'react-native-image-zoom-viewer'
import useStore from '../../utils/store'

const ImageComponent = ({
  width: containerWidth,
  description,
  value,
  orientation = null,
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [indexState, setIndexState] = useState(0)
  const images = useStore(state => state.images)
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // console.log('images: ', useStore.getState().images.length)\

    // karuzela odpala się tylko gdy zdjęcie jest w Theory
    if (useStore.getState().carousel) {
      useStore.getState().addImage(value, description) //dodaj image do zustand
      setIndexState(useStore.getState().images.length - 1) //ustaw indeks na podstawie tego ile zdjęć znajduje się w zustand w momencie mountingu
    }
  }, [])

  const [descriptionState, setDescriptionState] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    // console.log('images', images)
    setDescriptionState(description || images[indexState]?.des)
  }, [modalVisible, indexState])
  const setShowPopup = useStore(state => state.setShowPopup)

  const openModal = () => {
    setModalVisible(true)
        setShowPopup(false)

  }

  const closeModal = () => {
    setModalVisible(false)
  }

  function setHeight(
    orientation:
      | 'vertical'
      | 'horizontal'
      | 'square'
      | null
      | 'portrait'
      | 'landscape'
  ): number {
    // console.log('🚀 ~ orientation:', orientation)
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
        {/* <View style={{}}> */}
        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
        <View style={{ backgroundColor: 'lightgray', borderRadius: 8 }}>
          <Image
            key={value}
            style={[
              styles.image,
              { width: containerWidth * ratio, height: setHeight(orientation) },
            ]}
            source={{
              uri: value,
            }}
            // placeholder={
            //   '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
            // }
            placeholder={require('../../../assets/failImage.png')}
            //todo: spróbowac require placeholdera i ogarnąć border w View, onError
            contentFit="cover"
            // placeholderContentFit="cover"
          />
        </View>

        {/* </View> */}
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
          <AntDesign
            onPress={closeModal}
            name="arrowleft"
            size={24}
            color="white"
            style={styles.closeButton}
          />
          <ImageViewer
            //jeśli w zustandzie są jakieś zdjęcia to ich użyj, a jak nie to użyj propsa
            imageUrls={images.length !== 0 ? images : [{ url: value }]}
            onChange={i =>
              setDescriptionState(
                //to samo co wyżej
                images.length !== 0 ? images[i]?.des : description
              )
            }
            style={{ width: '100%' }}
            renderIndicator={() => null}
            index={indexState}
            enableSwipeDown
            onCancel={() => {
              setModalVisible(false)
            }}
            loadingRender={() => {
              return <Text>...</Text>
            }}
            // menus={e => null}

            // onLongPress={null}
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
                colors={[
                  'rgba(0, 0, 0, 0)',
                  // 'rgba(0, 0, 0, .05)',
                  // 'rgba(0, 0, 0, .10)',
                  // 'rgba(0, 0, 0, .15)',
                  // 'rgba(0, 0, 0, .20)',
                  // 'rgba(0, 0, 0, .25)',
                  // 'rgba(0, 0, 0, .30)',
                  // 'rgba(0, 0, 0, .35)',
                  // 'rgba(0, 0, 0, .40)',
                  // 'rgba(0, 0, 0, .45)',
                  'rgba(0, 0, 0, .5)',
                ]}
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
  image: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 8,
    // flex: 1
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
    padding: 5,
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, .9)', // kolor cienia
    textShadowRadius: 7, // promień cienia
  },
})

export default ImageComponent
