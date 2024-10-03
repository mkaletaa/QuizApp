import { useEffect } from 'react'
import { Text } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

import { reportAMistake } from '../../../../data/texts'
import { removeUnderscores, sendAnEmail } from '../../../utils/functions'
import useStore from '../../../utils/store'

// import { Colors } from '../../../utils/constants'

export default function MistakeButton({ prop, handlePress }) {
  // const setShowPopup = useStore(state => state.setShowPopup)
  useEffect(() => {
    console.log(JSON.stringify(prop))
  }, [])
  return (
    <PaperButton
      mode="elevated"
      onPress={() => {
        sendAnEmail(removeUnderscores(prop))
        handlePress()
        // setShowPopup(false)
      }}
      // disabled={chosenOptions.length === 0}
      elevation={5}
      buttonColor={'red'}
      style={{
        borderRadius: 4,
      }}
    >
      <Text
        style={{
          color: 'white',
        }}
      >
        {reportAMistake.toUpperCase()}
      </Text>
    </PaperButton>
  )
}
