import {Navbar, Loader, Transaction,
Welcome, Services, Footer
} from './components';

const  App = () => {


  return (
  <div className='main-h-screen'>
    <div className='gradient-bg-welcome'>
      <Navbar/>
      <Welcome/>
    </div>
    <Services/>
    <Transaction/>
    <Footer/>
  </div>

  )
}

export default App
