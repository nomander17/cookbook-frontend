import { createContext, useContext, useState, useEffect } from 'react';

const AuthUserContext = createContext();

export const useAuthUserContext = () => useContext(AuthUserContext);

export const AuthUserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve authUser from local storage on component mount
    const storedAuthUser = localStorage.getItem('authUser');
    if (storedAuthUser) {
      setAuthUser(JSON.parse(storedAuthUser));
    }
    setIsLoading(false);
  }, []);

  const setAuthUserWithStorage = (user) => {
    setAuthUser(user);
    if (user) {
      // Store authUser in local storage whenever it is updated
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      // Remove authUser from local storage when it is set to null
      localStorage.removeItem('authUser');
    }
  };

  if (isLoading) {
    // Render a loading state or placeholder while authUser is being retrieved
    return <div>Loading...</div>;
  }

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser: setAuthUserWithStorage }}>
      {children}
    </AuthUserContext.Provider>
  );
};
