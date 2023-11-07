import './App.css';
import Main from "./main.js";
import Header from './header.js';
import { Link } from "react-router-dom";
import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {signOut, onAuthStateChanged} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Main />
    </div>
  );
}

export default App;
