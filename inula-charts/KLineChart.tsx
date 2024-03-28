import { useEffect, useRef } from 'react'

import rmstCharts, { ChartRoot } from './core'
import { ChartProps } from './type'
import { addTypeToChartOption } from './utils'

export const KLineChart = ({ option, width = 750, height = 500, containerStyle }: ChartProps) => {
  const insRef = useRef<ChartRoot>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ins = rmstCharts.init(containerRef.current)
    insRef.current = ins
  }, [])

  useEffect(() => {
    const _option = addTypeToChartOption(option, 'candlestick')
    insRef.current.setOption(_option)
  }, [option])

  return <div ref={containerRef} style={{ width, height, ...containerStyle }}></div>
}
