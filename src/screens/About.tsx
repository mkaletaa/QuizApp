import ContentRenderer from '../components/ContentRenderer'
import about from '../../data/about.json'
import { useEffect, useState } from 'react'
import { Component } from '../utils/types'
import { ScrollView } from 'react-native'
export default function About() {
  const [content, setContent] = useState<Component[] | string>('')
  useEffect(() => {
    //@ts-ignore
    setContent(about)
    console.log(about)
  }, [])
  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <ContentRenderer content={content} />
    </ScrollView>
  )
}
