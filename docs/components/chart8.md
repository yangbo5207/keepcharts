---
nav: 
  title: 组件
  order: 2
group:
  title: 图表组件
  order: 1

toc: content
order: 8
---

# 柱状图

```tsx
/**
 * defaultShowCode: true
 */
import { BarChart } from 'inula-charts'

const App = () => {
  const 柱状图 = {
    xAxis: {
      data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
    },
    series: [
      {
        data: [190, 210, 300, 450]
      }
    ]
  }

  return <BarChart option={柱状图} containerStyle={{ border: '1px solid #eee' }} />
}

export default App
```
