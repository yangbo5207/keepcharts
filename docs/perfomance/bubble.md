---
nav: 
  title: 性能
  order: 3

toc: content
---

# 5000 个元素

`inula-charts` 可以轻松支持 5000+ 元素同时动画的流畅执行。性能表现优异。

```tsx
/**
 * inline: true
 */
import { useEffect, useState } from 'react'
import { Rect, Stage } from 'inula-charts'

const rectCount = 5000

const stageWidth = 700
const stageHeight = 3600

const App = () => {
  const rectSize = 17

  const [list, setList] = useState(() => {
    const width = rectSize
    const height = rectSize
    let curRow = 0
    let curColumn = 0
    const start_x = 5
    const start_y = 5

    const gap = 5

    return Array.from({ length: rectCount }, _ => {
      let x = calcX()

      if (x + width > stageWidth) {
        curRow += 1
        curColumn = 0

        x = calcX()
      }

      const y = start_y + (height + gap) * curRow

      curColumn += 1

      return { x, y, width, height }

      function calcX() {
        return start_x + (width + gap) * curColumn
      }
    })
  })

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count % 2 === 0) {
      setList(list.map(item => ({ ...item, width: item.width - 10, height: item.height - 10 })))
    } else {
      setList(list.map(item => ({ ...item, width: rectSize, height: rectSize })))
    }
  }, [count])

  return (
    <Stage width={stageWidth} height={stageHeight} margin="30px auto">
      {list.map(item => (
        <Rect
          x={item.x}
          y={item.y}
          width={item.width}
          height={item.height}
          fillStyle="pink"
          animation={{
            duration: 1000,
            animationEnd: () => {
              setCount(count + 1)
            }
          }}
        />
      ))}
    </Stage>
  )
}

export default App

```