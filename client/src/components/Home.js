import React from 'react'
import logo from '../logo.svg'
import '../App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams,
} from 'react-router-dom'
import Books from './Books'
import Cars from './Cars'

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/cars">Cars</Link>
        <Link to="/books">Books</Link>
      </header>
      <main style={{ background: 'green' }}>
        <Switch>
          <Route path="/books" component={Books} />

          <Route path="/cars" component={Cars} />
        </Switch>
      </main>
    </div>
  )
}

export default Home
