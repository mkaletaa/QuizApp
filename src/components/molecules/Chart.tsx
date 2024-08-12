// import React from 'react';
// import { View, Text } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
// import { surfaceBg, textColor } from '../../utils/constants';
// import Gradient from './atoms/Gradient';

// export default function Chart({resultsArray}){
//       const transformData = data => {
//         const counts = data.reduce((acc, item) => {
//           acc[item.isCorrect] = (acc[item.isCorrect] || 0) + 1
//           return acc
//         }, {})

//         return [
//           {
//             name: 'Correct',
//             correctness: counts.correct || 0,
//             color: 'rgba(50, 199, 31, 1)',
//             legendFontColor: textColor,
//             legendFontSize: 15,
//           },
//           {
//             name: 'Kind of',
//             correctness: counts.kindof || 0,
//             color: 'orange',
//             legendFontColor: textColor,
//             legendFontSize: 15,
//           },
//           {
//             name: 'Incorrect',
//             correctness: counts.incorrect || 0,
//             color: 'rgba(255, 35, 35, 1)',
//             legendFontColor: textColor,
//             legendFontSize: 15,
//           },
//         ]
//       }


//     return (
//       <View
//         style={{
//           backgroundColor: surfaceBg,
//           margin: 20,
//           borderRadius: 10,
//           elevation: 2,
//           paddingVertical: 0,
//         //   padding: 20,
//           alignItems: 'center',
//         }}
//       >
//         {/* <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
//           Quiz Results
//         </Text> */}
//         <Gradient/>
//         <PieChart
//           data={transformData(resultsArray)}
//           width={300}
//           height={180}
//           chartConfig={{
//             backgroundColor: '#fe23ff',
//             backgroundGradientFrom: '#eff3ff',
//             backgroundGradientTo: '#fe23ff',
//             decimalPlaces: 2,
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//           }}
//           accessor={'correctness'}
//           backgroundColor={'transparent'}
//           paddingLeft={'15'}
//           center={[0, 0]}
//           absolute
//         />
//       </View>
//     )
// }