
import './App.css';
import React from 'react';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Familymembers from './Components/Familymembers/Familymembers';
import Afterlogin from './Components/Afterlogin/Afterlogin';
import Communitymembers from './Components/Communitymembers/Communitymembers';
import Inserteducation from './Components/Education/Inserteducation';
import Footer from './Components/Footer/Footer';
import InsertMembers from './Components/Familymembers/InsertMembers';
import Advertisement from './Components/Advertisement/Advertisement';
import FamilyDataFetcher from './Components/Advertisement/ShowAdvertisement';
import Quotes from './Components/Quotes/Quotes';
import Test from './Components/test/test';
import Changepassword from './Components/LoginRegister/Changepassword';
import Usermanage from './Components/admin/Usermanage';
import Ads from './Components/admin/Ads';
import events from './Components/admin/events';

function App() {
  return (
<div>
  <Router>
    <Switch>
    <Route  path="/changepassword" component={Changepassword} /> 
      <Route  path="/loginregister" component={LoginRegister} />  
      <Route  path="/ads" component={Ads} />  
      <Route  path="/Usermanage" component={Usermanage} />  
      <Route  path="/addeducation" component={Inserteducation} /> 
      <Route  path="/navbar" component={Navbar} />  
      <Route  path="/home" component={Home} />  
      <Route  path="/profile" component={Profile} />  
      <Route  path="/familymembers" component={Familymembers} /> 
      <Route  path="/afterlogin" component={Afterlogin} /> 
      <Route  path="/communitymembers" component={Communitymembers} /> 
      {/* <Route  path="/inserteducation" component={Inserteducation} />  */}
      <Route  path="/footer" component={Footer} /> 
      <Route  path="/insertmembers" component={InsertMembers} />
      <Route  path="/advertisement" component={Advertisement} />
      <Route  path="/showads" component={FamilyDataFetcher} />
      <Route  path="/quotes" component={Quotes} />
      <Route  path="/test" component={Test} />
      <Route  path="/events" component={events} />
    </Switch>
  </Router>
</div>
  );
}

export default App;
