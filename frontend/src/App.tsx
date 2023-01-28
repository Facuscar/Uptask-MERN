import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PATH } from "./constants/path"
import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectProvider";
import ConfirmAccount from "./pages/ConfirmAccount";
import EditProject from "./pages/EditProject";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import NewProject from "./pages/NewProject";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <ProjectsProvider>
            <Routes>
              <Route path="/" element={ <AuthLayout /> }>
                <Route index element={ <Login /> } />
                <Route path={PATH.REGISTER} element={ <Register /> } />
                <Route path={PATH.FORGOT_PASSWORD} element={ <ForgotPassword /> } />
                <Route path={`${PATH.FORGOT_PASSWORD}/:token`} element={ <NewPassword /> } />
                <Route path={`${PATH.CONFIRM_ACCOUNT}/:token`} element={ <ConfirmAccount /> } />
              </Route>
              <Route path={PATH.PROJECTS} element={<ProtectedRoute />}>
                <Route index element={<Projects />} />
                <Route path={PATH.CREATE_PROJECT} element={<NewProject />} />
                <Route path={":id"} element={<Project />} />
                <Route path={`${PATH.EDIT_PROJECT}/:id`} element={<EditProject />} />
              </Route>
            </Routes>
          </ProjectsProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
