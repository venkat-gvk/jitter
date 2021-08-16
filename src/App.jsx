import Login from "./components/forms/login/Login";
import Signup from "./components/forms/signup/Signup";
import ResetPassword from "./components/forms/update/ResetPassword";
import Sailed from "./Sailed";
import YouShallNotPass from "./YouShallNotPass";

import Home from "./Home";
import Chat from "./components/chat/Chat";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./components/store/UserContext";

import bg from "./bg.jpg";

function App() {
  return (
    <>
      <img src={bg} className="absolute z-[-23] h-screen w-full" alt="bg" />
      <Router>
        <UserContext>
          <Switch>
            <Route exact path="/" component={Home} />
            
            <Route exact path="/home" component={Home} />

            <Route exact path="/login" component={Login} />

            <Route path="/chatroom" component={Chat} />

            <Route path="/signup" component={Signup} />

            <Route path="/reset-user" component={ResetPassword} />

            <Route path="/you-shall-not-pass" component={YouShallNotPass} />

            <Route component={Sailed} />
          </Switch>
        </UserContext>
      </Router>
    </>
  );
}

export default App;
