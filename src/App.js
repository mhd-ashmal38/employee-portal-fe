import { Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeCreate from './components/EmployeeCreate';
import Header from './components/Header';
import EmployeeUpdate from './components/EmployeeUpdate';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <div className="App">

      <Header/>
      <Routes>
        <Route path='/' element={<EmployeeList/>} />
        <Route path='/create' element={<EmployeeCreate/>}/>
        <Route path='/update/:id' element={<EmployeeUpdate/>}/>
        <Route path='/view/:id' element={<EmployeeDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
