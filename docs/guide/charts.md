---
group:
  title: 指南
  order: 2

toc: content
order: 3
---

# 图表语法


图表是我们提供的单独的应用组件。他不能与基础图形混用。我们只需要传入参数直接渲染即可。

```tsx
/**
 * defaultShowCode: true
 */
import { LineChart } from 'inula-charts'

const App = () => {
  const 渐变图 = {
    xAxis: {
      data: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      boundaryGap: false
    },
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'sign',
        smooth: true,
        lineStyle: { width: 0 },
        symbol: 'none',
        areaStyle: {
          opacity: 0.8,
          color: [
            { offset: 0, color: 'rgb(128, 255, 15)' },
            { offset: 1, color: 'rgb(1, 191, 236)' }
          ]
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'sign',
        smooth: true,
        lineStyle: { width: 0 },
        symbol: 'none',
        areaStyle: {
          opacity: 0.8,
          color: [
            { offset: 0, color: 'rgb(0, 221, 25)' },
            { offset: 1, color: 'rgb(77, 119, 25)' }
          ]
        },
        data: [120, 282, 111, 234, 220, 340, 310]
      },
      {
        name: 'Line 3',
        type: 'line',
        stack: 'sign',
        smooth: true,
        lineStyle: { width: 0 },
        symbol: 'none',
        areaStyle: {
          opacity: 0.8,
          color: [
            { offset: 0, color: 'rgb(55, 162, 25)' },
            { offset: 1, color: 'rgb(116, 21, 19)' }
          ]
        },
        data: [320, 132, 201, 334, 190, 130, 220]
      },
      {
        name: 'Line 4',
        type: 'line',
        stack: 'sign',
        smooth: true,
        lineStyle: { width: 0 },
        symbol: 'none',
        areaStyle: {
          opacity: 0.8,
          color: [
            { offset: 0, color: 'rgb(25, 0, 13)' },
            { offset: 1, color: 'rgb(135, 0, 15)' }
          ]
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      },
      {
        name: 'Line 5',
        type: 'line',
        stack: 'sign',
        smooth: true,
        lineStyle: { width: 0 },
        symbol: 'none',
        areaStyle: {
          opacity: 0.8,
          color: [
            { offset: 0, color: 'rgb(255, 191, 0)' },
            { offset: 1, color: 'rgb(224, 62, 76)' }
          ]
        },
        data: [220, 302, 181, 234, 210, 290, 150]
      }
    ]
  }

  return <LineChart option={渐变图} containerStyle={{ border: '1px solid #eee' }} />
}

export default App
```
