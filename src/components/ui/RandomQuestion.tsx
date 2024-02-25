import { Dimensions, Pressable, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'


export default function RandomQuestion(){
  const navigation = useNavigation()

      const screenWidth = Dimensions.get('window').width
      function instantQuestion() {
        //@ts-ignore
        navigation.navigate('Quiz', {
          catName: '__All__',
          topArray: [],
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
          width: 150,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          elevation: 3,
          borderRadius: 3,
          height: 40,
          justifyContent: 'center',
          bottom: 40,
          marginRight: 15,
          position: 'absolute',
          zIndex: 2,
          // backgroundColor: 'blue'
        }}
      >
        <Text style={{ fontSize: 15 }}>Random question</Text>
      </Pressable>
    )
}