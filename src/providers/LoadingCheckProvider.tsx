import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"

export type LoadingCheckContextType = {
  setLoading: Dispatch<SetStateAction<true | false>>
  loading: true | false
}

export const LoadingCheckContext = createContext<LoadingCheckContextType>(
  {} as LoadingCheckContextType
)

type Props = {
  children: ReactNode
}

export const LoadingCheckProvider: React.FC<Props> = (props) => {
  const { children } = props
  const [loading, setLoading] = useState(false)

  const values = {
    setLoading,
    loading,
  }

  return (
    <LoadingCheckContext.Provider value={values}>
      {children}
    </LoadingCheckContext.Provider>
  )
}
