import React, {useEffect} from 'react';
import {Stage, Rect} from 'inula-charts'

export default function Outer() {
  console.log('xxxxxxxxxx outer')
  useEffect(() => {
    console.log('xxx')
  }, [])
  return (
    <div>
      <Stage>
        <Rect x={10} y={120} width={100} height={100} fillStyle="gray" />
      </Stage>
    </div>
  )
}