import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainComponent from "./components/MainComponent"
import './css/App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
