// import React, { useContext } from 'react'
// import { userContext } from '../../App'
// import { Navigate, useLocation } from 'react-router-dom';



// const PrivateRoute = ({children, data}) => {
//     const location = useLocation();
//     console.log("location value", location);
//     const [loggedInUser] = useContext(userContext)

//   return (
//     loggedInUser.email ? children : <Navigate replace={true} to={"/login"} state={{from: location}} ></Navigate>
//   )
// }

// export default PrivateRoute


                          // Another Way to fix private Route 