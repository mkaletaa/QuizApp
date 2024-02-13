import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'


export default function Finish() {
  const navigation = useNavigation()

    const goToSummary = () => {
        //@ts-ignore
        navigation.navigate("Summary")
    }

  return (
    <View>
      <Button title="finish" onPress={()=>goToSummary()}/>
    </View>
  )
}
