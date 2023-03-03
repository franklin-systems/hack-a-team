import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  } from "react-router-dom";

import Home from "pages/home"
import Layout from "pages/layout"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
