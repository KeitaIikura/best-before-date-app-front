import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react"

import { postAuthCheckApi } from "../api/apiAuth"
import { useLoadingCheck } from "../models/useAuth/index"
import { UserLoginResponseType } from "../models/useAuth/type"

export interface LoginUserContextType {
  loginUser: UserLoginResponseType | null
  setLoginUser: Dispatch<SetStateAction<UserLoginResponseType | null>>
}

export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
)

type Props = {
  children: ReactNode
}

export const LoginUserProvider: React.FC<Props> = (props) => {
  const { children } = props
  const [loginUser, setLoginUser] = useState<UserLoginResponseType | null>(null)
  const { setLoading } = useLoadingCheck()

  const authCheck = async () => {
    setLoading(true)
    const res = await postAuthCheckApi()
    if (res.status !== 200) {
      setLoading(false)
      return setLoginUser(null)
    }

    setLoading(false)
    return setLoginUser(res.data)
  }
  const values = {
    loginUser,
    setLoginUser,
  }

  useEffect(() => {
    authCheck()
  }, [])

  return (
    <LoginUserContext.Provider value={values}>
      {children}
    </LoginUserContext.Provider>
  )
}
