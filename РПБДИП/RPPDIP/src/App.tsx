import AuthPage from "./components/Auth/AuthPage.tsx";
import EmploeesPage from "./components/Employees/EmploeesPage.tsx";
import LogPage from "./components/Logs/LogPage.tsx";
import MainPage from "./components/MainPage.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IncidentsPage from "./components/incidents/IncidentsPage.tsx";
import AccessRequestsPage from "./components/AccessRequests/AccessRequestsPage.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" Component={AuthPage}></Route>
        <Route path="main" Component={MainPage}/>
        <Route path="logs" Component={LogPage}/>
        <Route path="users" Component={EmploeesPage}/>
        <Route path="incidents" Component={IncidentsPage}/>
        <Route path="requests" Component={AccessRequestsPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
