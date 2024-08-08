// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Axios from 'axios';

// import {
//   setToken,
//   deleteToken,
//   getToken,
//   initAxiosInterceptors
// } from './Helpers/auth-helpers';

// import Nav from './Components/Nav';
// import Loading from './Components/Loading';
// import Signup from './Views/Signup';
// import Login from './Views/Login';
// import Feed from './Views/Feed';
// import Matchs from './Views/Matchs';



// initAxiosInterceptors();

// export default function App() { 

//   const [user, setUser] = useState(null);  
//   const [cargandoUsuario, setCargandoUsuario] = useState(true);
 

//   useEffect(() => {
//     async function cargarUsuario() {
//       if (!getToken()) {
//         setCargandoUsuario(false);
//         return;
//       }
//       try {
//         const { data: user } = await Axios.get('/users/whoami');
//         setUser(user);
//         setCargandoUsuario(false);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     cargarUsuario();
//   }, []);


//   async function login(email, password) {
//     const { data } = await Axios.post('/users/login', {
//       email,
//       password
//     });
//     setUser(data.user);
//     setToken(data.token);
//   }


//   async function signup(user) {
//     const { data } = await Axios.post('/users/signup', user);
//     setUser(data.user);
//     setToken(data.token);
//   }


//   function logout() {
//     setUser(null);
//     deleteToken();
//   }
 
 


//   if (cargandoUsuario) {
//     return (
//       <>

//       <Loading />
//       </>
//       // <Main center>
//       //   <Loading />
//       // </Main>
//     );
//   }
//   return (
//     <Router>
//      <div className='app'>

//       <Nav user={user} logout={logout}/>
//        {user ? (
//         <LoginRoutes
//           user={user}
//           logout={logout}
//         />
//       ) : (
//         <LogoutRoutes
//           login={login}
//           signup={signup}
//          />
//       )}
//       </div>
//     </Router>
//   );
// }





// function LoginRoutes({ user, logout }) {
//   return (
//     <Switch>

  
//     <Route
//         path="/matchs"
//         render={props => (
//           <Matchs {...props} user={user} logout={logout} />
//         )}
//         default
//       />

 
//       <Route
//         path="/"
//         render={props => (
//           <Feed {...props} user={user} logout={logout} />
//         )}
//         default
//       />


//     </Switch>
//   );
// }




// function LogoutRoutes({ login, signup }) {
//   return (
//     <Switch>
//       <Route
//         path="/login/"
//         render={props => (
//           <Login {...props} login={login} />
//         )}
//       />
//       <Route
//         render={props => (
//           <Signup {...props} signup={signup} />
//         )}
//         default
//       />
//     </Switch>
//   );
// }



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Axios from 'axios';
import { setToken, deleteToken, getToken, initAxiosInterceptors } from './Helpers/auth-helpers';
import Nav from './Components/Nav';
import Signup from './Views/Signup';
import Login from './Views/Login';
import Feed from './Views/Feed';
import Matches from './Views/Matches';

  
initAxiosInterceptors();

export default function App() {
  const [user, setUser] = useState(null);
 
    

  useEffect(() => {  
    async function loadingUser() {
      if (!getToken()) {
        return false
      }
      try {
        const { data: user } = await Axios.get('http://localhost:3000/users/whoami');
        setUser(user);

      } catch (error) {
        console.log(error);
      }
    }
    loadingUser();
  }, []);

  async function login(email, password) {
    const { data } = await Axios.post('http://localhost:3000/users/login', {
      email,
      password
    });
    setUser(data.user);
    setToken(data.token);

  }

  async function signup(user) {
    const { data } = await Axios.post('http://localhost:3000/users/signup', user);
    setUser(data.user);
    setToken(data.token);
  }
  
  function logout() {
    setUser(null);
    deleteToken();
  }

 

  

  return (
    <Router>
      <Nav user={user} logout={logout} />
       {user ? 
       <LoggedInRoutes user={user} logout={logout} navigate={Navigate}/> 
       : <LoggedOutRoutes login={login} signup={signup} />}
    </Router>
  );
}

function LoggedInRoutes({ user, logout }) {
  return (
    <Routes>
      <Route path="/" element={<Feed user={user} logout={logout} />} default/>
      <Route path="/matches" element={<Matches user={user} logout={logout} />} />
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

function LoggedOutRoutes({ login, signup }) {
  return (
    <Routes>
      <Route path="/login" element={<Login login={login} />} />
      <Route path="/signup" element={<Signup signup={signup} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}


