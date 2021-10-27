
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Seminar from './pages/Seminar';
import Apply from './pages/Apply';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

function App() {
  return (
    <div>

      <Router>
        <Header />

        <Switch>
          <PrivateRoute exact path="/dashboard" component={PrivateScreen} />
          <Route exact path='/' component={Home} />
          <Route exact path='/apply' component={Apply} />
          <Route exact path='/seminar' component={Seminar} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/forgotpassword' component={ForgotPasswordScreen} />
          <Route exact path='/passwordreset/:resetToken' component={ResetPasswordScreen} />
         
        </Switch>

        <Footer />

      </Router>

    </div>
    
  );
}

export default App;
