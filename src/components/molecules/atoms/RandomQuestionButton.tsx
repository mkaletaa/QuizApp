import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { AnimatedFAB, Button as PaperButton } from 'react-native-paper'
import { randomQuestion } from '../../../../data/texts'
import useOpenQuiz from '../../../hooks/useOpenQuiz'
import { Colors } from '../../../utils/constants'
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
    //todo: use FAB from paper
      //     <AnimatedFAB
      //   icon={'dice-5'}
      //   label={'randomQuestion'}
      //   extended={true}
      //   onPress={() => console.log('Pressed')}
      //   visible={true}
      //   animateFrom={'right'}
      //   iconMode={'static'}
      //   color={'white'}
      //    style={{
      //   backgroundColor: Colors.primary,
      //   borderRadius: 10,
      //   bottom: 30,
      //   right: 20,
      //   zIndex: 2,
      //   paddingHorizontal: 10,
      // }}
      // />

    <PaperButton
      mode="elevated"
      icon="dice-5"
      onPress={instantQuestion}
      elevation={5}
      buttonColor={Colors.primary}
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
      
      {/* <FontAwesome5 name="dice" size={20} color="white" />
        <Text> </Text>*/}
      {randomQuestion}
    </PaperButton>
    // </LinearGradient>
  )
}
