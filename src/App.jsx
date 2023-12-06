import './App.css'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import Layout from "./Layout.jsx";
import IndexPage from "./Pages/IndexPage.jsx";
import axios from "axios";
import {UserContextProvider} from "./UserContext.jsx";
import AccountPage from "./Pages/AccountPage.jsx";
import PlacesPage from "./Pages/PlacesPage.jsx";
import PlacesFormPage from "./Pages/PlacesFormPage.jsx";

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;


function App() {
  return (
       <UserContextProvider>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<IndexPage />}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/register" element={<RegisterPage />}></Route>
                  <Route path="/account" element={<AccountPage />}></Route>
                  <Route path="/account/places" element={<PlacesPage />}></Route>
                  <Route path="/account/places/new" element={<PlacesFormPage />}></Route>
                  <Route path="/account/places/:id" element={<PlacesFormPage />}></Route>


              </Route>
          </Routes>
      </UserContextProvider>

  )
}

export default App
