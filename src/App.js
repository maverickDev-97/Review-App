import { Route } from 'react-router';
import './App.css';
import Header from './Components/Header/Header';
import BrandsPage from './Components/BrandsPage/BrandsPage';
import ModelsPage from './Components/ModelsPage/ModelsPage';
import About from './Components/About/About';
import ModelPage from './Components/ModelPage/ModelPage';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './Components/Auth/Auth';
import { useEffect } from 'react';
import { auth } from './firebase';
import { setUser } from './redux/authReducer';

function App() {

  const user = useSelector(state => state.authReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {

        dispatch(setUser({
          "fullname": user.displayName,
          "email": user.email,
          "id": user.uid
        }))
      } else {
        console.log('Not logged in');
      }
    })
  }, [])



  return (
    (!user) ?
      <Auth />
      :
      <div className="App">
        <div className='App__body'>
          <Header />
          <Route exact path='/' component={() => <BrandsPage />} />
          <Route exact path='/models' component={() => <ModelsPage />} />
          <Route path='/models/:slug' component={() => <ModelPage />} />
          <Route path='/about' component={() => <About />} />
        </div>
      </div>
  );
}

export default App;
