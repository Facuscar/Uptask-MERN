import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PATH } from "./constants/path"
import { AuthProvider } from "./context/AuthProvider";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <AuthLayout /> }>
            <Route index element={ <Login /> } />
            <Route path={PATH.REGISTER} element={ <Register /> } />
            <Route path={PATH.FORGOT_PASSWORD} element={ <ForgotPassword /> } />
            <Route path={`${PATH.FORGOT_PASSWORD}/:token`} element={ <NewPassword /> } />
            <Route path={`${PATH.CONFIRM_ACCOUNT}/:token`} element={ <ConfirmAccount /> } />
          </Route>
          <Route path="/projects" element={<ProtectedRoute />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
