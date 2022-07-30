import {BrowserRouter as Router, Route, Routes, withRouter} from 'react-router-dom';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Header from './Header';
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import ListStudent from './components/ListStudent';
import EditStudent from './components/EditStudent';
import Footer from './components/Footer';
import Parent from './components/mini/Parent';


/* 
******************************************** React PHP CRUD APP ************************************************
____________________________________________
  Item Install:
  npm install react-router-dom 
  npm install axios
  npm install bootstrap
____________________________________________
____________________________________________
  API's:
  POST  - http://localhost:8181/test/php_react_crud/api/save
  GET   - http://localhost:8181/test/php_react_crud/api/all-users.php
  PUT  - http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/update-users.php
____________________________________________
*/

function App(props) {
  return (
    
      <main className="container">
        <Router>
          <Header />
            <div>
              <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/list-student" element={ <ListStudent /> } />
                <Route path="/add-student" element={ <AddStudent /> } />
                <Route path="/edit-student/:id" element={ <EditStudent /> } />
                <Route path="/parent" element={ <Parent /> } />
              </Routes>
            </div>
        </Router>
        <Footer />
      </main>
  );
}
export default App;
