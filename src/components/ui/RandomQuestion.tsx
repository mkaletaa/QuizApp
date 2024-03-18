import { Dimensions, Pressable, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

export default function RandomQuestion({chapName}){
  const navigation = useNavigation()

      const screenWidth = Dimensions.get('window').width
      function instantQuestion() {
        //@ts-ignore
        navigation.navigate('Quiz', {
          chapName,
          topName: '',
          howManyItems: Infinity,
          shuffle: true,
        })
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
        <FontAwesome5 name="dice" size={24} color="white" />
        <Text style={{ fontSize: 15, color: 'white' }}>Random Question</Text>
      </Pressable>
    )
}