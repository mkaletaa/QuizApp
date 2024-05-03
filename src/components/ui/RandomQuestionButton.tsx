import { Dimensions, Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import useOpenQuiz from '../../hooks/useOpenQuiz'
import { randomQuestion } from '../../../data/texts'
import { Button as PaperButton } from 'react-native-paper'
import { buttonDark, buttonLight } from '../../utils/constants'
import { LinearGradient } from 'expo-linear-gradient'
export default function RandomQuestionButton({ chapName }) {
  const navigation = useNavigation()
  const { openQuiz } = useOpenQuiz()

  const screenWidth = Dimensions.get('window').width
  function instantQuestion() {
    // try {
    openQuiz({
      topicName: '',
      chapterName: chapName,
      howManyItems: Infinity,
      shuffle: true,
    })
    //@ts-ignore
    // navigation.navigate('Quiz', {
    //   topName: '',
    //   chapName,
    //   howManyItems: Infinity,
    //   shuffle: true,
    // })
    // setShowStats(false)
    // } catch (err) {
    //   console.error(err)
    // }
    return
  }

  return (
    // <LinearGradient
    //   // Button Linear Gradient
    //   colors={['black', buttonLight]}
    //   style={{
    //     // width: '100%',
    //     // height: '100%', //has to be 100% cuz if Math component, Tile cannot be pressed
    //     position: 'absolute',
    //     bottom: 0,
    //   }}
    // >
      <PaperButton
        mode="elevated"
        onPress={instantQuestion}
        elevation={5}
        buttonColor={buttonDark}
        textColor="white"
        style={{
          // backgroundColor: 'orange',
          alignItems: 'center',
          // elevation: 3,
          borderRadius: 10,
          // height: 40,
          justifyContent: 'center',
          bottom: 40,
          // marginRight: 15,
          position: 'absolute',
          zIndex: 2,
          flexDirection: 'row',
          // gap: 15,
          // paddingHorizontal: 10,
        }}
      >
        <FontAwesome5 name="dice" size={20} color="white" />
        <Text> </Text>
        {randomQuestion}
      </PaperButton>
    // </LinearGradient>
  )
}
