import colorAlpha from 'color-alpha'

import Draggable from '../Draggable'
import { EventParameter, Handler, eventStageList } from '../constant'
import { findToRoot, initStage, setCanvasStyle, triggerEventHandlers, updateCanvas } from './utils'
import { resetSchedulerCount } from './scheduler'
import { findHover } from './findHover'
import { mountStage } from './renderUi'
import { ICursor, IShape, IShapeType } from '../type'
import { drawShapes, drawStageShapes } from '../renderer/canvas'
import Rect from '../shape/Rect'
import { BoundingRect } from '../shape/AbstractUi'
import { isStage } from '../utils'
import AbsEvent from '../AbsEvent'

interface IOption {
  container: HTMLElement
}

export class Stage extends AbsEvent {
  constructor(option?: IOption) {
    super()

    if (option) {
      this.mount(option)
    }
  }

  option: IOption

  mount(option: IOption, isHand = false) {
    this.option = option

    const { container } = option
    const stage = initStage(container)

    this.canvasElement = stage.canvasElement
    this.ctx = stage.ctx

    if (isHand) {
      this.renderStage()
    }

    this.addStageEventListener()
  }

  refreshDraw() {
    const ctx = updateCanvas(this.canvasElement, this.option.container.offsetWidth, this.option.container.offsetHeight)
    this.ctx = ctx

    this.renderStage(true)
  }

  type: IShapeType = 'Stage'

  canvasElement: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  declare parent: null
  children: IShape[] = []

  draggingMgr = new Draggable()

  get center() {
    return { x: this.canvasElement.offsetWidth / 2, y: this.canvasElement.offsetHeight / 2 }
  }

  get canvasSize() {
    return { width: this.canvasElement.offsetWidth, height: this.canvasElement.offsetHeight }
  }

  dispose() {
    const disposeAll = (children: IShape[]) => {
      children.forEach(item => {
        item.dispose()

        if (Array.isArray(item['children'])) {
          disposeAll(item['children'])
        }
      })
    }

    disposeAll(this.children)
  }

  removeAllShape() {
    this.dispose()

    this.children = []

    this.renderStage()
  }

  append(p: IShape[]): void
  append(p: IShape): void
  append(...args: IShape[]): void
  append(...args) {
    const elements = args.flat(1)

    this.children = this.children.concat(elements)
    this.children = this.children.map(item => Object.assign(item, { parent: this }))

    mountStage(this.children, this)

    this.renderStage()
  }

  appendIncrement(shape: IShape) {
    drawShapes(this.ctx, [shape])
  }

  private isAsyncRenderTask = false

  // 调度层 - 收集多次任务指令
  renderStage(sync?: boolean) {
    if (sync) {
      drawStageShapes(this)
      return
    }

    if (this.isAsyncRenderTask) {
      return
    }

    this.isAsyncRenderTask = true

    requestAnimationFrame(() => {
      resetSchedulerCount()

      drawStageShapes(this)

      this.isAsyncRenderTask = false
    })
  }

  private hoveredStack: IShape[] = []

