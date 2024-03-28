import React, { useRef, useLayoutEffect, useImperativeHandle, forwardRef, useContext } from 'react'
import { Group as _Group, Rect as _Rect, Stage as _Stage } from './render'
import { useBindEvent, useChildren, usePropertyChange } from './_hooks'
import { AnimationConfig, Children } from './type'

import { Context } from './Stage'

type GroupProps = _Group['data'] & AnimationConfig & Children
export const Group = forwardRef<_Group, GroupProps>((props, ref) => {
  const groupRef = useRef(new _Group(props))
  useImperativeHandle(ref, () => groupRef.current)

  const [newChild, shape] = useChildren(props.children)

  // useLayoutEffect(() => {
  //   groupRef.current.append(shape)
  // }, [])

  useBindEvent(props, groupRef.current)

  const parent = useContext(Context)

  usePropertyChange(props, 'name', groupRef.current)

  usePropertyChange(props, 'opacity', groupRef.current)
  usePropertyChange(props, 'zIndex', groupRef.current)

  usePropertyChange(props, 'draggable', groupRef.current)
  usePropertyChange(props, 'cursor', groupRef.current)
  usePropertyChange(props, 'pointerEvents', groupRef.current)
  usePropertyChange(props, 'transform', groupRef.current)
  usePropertyChange(props, 'onclick', groupRef.current)
  usePropertyChange(props, 'onmouseenter', groupRef.current)
  usePropertyChange(props, 'onmousemove', groupRef.current)
  usePropertyChange(props, 'onmouseleave', groupRef.current)
  usePropertyChange(props, 'onmousedown', groupRef.current)
  usePropertyChange(props, 'onmouseup', groupRef.current)
  usePropertyChange(props, 'ondragstart', groupRef.current)
  usePropertyChange(props, 'ondrag', groupRef.current)
  usePropertyChange(props, 'ondragend', groupRef.current)

  useLayoutEffect(() => {
    parent.append(groupRef.current)

    return () => {
      groupRef.current.remove()
    }
  }, [])

  return <Context.Provider value={groupRef.current}>{newChild}</Context.Provider>
})
