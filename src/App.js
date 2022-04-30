import React from 'react'
import { HashRouter } from 'react-router-dom'
import MainComponent from "./components/MainComponent"
import './css/App.css'
import myStore from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App" >
      <Provider store={myStore}>
        <HashRouter
        >
          <MainComponent />
        </HashRouter>
      </Provider>

    </div>
  );
}

export default App;
