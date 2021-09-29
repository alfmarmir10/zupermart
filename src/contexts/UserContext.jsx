import React, { useState } from 'react'

const initialState = {
  Name: "Prueba",
  Email: "alfmarmirhb@gmail.com"
}
const UserContext = React.createContext(initialState);

const UserContextProvider = ({children}) => {
  const [User, setUser] = useState(initialState);

  const val = {User, setUser};

  return (
    <UserContext.Provider value={val}>{children}</UserContext.Provider>
  )
}

export {UserContext};
export default UserContextProvider
