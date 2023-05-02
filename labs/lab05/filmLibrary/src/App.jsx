import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Page from './components/Page'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <div id="content">
        <Sidebar/>
        <Page/>
      </div>
    </>
  )
}

export default App
