import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Colors } from '../../utils/constants'
import ContentRenderer from '../ContentRenderer/_ContentRenderer'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'

export default function ChapterDescription({
  chapterDescription: chapterDes,
}: {
  chapterDescription: string
}) {
  // const [expanded, setExpanded] = useState(false);
  // const [viewHeight, setViewHeight] = useState(0);
  // const [maxReached, setMaxReached] = useState(true);

  // const toggleExpand = () => {
  //   setExpanded(!expanded);
  // };

  // const handleLayout = (event: any) => {
  //   const { height } = event.nativeEvent.layout;
  //   if(height<150)
  //     setMaxReached(false)
  //   setViewHeight(height);
  // };

  return (
    // <TouchableOpacity
    //   activeOpacity={0.8}
    //   onPress={toggleExpand}
    //   style={{
    //     width: '90%',
    //     backgroundColor: surfaceBg,
    //     elevation: 2,
    //     borderRadius: 10,
    //     padding: 5,
    //     overflow: 'hidden',
    //     marginVertical: 20,
    //     // maxHeight: expanded ? null : 150, // null to remove maxHeight when expanded
    //     alignItems: 'center',
    //     position: 'relative', // Ensure proper positioning of absolute elements
    //   }}
    // >
    <View
      style={{
        zIndex: 1,
        width: '90%',
        backgroundColor: Colors.surfaceBg,
        elevation: 2,
        borderRadius: 10,
        padding: 5,
        overflow: 'hidden',
        marginVertical: 20,
        // maxHeight: expanded ? null : 150, // null to remove maxHeight when expanded
        alignItems: 'center',
        position: 'relative', // Ensure proper positioning of absolute elements
      }}
    >
      <ContentRenderer content={chapterDes} />
    </View>

    //   {maxReached &&  viewHeight < 150 && (
    //     <React.Fragment>
    //       <LinearGradient
    //         colors={['transparent', gradient]}
    //         style={{
    //           width: '110%',
    //           height: 100,
    //           position: 'absolute',
    //           bottom: 0,
    //           zIndex: 2,
    //         }}
    //       />
    //       <AntDesign
    //         name="down"
    //         size={34}
    //         color={boldTextColor}
    //         style={{
    //           zIndex: 3,
    //           position: 'absolute',
    //           bottom: 0,
    //           textAlign: 'center',
    //         }}
    //       />
    //     </React.Fragment>
    //   )}
    //  </TouchableOpacity>
  )
}
