import React,{ useState } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import DomainFinder from './DomainFinder'
import Domains from './Domains'

export const DomainContext = React.createContext(null)
export default function Home() {
  const [domainResults, setDomainResults] = useState({})
  const [DomainFromButton, setDomainFromButton] = useState("")
  return (
    <Router>
      <DomainContext.Provider value={{DomainFromButton, setDomainFromButton, domainResults, setDomainResults}}>
        <Switch>
          <Route exact path='/' component={DomainFinder}/>
          <Route exact path='/domains' component={Domains}/>	
        </Switch>
      </DomainContext.Provider>
    </Router>
  )
}
