import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Repository from './components/Repository';
import { store, persistor } from './store';
// import store from './store'

export const App = () => {
  const [input, setInput] = useState('')

  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Repository inputValue={input} handleInputChange={setInput} />
    </PersistGate>
  </Provider>
  )
  }
