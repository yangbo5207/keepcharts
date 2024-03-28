---
nav: 
  title: 使用指南
  order: 1
group:
  title: 指南
  order: -1

toc: content
---

# 介绍与下载

[![GitHub](https://img.shields.io/github/license/awmleer/reto.svg?logo=github)](https://github.com/awmleer/reto) 

`inula-charts` 是专门为前端框架 `openinula` 高性能图表组件库。我们支持以 JSX 的方式简单创建图形元素与图表组件。

```tsx | pure
<Stage border="1px solid orange">
  <Rect />
  <Rect x={100} fillStyle="red" />
  <Group draggable>
    <Rect x={200} fillStyle="red" />
    <Rect x={200} y={120} fillStyle="orange" />
  </Group>
</Stage>
```

## 安装 

[![npm version](https://img.shields.io/npm/v/inula-charts.svg?logo=npm)](https://www.npmjs.com/package/inula-charts)  [![npm downloads](https://img.shields.io/npm/dw/inula-charts.svg?logo=npm)](https://www.npmjs.com/package/inula-charts)

使用如下方式添加 `inula-charts` 到你的项目

```bash
yarn add inula-charts

# or
npm i inula-charts
```

引入项目之后，使用如下方式在代码中引入

```tsx | pure
import { Stage, Group, Rect, Circle } from 'inula-charts'
```


## 快速上手使用

`inula-charts` 的使用与常规的组件使用方式一样，我们可以简单创建一个图形元素。如下案例所示

```tsx
/**
 * defaultShowCode: true
 */
import { Stage, Group, Rect, Circle } from 'inula-charts'

function App() {
  return (
    <div>
      <Stage height={200}>
        <Group>
          <Rect x={120} y={10} width={100} height={100} fillStyle="blue" />
          <Rect x={180} y={10} width={100} height={100} fillStyle="red" />
        </Group>

        <Circle
          x={0}
          y={36}
          radius={30}
          fillStyle="red"
          cursor="pointer"
          onclick={() => {
            console.log(1234)
          }}
          onmouseenter={() => {
            console.log('enter')
          }}
        />
      </Stage>
    </div>
  )
}

export default App
```

我们也可以创建一个完整的图表组件

```tsx
/**
 * defaultShowCode: true
 */
import {LineChart} from 'inula-charts'

const options = {
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

function App() {
  return (
    <LineChart height={400} option={options} />
  )
}

export default App
```