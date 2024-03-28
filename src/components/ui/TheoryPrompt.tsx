import { Entypo } from '@expo/vector-icons'
// import { AntDesign as staro } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Button, View } from 'react-native'
import { reportAMistake } from '../../../data/texts'
import { removeUnderscores, sendAnEmail } from '../../utils/functions'
import QuizButton from './QuizButton'

export default function TheoryPrompt({ topicName, chapterName }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const navigation = useNavigation()

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        right: 10,
        marginTop: 10,
        zIndex: 1,
        position: 'absolute',
      }}
    >
      <Entypo
        name="dots-three-vertical"
        size={28}
        color="black"
        style={{
          width: 35,
          textAlign: 'center',
          // backgroundColor: 'white'
        }}
        onPress={() => {
          setShowPrompt(prev => !prev)
        }}
      />

      {showPrompt && (
        <View
          style={{
            position: 'absolute',
            top: 25,
            right: 60,
            flexDirection: 'column',
            gap: 10,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 6,
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <Button
            title={reportAMistake}
            color="red"
            onPress={() => {
              sendAnEmail(removeUnderscores(topicName))
            }}
          />
          {/* <View
            style={{
              height: '100%',
              width: 1,
              backgroundColor: '#ccc',
              marginHorizontal: 10,
            }}
          /> */}
          <QuizButton chapterName={chapterName} topicName={topicName} />
        </View>
      )}
    </View>
  )
}
