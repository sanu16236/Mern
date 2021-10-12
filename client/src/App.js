import React, { createContext,useReducer} from 'react'
import { Route,Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
import './App.css';
import { initialState,reducer } from './reducer/UseReducer';
  
  
export const userContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/contact" exact>
        <Contact />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Route path="/logout" exact>
        <Logout />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  )
}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <>
      <userContext.Provider value={{state,dispatch}}>
        <Navbar />
        <Routing/>
      
      </userContext.Provider>
    </>
  )
}

export default App

