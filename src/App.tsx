import React from 'react';

import Expenses from './components/expense/Expenses';
import { Route, Redirect, Switch } from 'react-router-dom';
import AddExpenseForm from './components/expense/AddExpense';
import Home from './components/Home';
import NotFound from './components/common/NotFound';
import NavBar from './components/NavBar';
import UpdateExpenseForm from './components/expense/UpdateExpense';
import RegisterUser from './components/login/Register';
import Login from './components/login/Login';

// TODO: Display all expenses so far in a table view with an option to delete each expense
// TODO: Display an Add option (+) on the screen on Clicking that pops up new form with all inputs.
// TODO: Perform API calls using redux saga and update expenses sheet as soon as db sends response
const App = () => {
  return (
    <main className='container'>
      <NavBar />
      <div className='content'>
        <Switch>
          <Route path='/expense/:id' component={UpdateExpenseForm} />
          <Route path='/expense' component={Expenses} />
          <Route path='/addExpense' component={AddExpenseForm} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={RegisterUser} />
          <Route path='/' component={Home} />
          {/* <Redirect exact from='/' to='/expense' /> */}
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </main>
  );
};

export default App;
