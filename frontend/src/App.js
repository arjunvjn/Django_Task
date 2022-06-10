import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import AddBook from './Pages/AddBook'
import EditBook from './Pages/EditBook'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/home/:val" element={<Home/>} />
      <Route path="/addbook" element={<AddBook/>} />
      <Route path="/editbook/:id" element={<EditBook/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
