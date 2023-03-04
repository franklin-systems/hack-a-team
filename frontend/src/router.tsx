import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  } from "react-router-dom";

import Home from "pages/home"
import SignUp from "pages/sign-up"
import Layout from "pages/layout"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
