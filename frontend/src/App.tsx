import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import { PATH } from "./constants/path"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AuthLayout /> }>
          <Route index element={ <Login /> } />
          <Route path={PATH.REGISTER} element={ <Register /> } />
          <Route path={PATH.FORGOT_PASSWORD} element={ <ForgotPassword /> } />
          <Route path={`${PATH.FORGOT_PASSWORD}/:token`} element={ <NewPassword /> } />
          <Route path={`${PATH.CONFIRM_ACCOUNT}/:token`} element={ <ConfirmAccount /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
