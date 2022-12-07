import axios, { AxiosError, AxiosResponse } from "axios"

import { NavigateFunction } from "react-router-dom"

import { Config } from "../config"
import { UserLoginResponseType } from "../models/useAuth/type"

export const api = axios.create({
  withCredentials: true,
  baseURL: Config.api.endpoint,
  responseType: "json",
})

export const setUpAxiosInterceptor = (
  history: NavigateFunction,
  setLoginUser: React.Dispatch<
    React.SetStateAction<UserLoginResponseType | null>
  >
): void => {
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      if (!error.response) {
        // 通信に失敗した場合など、そもそもレスポンスが返ってこなかった場合
        history("/error/connection_refused", { state: "ConnectionRefused" })
      } else {
        // レスポンスは返ってきたがステータスが200ではない場合
        // 失敗時の処理
        switch (error.response.status) {
          case 400:
            throw error
          case 401:
            // 内部的に保存してるログインユーザーの情報をnullにして、ログイン画面へ遷移
            setLoginUser(null)
            history("/")
            throw error
          case 402:
            throw error
          case 404:
            // ページが見つからなかった場合は404ページに遷移
            history("/error/404", { state: "404" })
            break
          case 422:
            // 422はバリデーションエラー。ユーザー側の入力ミス等によるエラーのため、ページ遷移させない
            throw error
          case 500:
            // 500はサーバー側のエラー。エラーページに遷移させる
            history("/error/500", { state: "500" })
            break
          case 503:
            // 503はIP制限に引っかかった場合のエラー。エラーページに遷移させる
            history("/error/503", { state: "503" })
            break
          default:
            // 指定していないステータスのエラーが起こった場合
            history("/error", { state: undefined })
            break
        }
      }
    }
  )
}
