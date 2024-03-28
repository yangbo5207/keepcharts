import { useEffect, useRef } from 'react'

import rmstCharts, { ChartRoot } from './core'
import { ChartProps } from './type'

export const PieChart = ({ option, width = 750, height = 500, containerStyle }: ChartProps) => {
  const insRef = useRef<ChartRoot>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ins = rmstCharts.init(containerRef.current)
    insRef.current = ins
  }, [])

  useEffect(() => {
    insRef.current.setOption(option)
  }, [option])

  return <div ref={containerRef} style={{ width, height, ...containerStyle }}></div>
}
