import React from "react"
import { BrowserRouter, Routes } from "react-router-dom"

import { LoadingCheckProvider } from "../providers/LoadingCheckProvider"
import { LoginUserProvider } from "../providers/LoginUserProvider"

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <LoadingCheckProvider>
        <LoginUserProvider>
          <Routes></Routes>
        </LoginUserProvider>
      </LoadingCheckProvider>
    </BrowserRouter>
  )
}
