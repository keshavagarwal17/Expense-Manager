import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Expenses from './Pages/Expenses/Expenses';
import AddExpense from './Pages/AddExpense/AddExpense';
import EditExpense from './Pages/EditExpense/EditExpense';
import Report from './Pages/Report/Report';
import Login from './Pages/Login/Login';
import AdminLogin from './Pages/Admin/Login/Login'
import AdminDashboard from './Pages/Admin/Dashboard/Dashboard'
import AdminExpensePage from './Pages/Admin/Expense/Expense'
import AdminEditExpensePage from './Pages/Admin/EditExpense/EditExpense'
import Register from './Pages/Register/Register';

const App = ()=>{
  return(
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/expenses" component={Expenses} />
            <Route exact path="/add-expense" component={AddExpense} />
            <Route exact path="/edit-expense" component={EditExpense} />
            <Route exact path="/report" component={Report} />
            <Route exact path="/admin/login" component={AdminLogin} />
            <Route exact path="/admin/dashboard" component={AdminDashboard} />
            <Route exact path="/admin/expense" component={AdminExpensePage} />
            <Route exact path="/admin/edit-expense" component={AdminEditExpensePage} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
