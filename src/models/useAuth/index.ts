import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"

import {
  postAuthLoginApi,
  postAuthLogoutApi,
  postPasswordChangeApi,
  postPasswordResetApi,
} from "../../api/apiAuth"
import {
  LoadingCheckContext,
  LoadingCheckContextType,
} from "../../providers/LoadingCheckProvider"
import {
  LoginUserContext,
  LoginUserContextType,
} from "../../providers/LoginUserProvider"
import { PasswordChangeRequestType, PasswordResetRequestType } from "./type"

export const useAuth = () => {
  const navigate = useNavigate()
  const { setLoginUser } = useLoginUser()
  const { setLoading } = useLoadingCheck()

  const login = useCallback(async (email_address: string, password: string) => {
    const data = {
      email_address: `${email_address}`,
      password: `${password}`,
    }
    setLoading(true)
    const res = await postAuthLoginApi(data)
    if (res.status !== 200) {
      setLoading(false)
      return alert("ログインに失敗しました")
    }
    setLoading(false)
    setLoginUser(res.data)
    navigate("/stress-checks")
  }, [])

  const logout = useCallback(async () => {
    // setLoading(true);
    const res = await postAuthLogoutApi()
    if (res.status !== 200) {
      return alert("ログアウトに失敗しました")
    }

    navigate("/")
    setLoginUser(null)
    alert("ログアウトしました")
  }, [])

  const updatePassword = useCallback(
    async (data: PasswordChangeRequestType) => {
      setLoading(true)
      const res = await postPasswordChangeApi(data)

      if (res.status !== 200) {
        setLoading(false)
        return alert("パスワード変更に失敗しました")
      }
      setLoading(false)
      navigate("/employees")
      alert("パスワード変更に成功しました")
    },
    []
  )

  const postPasswordReset = useCallback(
    async (data: PasswordResetRequestType) => {
      setLoading(true)
      const res = await postPasswordResetApi(data)
      if (res.status !== 200) {
        return alert("パスワードリセットに失敗しました")
      }
      alert(
        "パスワードリセットに成功しました。送信されたメールをご確認ください。"
      )
      navigate("/")
    },
    []
  )

  return { login, logout, updatePassword, postPasswordReset }
}

export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext)

export const useLoadingCheck = (): LoadingCheckContextType =>
  useContext(LoadingCheckContext)
