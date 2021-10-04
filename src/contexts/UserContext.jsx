import React, { useState } from 'react'

// const initialState = {
//   Email: ""
// }
const UserContext = React.createContext();

const UserContextProvider = ({children}) => {
  const [User, setUser] = useState();

  const val = {User, setUser};

  return (
    <UserContext.Provider value={val}>{children}</UserContext.Provider>
  )
}

export {UserContext};
export default UserContextProvider
