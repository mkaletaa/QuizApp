import { Entypo } from '@expo/vector-icons'
import { Animated, Button, View } from 'react-native'
import { reportAMistake } from '../../../data/texts'
import useAnimatePopup from '../../hooks/useAnimatePopup'
import { removeUnderscores, sendAnEmail } from '../../utils/functions'
import useStore from '../../utils/store'
import utilStyles from '../../utils/styles'
import QuizButton from './QuizButton'

export default function TheoryPopup({ topicName, chapterName }) {
  const showPopup = useStore(state => state.showPopup)
  const setShowPopup = useStore(state => state.setShowPopup)

  const { popupScale, transform } = useAnimatePopup(showPopup)

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
        }}
        onPress={() => setShowPopup(!showPopup)}
      />

      <Animated.View
        style={[
          utilStyles.popup,
          {
            opacity: popupScale,
            transform,

            zIndex: 1,
            flexDirection: 'column',
            top: 25,
            gap: 10,
          },
        ]}
      >
        <Button
          title={reportAMistake}
          color="red"
          onPress={() => {
            sendAnEmail(removeUnderscores(topicName))
            setShowPopup(false)
          }}
        />
        <QuizButton chapterName={chapterName} topicName={topicName} />
      </Animated.View>
    </View>
  )
}
