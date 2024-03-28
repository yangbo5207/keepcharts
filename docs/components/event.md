---
nav: 
  title: 组件
  order: 2

toc: content
order: 1
---

# event 事件

```tsx
/**
 * inline: true
 */
import { useState } from 'react'
import { Circle, Stage } from 'inula-charts'

const App = () => {
  const [log, setLog] = useState('')

  return (
    <>
      <div style={{ height: 20 }}>{log}</div>

      <Stage>
        <Circle
          x={350}
          y={260}
          radius={100}
          cursor="pointer"
          fillStyle="pink"
          onclick={() => {
            setLog('click')
          }}
          onmouseenter={() => {
            setLog('mouseenter')
          }}
          onmouseleave={() => {
            setLog('mouseleave')
          }}
          onmousedown={() => {
            setLog('mousedown')
          }}
        />
      </Stage>
    </>
  )
}

export default App
```

```tsx | pure
import { useState } from 'openinula'
import { Circle, Stage } from 'inula-charts'

const App = () => {
  const [log, setLog] = useState('')

  return (
    <>
      <div style={{ height: 20 }}>{log}</div>

      <Stage>
        <Circle
          x={350}
          y={260}
          radius={100}
          cursor="pointer"
          fillStyle="pink"
          onclick={() => {
            setLog('click')
          }}
          onmouseenter={() => {
            setLog('mouseenter')
          }}
          onmouseleave={() => {
            setLog('mouseleave')
          }}
          onmousedown={() => {
            setLog('mousedown')
          }}
        />
      </Stage>
    </>
  )
}

export default App
```