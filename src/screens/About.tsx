import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import about from '../../data/about.json'
import ContentRenderer from '../components/ContentRenderer/_ContentRenderer'
import Gradient from '../components/molecules/atoms/Gradient'
import { Colors } from '../utils/constants'
import { Component } from '../utils/types'

export default function About() {
  const [content, setContent] = useState<Component[] | string>('')

  useEffect(() => {
    //@ts-ignore
    setContent(about)
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: Colors.screenBg,
        //
      }}
    >
      <ContentRenderer content={content} />
    </ScrollView>
  )
}
