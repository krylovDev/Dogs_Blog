import React, { useEffect } from 'react';
import {
  Route, Switch, BrowserRouter as Router,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions/auth';
import { State, AuthState } from './types/state';
import './App.scss';
import { ThemeContext, ThemeContextProvider, ThemeContextState } from './context/ThemeContext';
import PostsList from './components/Posts/PostsList/PostsList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import UserList from './components/Users/UserList/UserList';
import UserCard from './components/Users/UserCard/UserCard';
import Home from './components/Home/Home';
import { Login } from './components/Autorization/LogIn/Login';
import Signin from './components/Autorization/SignIn/Signin';
import { getAuthUser } from './utils/getAuthUser';

interface Props {
  auth: AuthState;
  login: (id: string) => any;
}

const App = ({ auth, login }: Props) => {
  useEffect(() => {
    if (!auth.id) {
      const user = getAuthUser();
      user && user.id && login(user.id);
    }
  }, []);

  // @ts-ignore
  return (
    <ThemeContextProvider>
      <ThemeContext.Consumer>
        {
          (context: Partial<ThemeContextState>) => (
            <div className={`app ${context.darkTheme ? 'dark-theme' : ''}`}>
              <Router>
                <Header />
                <main className="main">
                  <Switch>
                    <Route exact path="/posts">
                      <PostsList />
                    </Route>
                    <Route exact path="/user/:id">
                      <UserCard />
                    </Route>
                    <Route exact path="/users">
                      <UserList />
                    </Route>
                    <Route exact path="/login">
                      <Login />
                    </Route>
                    <Route exact path="/signin">
                      <Signin />
                    </Route>
                    <Route exact path="/">
                      <Home />
                    </Route>
                  </Switch>
                </main>
                <Footer />
              </Router>
            </div>
          )
        }
      </ThemeContext.Consumer>
    </ThemeContextProvider>
  );
};

export default connect(
  (state: State) => ({
    auth: state.auth,
    loading: state.auth.loading,
    error: state.auth.error,
  }),
  (dispatch: any) => bindActionCreators(actions, dispatch),
)(App);
