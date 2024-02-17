import { View, StatusBar, Text } from 'react-native'
import MathJax from 'react-native-mathjax'

export default function Options() {
  const mmlOptions = {
    messageStyle: 'none',
    extensions: ['tex2jax.js'],
    jax: ['input/TeX', 'output/HTML-CSS'],
    tex2jax: {
      inlineMath: [
        ['$', '$'],
        ['\\(', '\\)'],
      ],
      displayMath: [
        ['$$', '$$'],
        ['\\[', '\\]'],
      ],
      processEscapes: true,
    },
    TeX: {
      extensions: [
        'AMSmath.js',
        'AMSsymbols.js',
        'noErrors.js',
        'noUndefined.js',
      ],
    },
  }

  return (
    <View>
      <Text>Options</Text>
      <StatusBar />

      <MathJax
        // mathJaxOptions={mmlOptions}
        html={'$sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$'}
      />
    </View>
  )
}
