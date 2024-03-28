---
nav: 
  title: 组件
  order: 2
group:
  title: 基础组件
  order: -1

toc: content
order: 5
---

# Curve 曲线


```tsx
/**
 * inline: true
 */
import { useState } from 'react'
import { Line, Stage } from 'inula-charts'

const App = () => {
  const [startX, setStartX] = useState(100)
  const [startY, setStartY] = useState(100)

  const [endX, setEndX] = useState(300)
  const [endY, setEndY] = useState(150)

  return (
    <>
      <div>
        <label> startX: </label>
        <input type="range" value={startX} min={100} max={150} onChange={evt => setStartX(Number(evt.target.value))} />
      </div>

      <div>
        <label> startY: </label>
        <input type="range" value={startY} min={100} max={350} onChange={evt => setStartY(Number(evt.target.value))} />
      </div>

      <div>
        <label> endX: </label>
        <input type="range" value={endX} min={300} max={450} onChange={evt => setEndX(Number(evt.target.value))} />
      </div>

      <div>
        <label> endY: </label>
        <input type="range" value={endY} min={150} max={350} onChange={evt => setEndY(Number(evt.target.value))} />
      </div>

      <Stage>
        <Line
          points={[startX, startY, 200, 200, endX, endY]}
          smooth={true}
          draggable
          lineWidth={2}
          strokeStyle="blue"
        />
      </Stage>
    </>
  )
}

export default App
```

```tsx | pure
import { useState } from 'openinula'
import { Line, Stage } from 'inula-charts'

const App = () => {
  const [startX, setStartX] = useState(100)
  const [startY, setStartY] = useState(100)

  const [endX, setEndX] = useState(300)
  const [endY, setEndY] = useState(150)

  return (
    <>
      <div>
        <label> startX: </label>
        <input type="range" value={startX} min={100} max={150} onChange={evt => setStartX(Number(evt.target.value))} />
      </div>

      <div>
        <label> startY: </label>
        <input type="range" value={startY} min={100} max={350} onChange={evt => setStartY(Number(evt.target.value))} />
      </div>

      <div>
        <label> endX: </label>
        <input type="range" value={endX} min={300} max={450} onChange={evt => setEndX(Number(evt.target.value))} />
      </div>

      <div>
        <label> endY: </label>
        <input type="range" value={endY} min={150} max={350} onChange={evt => setEndY(Number(evt.target.value))} />
      </div>

      <Stage>
        <Line
          points={[startX, startY, 200, 200, endX, endY]}
          smooth={true}
          draggable
          lineWidth={2}
          strokeStyle="blue"
        />
      </Stage>
    </>
  )
}

export default App
```