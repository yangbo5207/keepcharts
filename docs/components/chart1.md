---
nav: 
  title: 组件
  order: 2
group:
  title: 图表组件
  order: 1

toc: content
order: 1
---

# 折线图


```tsx
/**
 * defaultShowCode: true
 */
import { LineChart } from 'inula-charts'

const App = () => {
  const 折线图 = {
    xAxis: {
      data: ['a', 'b', 'c', 'd', 'e', 'f']
    },
    series: [
      {
        type: 'line',
        data: [620, 932, 901, 934, 800, 1001]
      }
    ]
  }

  return <LineChart option={折线图} containerStyle={{ border: '1px solid #eee' }} />
}

export default App
````