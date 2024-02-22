// import {
//   ScrollView,
//   View,
//   Text,
//   Button,
//   TextInput,
//   StyleSheet, Linking
// } from 'react-native'
// import * as MailComposer from 'expo-mail-composer'

// export default function Report({ route }) {
//   const itemOrTheory = route.params.itemOtTheory

//   const sendAnEmail = async () => {
//   const email = 'address@gmail.com'
//   const subject = 'Your default subject'
//   const body = 'Your default body text'

//   Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`)
//   }

//   return (
//     <ScrollView
//       contentContainerStyle={{
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'red',
//         alignItems: 'center',
//       }}
//     >
//       <Text>
//         You are reporting a mistake in the{' '}
//         {itemOrTheory === 'item' ? 'question' : 'text about'}
//         lorem Ips incorrectly formatted incorrectly lorem ipsum dolor sit amet,
//         consectetur adipiscing el aspect
//       </Text>
//       <Text>Describe what is wrong with it, and I will fix the issue:</Text>
//       <TextInput
//         style={styles.input}
//         textAlignVertical="top"
//         multiline={true}
//         numberOfLines={5}
//         placeholder="Type your description here..." // Dodaj placeholder
//       />

//       <TextInput
//         style={styles.email}
//         placeholder="Your e-mail address (optional)"
//         keyboardType="email-address"
//         // onChangeText={setText}
//         // value={text}
//       />

//       <Text>I will send you feedback. Your e-mail isn't stored anywhere.</Text>
//       <Button title="Send" onPress={sendAnEmail} />
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     height: '50%', // Dostosuj wysokość według własnych preferencji
//     width: '90%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingLeft: 10,
//     borderRadius: 5,
//     fontSize: 16,
//     color: 'black',
//     backgroundColor: 'white',
//     marginVertical: 10,
//   },
//   email: {
//     // height: '50%', // Dostosuj wysokość według własnych preferencji
//     width: '90%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingLeft: 10,
//     borderRadius: 5,
//     fontSize: 16,
//     color: 'black',
//     backgroundColor: 'white',
//     marginVertical: 10,
//   },
// })
