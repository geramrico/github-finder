import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null

  // useReducer Hook
  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (msg, type) => {
    //Send object with msg and type to the reducer
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    })

    // In 3 seconds, disable the alert message
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000)
  }

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
