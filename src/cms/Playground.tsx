import { useContext } from 'react'

import { PathContext, slice } from './SliceComponent'

const PlaygroundSchema = {
  title: 'Texto',
  type: 'object',
  properties: {
    text: {
      title: 'Texto',
      type: 'string',
    },
  },
}

const PlaygroundUISchema = {}

const Playground2 = slice(
  {},
  () => {
    const path = useContext(PathContext)

    return <>{path}</>
  },
  PlaygroundSchema,
  PlaygroundUISchema
)

export const Playground = slice(
  {},
  () => {
    return (
      <>
        <Playground2 tag="gabriel" />
      </>
    )
  },
  PlaygroundSchema,
  PlaygroundUISchema
)
