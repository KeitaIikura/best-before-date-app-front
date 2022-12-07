import { AxiosResponse } from "axios"

import {
  PasswordChangeRequestType,
  PasswordResetRequestType,
  UserLoginResponseType,
  UserRequestType,
} from "../models/useAuth/type"
import { api } from "./axiosConfig"

// ログイン情報の有効の有無を確認する関数
export const postAuthCheckApi = () => {
  return api
    .post<UserLoginResponseType>("auth/check")
    .then((res: AxiosResponse) => {
      return res
    })
    .catch((error) => {
      return error.response
    })
}

// ログインするための関数
export const postAuthLoginApi = (data: UserRequestType) => {
  return api
    .post<UserLoginResponseType>("auth/login", data)
    .then((res: AxiosResponse) => {
      return res
    })
    .catch((error) => {
      return error.response
    })
}

// ログアウトするための関数
export const postAuthLogoutApi = () => {
  return api
    .post("auth/logout")
    .then((res: AxiosResponse) => {
      return res
    })
    .catch((error) => {
      return error.response
    })
}

// パスワードを変更するための関数
export const postPasswordChangeApi = (data: PasswordChangeRequestType) => {
  return api
    .post("auth", data)
    .then((res: AxiosResponse) => {
      return res
    })
    .catch((error) => {
      return error.response
    })
}

// パスワードをリセットするための関数
export const postPasswordResetApi = (data: PasswordResetRequestType) => {
  return api
    .post("auth/reset", data)
    .then((res: AxiosResponse) => {
      return res
    })
    .catch((error) => {
      return error.response
    })
}
