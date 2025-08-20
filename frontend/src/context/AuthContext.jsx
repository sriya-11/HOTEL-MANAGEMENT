import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try loading user from localStorage (e.g. on refresh)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store the whole user object
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // useEffect(() => {
//   //   // Try loading user from localStorage (e.g. on refresh)
//   //   const token = localStorage.getItem('token');
//   //   const name = localStorage.getItem('name');
//   //   if (token && name) {
//   //     setUser({ token, name });
//   //   }
//   // }, []);

//   useEffect(() => {
//     // Try loading user from localStorage (e.g. on refresh)
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);


//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem('token', userData.token);
//     localStorage.setItem('name', userData.name);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('name');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// // import React, { createContext, useContext, useState } from 'react';
// // const AuthContext = createContext();
// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);

// //   const login = (userData) => setUser(userData);
// //   const logout = () => setUser(null);

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);