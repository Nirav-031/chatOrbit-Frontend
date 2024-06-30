import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      
        <App />
      </PersistGate>
    </Provider>

)


// index.js or index.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import { Provider } from 'react-redux';
// import store, { persistor } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import ErrorBoundary from './components/ErrorBoundry.jsx';
// // import ErrorBoundary from '../src/components/ErrorBoundary';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <ErrorBoundary>
//         <App />
//       </ErrorBoundary>
//     </PersistGate>
//   </Provider>
// );

