import type { AppEventType } from './EventTypes'

export function sendMessage(event: AppEventType, data: any) {
  window.parent.postMessage(
    JSON.stringify({
      channel: 'APP',
      type: event,
      data,
    }),
    '*'
  )
}
