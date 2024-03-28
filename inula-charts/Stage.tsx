import React, { CSSProperties, useRef, useLayoutEffect, createContext, useState, useEffect } from 'react'
import { Group as _Group, Rect as _Rect, Stage as _Stage } from './render'
import { useChildren } from './_hooks'

interface StageProps extends CSSProperties {
  children?
  width?: number
  height?: number
  border?: string
  background?: string
  margin?: string | number
}

const defaultProps: StageProps = {
  width: 600,
  height: 400,
  background: '#fff',
  margin: '0 auto'
}

export const Context = createContext<_Stage | _Group>(null)

export const Stage = (props: StageProps) => {
  const mergeProps = { ...defaultProps, ...props }

  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<_Stage>(new _Stage())
  const [newChild, shape] = useChildren(props.children)

  useLayoutEffect(() => {
    stageRef.current.mount({ container: containerRef.current as HTMLDivElement }, true)
  }, [])

  return (
    <Context.Provider value={stageRef.current}>
      <div ref={containerRef} style={mergeProps}></div>

      {newChild}
    </Context.Provider>
  )
}
