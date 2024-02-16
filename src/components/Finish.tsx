import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

export default function Finish({ userChoices, nrOfItems }) {
  const navigation = useNavigation()

  const goToSummary = () => {
    //@ts-ignore
    navigation.navigate('Summary', userChoices)
    console.log('userChoices', JSON.stringify(userChoices))
  }

  useEffect(() => {
    // console.log('firstfddf', JSON.stringify(userChoices))
  }, [userChoices])

  function isSummaryEnabled(): boolean {
    let nrOfAnswers = 0 //na ile pytń user udzielił odpowiedzi

    userChoices.forEach(item => {
      if (item.userChoices.length > 0) nrOfAnswers++
    })

    return nrOfAnswers === nrOfItems
  }

  return (
    <View>
      <Text>{nrOfItems}</Text>
      <Text>{userChoices.length}</Text>
      {!isSummaryEnabled() && <Text>You have to answer all questions to see the results</Text>}
      <Button
        disabled={!isSummaryEnabled()}
        title="finish"
        onPress={() => goToSummary()}
      />
    </View>
  )
}
