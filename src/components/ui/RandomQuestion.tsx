import { Dimensions, Pressable, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import useOpenQuiz from '../../hooks/useOpenQuiz'
import { randomQuestion } from "../../../data/texts";

export default function RandomQuestion({chapName}){
  const navigation = useNavigation()
const openQuiz = useOpenQuiz()

      const screenWidth = Dimensions.get('window').width
      function instantQuestion() {

        openQuiz("", chapName, Infinity)
        //@ts-ignore
        // navigation.navigate('Quiz', {
        //   topName: '',
        //   chapName,
        //   howManyItems: Infinity,
        //   shuffle: true,
        // })
        // setShowStats(false)
        return
      }
      
    return (
      <Pressable
        onPress={instantQuestion}
        style={{
          // width: 150,
          backgroundColor: 'orange',
          alignItems: 'center',
          elevation: 3,
          borderRadius: 6,
          height: 40,
          justifyContent: 'center',
          bottom: 40,
          // marginRight: 15,
          position: 'absolute',
          zIndex: 2,
          flexDirection: 'row',
          gap: 5,
          paddingHorizontal: 10
          //   borderColor: 'orange',
          //   borderWidth: 1,
          // backgroundColor: 'blue'
        }}
      >
        <FontAwesome5 name="dice" size={20} color="white" />
        <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>{randomQuestion}</Text>
      </Pressable>
    )
}