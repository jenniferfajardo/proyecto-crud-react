import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from "./components/navbar/NavBar"

function App() { //Función por declaración
  

  return (
    <section id='container'>
      <NavBar></NavBar>
      <main>
        <div className='frame-content'>
          <Outlet></Outlet>
        </div>
      </main>

    </section>
  )
}

export default App
