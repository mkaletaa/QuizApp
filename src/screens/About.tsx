import ContentRenderer from '../components/ContentRenderer/_ContentRenderer'
import about from '../../data/about.json'
import { useEffect, useState } from 'react'
import { Component } from '../utils/types'
import { ScrollView } from 'react-native'
import { screenBackground } from '../utils/constants'
import Gradient from '../components/molecules/atoms/Gradient'
export default function About() {
  const [content, setContent] = useState<Component[] | string>('')
  useEffect(() => {
    //@ts-ignore
    setContent(about)
    // console.log(about)
  }, [])
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: screenBackground,
        //
      }}
    >
      <Gradient />

      <ContentRenderer content={content} />
    </ScrollView>
  )
}
