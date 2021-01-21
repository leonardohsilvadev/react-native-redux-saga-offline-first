import { createStore, applyMiddleware } from 'redux'
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware
} from 'redux-offline-queue'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import rootReducer from './ducks'
import rootSaga from './sagas'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = []

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({ collapsed: true })

middlewares.push(logger)
middlewares.push(offlineMiddleware())
middlewares.push(suspendSaga(sagaMiddleware))
middlewares.push(consumeActionMiddleware())

// middlewares.push(sagaMiddleware)

export const store = createStore(persistedReducer, applyMiddleware(...middlewares))


sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

// export { store, persistor, sagaMiddleware }