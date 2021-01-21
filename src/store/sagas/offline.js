import { put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import NetInfo, { useNetInfo } from '@react-native-community/netinfo'
import { OFFLINE, ONLINE } from 'redux-offline-queue'

export function* startWatchingNetworkConnectivity() {
  // const netInfo = useNetInfo()
  const channel = eventChannel(emitter => {
    // netInfo.isConnected.addEventListener('connectionChange', emitter)
    // NetInfo.fetch().then(state => {
    //   console.log('is connected: ', state.isConnected)
    // })

    const subscribe = NetInfo.addEventListener(emitter)

    return () => subscribe()
  })

  try {
    while(true) {
      const { isConnected } = yield take(channel)

      if (isConnected) {
        yield put({ type: ONLINE })
      } else {
        yield put({ type: OFFLINE })
      }
    }
  } finally {
    channel.close()
  }
}