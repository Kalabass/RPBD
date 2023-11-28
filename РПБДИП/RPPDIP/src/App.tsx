import EmploeesPage from "./components/Employees/EmploeesPage.tsx";
import Header from "./components/Header/Header.tsx";
import LogPage from "./components/Logs/LogPage.tsx";
import MainPage from "./components/MainPage.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="main" Component={MainPage}/>
        <Route path="logs" Component={LogPage}/>
        <Route path="users" Component={EmploeesPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
