import { Group, Rect, Text, measureText } from '../../render'

import { ChartRoot } from '../ChartRoot'

export interface LegendDataItem {
  color: string
  label: string
}

const defaultLegendCfg: ICharts.IOption['legend'] = { orient: 'horizontal', left: 'center' }
export class Legend {
  cr: ChartRoot

  constructor(cr: ChartRoot) {
    this.cr = cr
  }

  render(data: LegendDataItem[]) {
    const { cr } = this

    const { stage } = cr

    const legendConfig = { ...defaultLegendCfg, ...cr.userOption.legend }

    const fontSize = 14

    const width = 30
    const height = 16
    const cornerRadius = 4

    const itemGap = 10
    const textGap = 5

    const x = 10
    const y = 10

    const totalWidth =
      data.reduce((acc, item) => acc + width + textGap + measureText(item.label, fontSize).textWidth, 0) +
      itemGap * (data.length - 1)

    const horizontalX = stage.canvasSize.width / 2 - totalWidth / 2

    const elements = []

    const isVertical = legendConfig.orient === 'vertical'

    let prevX = horizontalX

    data.forEach((item, index) => {
      const verticalY = y + (height + itemGap) * index

      const { textWidth } = measureText(item.label, fontSize)

      const horizontalItemWidth = width + itemGap + textWidth

      const rectX = isVertical ? x : prevX
      prevX = rectX + horizontalItemWidth
      const legendRect = new Rect({
        x: rectX,
        y: isVertical ? verticalY : y,
        width,
        height,
        fillStyle: item.color,
        cursor: 'pointer',
        cornerRadius
      })
      const legendText = new Text({
        x: isVertical ? x + width + textGap : rectX + width + textGap,
        y: isVertical ? verticalY + height / 2 : y + height / 2 + 1,
        content: item.label,
        fillStyle: item.color,
        fontSize,
        cursor: 'pointer',
        textBaseline: 'middle'
      })
      const legendGroup = new Group({ name: 'legend-Group - ' + index })
      legendGroup.append([legendRect, legendText])

      legendGroup.onmouseenter = () => {
        this.onSelect(item, index)
      }

      legendGroup.onmouseleave = () => {
        this.onCancelSelect(item, index)
      }

      elements.push(legendGroup)
    })

    this.elements = elements
  }

  elements: Group[]

  onSelect(legendItem: LegendDataItem, index: number) {}
  onCancelSelect(legendItem: LegendDataItem, index: number) {}
}
