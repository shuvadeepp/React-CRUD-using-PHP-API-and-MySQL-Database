import React, { Suspense } from "react";
import {BrowserRouter as Router, Route, Routes, withRouter} from 'react-router-dom';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

/* import Header from './Header';
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import ListStudent from './components/ListStudent';
import EditStudent from './components/EditStudent';
import EditStudentFile from './components/EditStudentFile';
import Footer from './components/Footer';
import Parent from './components/mini/Parent';
import AddStudentFile from './components/AddStudentFile';
import ParentModal from './components/reactModal/ParentModal';
import ListStudentPaginate from './components/ListStudentPaginate';
import Paginate from './components/Paginate';
import Studentadd from './components/addMore/Studentadd'; */

const Header                = React.lazy(() => import('./Header'));
const Home                  = React.lazy(() => import('./components/Home'));
const AddStudent            = React.lazy(() => import('./components/AddStudent'));
const ListStudent           = React.lazy(() => import('./components/ListStudent'));
const EditStudent           = React.lazy(() => import('./components/EditStudent'));
const EditStudentFile       = React.lazy(() => import('./components/EditStudentFile'));
const Footer                = React.lazy(() => import('./components/Footer'));
const Parent                = React.lazy(() => import('./components/mini/Parent'));
const AddStudentFile        = React.lazy(() => import('./components/AddStudentFile'));
const ParentModal           = React.lazy(() => import('./components/reactModal/ParentModal'));
const ListStudentPaginate   = React.lazy(() => import('./components/ListStudentPaginate'));
const Paginate              = React.lazy(() => import('./components/Paginate'));
const Studentadd            = React.lazy(() => import('./components/addMore/Studentadd'));
/* 
******************************************** React PHP CRUD APP ************************************************
____________________________________________
  Item Install:
    npm install react-router-dom 
    npm install axios
    npm install bootstrap
    npm install react-paginate --save
    npm i -S reactstrap
    npm install --save @fortawesome/react-fontawesome
    npm install react-bootstrap-date-picker
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
        <Suspense fallback={<p>loading...</p>}>
        <Router>
          <Header />
            <div>
                <Routes>
                  <Route path="/" element={ <Home /> } />
                  <Route path="/list-student" element={ <ListStudent /> } />
                  <Route path="/add-student" element={ <AddStudent /> } />
                  <Route path="/edit-student/:id" element={ <EditStudent /> } />
                  <Route path="/edit-student-file/:id" element={ <EditStudentFile /> } />
                  <Route path="/parent" element={ <Parent /> } />
                  <Route path="/add-student-file" element={ <AddStudentFile /> } />
                  <Route path="/modals" element={ <ParentModal /> } />
                  <Route path="/ListStudentPaginate" element={ <ListStudentPaginate /> } />
                  <Route path="/paginate" element={ <Paginate /> } />
                  <Route path="/AddMore" element={ <Studentadd /> } />
                </Routes>
            </div>
          </Router>
          </Suspense>
        <Footer />
      </main>
  );
}
export default App;
