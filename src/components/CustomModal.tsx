import { Modal, View, StyleSheet, Text } from 'react-native'

export default function CustomModal({
  children = null,
  showModal,
  onRequestClose,
  modalText = null,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal} //showModal
      onRequestClose={() => onRequestClose()}
    >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalText && (
              <Text
                style={{ textAlign: 'center', fontSize: 15, marginBottom: 10 }}
              >
                {modalText}
              </Text>
            )}
            {children}
          </View>
        </View>
    </Modal>
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
