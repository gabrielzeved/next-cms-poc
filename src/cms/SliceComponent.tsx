/* eslint-disable max-params */
import type { FunctionComponent } from 'react'
import { createContext, useContext, useEffect, useMemo } from 'react'

import { sendMessage } from './events/Messager'

export const PathContext = createContext('')

export type SliceComponent<T> = React.FunctionComponent<T> & {
  defaultContent: T
  tag: string
}
export const slice = <P extends object>(
  defaultContent: P,
  Slice: FunctionComponent<P>,
  schema: unknown,
  uiSchema: unknown
) => {
  const ControlledSlice: SliceComponent<P> = Slice as SliceComponent<P>

  ControlledSlice.defaultContent = defaultContent

  const NewSlice = (props: { tag: string } & Partial<P>) => {
    const { tag } = props

    const path = useContext(PathContext)
    const newPath = path ? `${path}/${tag}` : tag

    const content = useMemo(() => {
      return {
        ...defaultContent,
        ...props,
      }
    }, [props])

    useEffect(() => {
      sendMessage('LOAD_ELEMENT', {
        schema,
        uiSchema,
        content,
        defaultContent: {},
        tag,
        path: newPath,
      })

      return () => {
        sendMessage('REMOVE_ELEMENT', tag)
      }
    }, [content, newPath, tag])

    return (
      <PathContext.Provider value={newPath}>
        <ControlledSlice {...content} />
      </PathContext.Provider>
    )
  }

  return NewSlice
}
