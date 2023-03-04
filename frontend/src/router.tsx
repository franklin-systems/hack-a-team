import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  } from "react-router-dom";

import Home from "pages/home"
import SignUp from "pages/sign-up"
import Layout from "pages/layout"
import Active from "pages/active"
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
              path="/active"
              element={
                <RequireAuth>
                  <Active />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
