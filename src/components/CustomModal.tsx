import { Modal, View, StyleSheet } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { Colors } from '../utils/constants'
export default function CustomModal({
  children = null,
  visible,
  onRequestClose,
  text = null,
  icon = null,
  title = null,
}) {
  // return (
  //   <Modal
  //     animationType="fade"
  //     transparent={true}
  //     visible={showModal} //showModal
  //     onRequestClose={() => onRequestClose()}
  //   >
  //       <View style={styles.modalContainer}>
  //         <View style={styles.modalContent}>
  //           {modalText && (
  //             <Text
  //               style={{ textAlign: 'center', fontSize: 15, marginBottom: 10 }}
  //             >
  //               {modalText}
  //             </Text>
  //           )}
  //           {children}
  //         </View>
  //       </View>
  //   </Modal>
  // )

  return (
    <Portal>
      <Dialog
        style={{
          backgroundColor: Colors.screenBg,
          // borderRadius: 22
        }}
        visible={visible}
        onDismiss={onRequestClose}
      >
        {icon && <Dialog.Icon icon={icon} size={50}/>}
        {title && <Dialog.Title>{title}</Dialog.Title>}
        <Dialog.Content>
          <Text
            style={{
              width: '100%',
              // backgroundColor: "red",
              textAlign: 'center',
              fontSize: 18,
            }}
            variant="bodyMedium"
          >
            {text}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          {!children && <Button onPress={onRequestClose}>
            <Text style={{fontSize: 20, color: '#7d609f'}}>

            Ok
            </Text>
            </Button>}
          {children}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.8)',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
  },
})