  private addStageEventListener() {
    this.canvasElement.onmousemove = evt => {
      {
        // 触发舞台(canvas Element)的事件
        const eventParameter: EventParameter = { target: null, x: evt.offsetX, y: evt.offsetY, nativeEvent: evt }
        triggerEventHandlers(this, 'onmousemove', eventParameter)
      }

      if (this.draggingMgr.dragging) {
        return
      }

      this.handleHoveredElement(evt.offsetX, evt.offsetY)
    }

    this.canvasElement.onmouseleave = evt => {
      if (this.hoveredStack.length) {
        if (evt.buttons !== 0) {
          return
        }

        this.hoveredStack.toReversed().forEach(elementItem => {
          const eventParameter: EventParameter = { target: elementItem, x: evt.offsetX, y: evt.offsetY }
          triggerEventHandlers(elementItem, 'onmouseleave', eventParameter)
        })

        this.hoveredStack = []
      }

      {
        // 触发舞台(canvas Element)的事件
        const eventParameter: EventParameter = { target: null, x: evt.offsetX, y: evt.offsetY, nativeEvent: evt }
        this.onmouseleave(eventParameter)
      }
    }

    eventStageList
      .filter(n => !['onmousemove', 'onmouseleave'].includes(n))
      .forEach(eventName => {
        this.canvasElement[eventName] = evt => {
          {
            // 触发舞台(canvas Element)的事件
            const eventParameter: EventParameter = { target: null, x: evt.offsetX, y: evt.offsetY, nativeEvent: evt }
            this[eventName](eventParameter)
          }

          const hovered = findHover(this.ctx, this.children, evt.offsetX, evt.offsetY)
          if (hovered) {
            const eventParameter: EventParameter = { target: hovered, x: evt.offsetX, y: evt.offsetY, nativeEvent: evt }
            triggerEventHandlers(hovered, eventName, eventParameter)
          }
        }
      })

    // 拖拽
    this.canvasElement.addEventListener('mousedown', evt => {
      const hovered = findHover(this.ctx, this.children, evt.offsetX, evt.offsetY)
      if (hovered) {
        const eventParameter: EventParameter = { target: hovered, x: evt.offsetX, y: evt.offsetY, nativeEvent: evt }
        this.draggingMgr.dragStart(eventParameter, this.canvasElement.getBoundingClientRect())
      }
    })
  }

  private handleHoveredElement(x: number, y: number) {
    const hovered = findHover(this.ctx, this.children, x, y)

    if (hovered) {
      this.setHoveredElementCursor(hovered)

      const eventParameter: EventParameter = { target: hovered, x, y }
      triggerEventHandlers(hovered, 'onmousemove', eventParameter)

      const stack = findToRoot(hovered)

      for (let i = this.hoveredStack.length - 1; i >= 0; i--) {
        const elementItem = this.hoveredStack[i]

        if (!stack.includes(elementItem)) {
          const eventParameter: EventParameter = { target: elementItem, x, y }
          triggerEventHandlers(elementItem, 'onmouseleave', eventParameter)

          this.hoveredStack.splice(i, 1)
        }
      }

      stack.forEach(item => {
        if (!this.hoveredStack.includes(item)) {
          const eventParameter: EventParameter = { target: item, x, y }
          triggerEventHandlers(item, 'onmouseenter', eventParameter)

          this.hoveredStack.push(item)
        }
      })
    } else {
      this.setCursor('default')

      this.hoveredStack.toReversed().forEach(elementItem => {
        const eventParameter: EventParameter = { target: elementItem, x, y }
        triggerEventHandlers(elementItem, 'onmouseleave', eventParameter)
      })

      this.hoveredStack = []
    }
  }

  private setHoveredElementCursor(hovered: IShape) {
    let hasCursorTarget = hovered
    while (hasCursorTarget && !hasCursorTarget.data.cursor) {
      const parent = hasCursorTarget.parent as unknown as IShape
      if (isStage(parent)) {
        break
      }

      hasCursorTarget = parent
    }
    const cursor = hasCursorTarget.data.cursor || 'auto'
    this.setCursor(cursor)
  }

  private setCursor(cursor: ICursor) {
    this.canvasElement.style.setProperty('cursor', cursor)
  }

  dirtyRectUi: Rect
  timer
  renderDirtyRectUi(sb: BoundingRect) {
    if (!this.dirtyRectUi) {
      this.dirtyRectUi = new Rect({
        ...sb,
        fillStyle: colorAlpha('red', 0.2),
        strokeStyle: 'red',
        opacity: 0,
        pointerEvents: 'none'
      })
      this.append(this.dirtyRectUi)
    }

    clearTimeout(this.timer)

    this.dirtyRectUi.attr(sb)
    this.dirtyRectUi.animateCartoon({ opacity: 1 }, { duration: 300 })

    this.timer = setTimeout(() => {
      this.dirtyRectUi.animateCartoon({ opacity: 0 }, { duration: 300 })
    }, 800)
  }
}
