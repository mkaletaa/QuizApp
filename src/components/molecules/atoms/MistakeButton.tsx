import {Button as PaperButton} from 'react-native-paper'
import {Text} from 'react-native'
import { reportAMistake } from '../../../../data/texts'
import { removeUnderscores, sendAnEmail } from '../../../utils/functions'
import useStore from '../../../utils/store'
// import { Colors } from '../../../utils/constants'

export default function MistakeButton({prop}){
    const setShowPopup = useStore(state => state.setShowPopup)
    return (
      <PaperButton
        mode="elevated"
        onPress={() => {
          sendAnEmail(removeUnderscores(prop))
          setShowPopup(false)
        }}
        // disabled={chosenOptions.length === 0}
        elevation={5}
        buttonColor={"red"}
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