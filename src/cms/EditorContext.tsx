import { createContext } from 'react'

type PageType = 'global' | 'collection' | 'category' | 'product' | 'page'

interface PageMetadata {
  key: PageType
  value: string
}

interface Page {
  id: string
  title: string
}

interface IEditorContext {
  contents: Record<string, unknown>
  pageMetadata: PageMetadata[]
  mousePicking: boolean
  loading: boolean
  dragging?: string
  selected?: string
  pages: Page[]
}

export const EditorContext = createContext({} as IEditorContext)
