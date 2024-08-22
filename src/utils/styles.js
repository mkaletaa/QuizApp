import { StyleSheet } from "react-native"

const utilStyles = StyleSheet.create({
  scrollViewCardContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 90,
    // marginBottom: 90,
  },
  popup: {
    position: 'absolute',
    right: 60,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
  },
})


export default utilStyles