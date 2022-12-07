import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useLoginUser } from "../models/useAuth/index"
import { setUpAxiosInterceptor } from "./axiosConfig"

export const AxiosInterceptors: React.FC = () => {
  const navigate = useNavigate()
  const { setLoginUser } = useLoginUser()

  useEffect(() => {
    setUpAxiosInterceptor(navigate, setLoginUser)
  }, [navigate])

  // not rendering anything
  return null
}
