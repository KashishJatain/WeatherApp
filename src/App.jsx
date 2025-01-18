import React from 'react'
import Header from './components/Header'
import Weather from './components/Weather'
import Forecast from './components/Forecast'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Weather />
      <Forecast />
      <Footer />
    </div>
  )
}

export default App
