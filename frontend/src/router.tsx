import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  } from "react-router-dom";

import Home from "pages/home"
import SignUp from "pages/sign-up"
import Layout from "pages/layout"
import Team from "pages/team"
import {AuthProvider, RequireAuth} from "utils/auth";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/team"
              element={
                <RequireAuth>
                  <Team />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
