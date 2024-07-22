import React, {useState, useContext, useEffect} from 'react';

const AuthContext = React.createContext();

export const useAuth =() => {
  return useContext(AuthContext);
};

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = async (body) => {
    const response = await fetch('/v0/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      if (response.status === 400) return 'badEmail';
      const json = await response.json();
      if (json.error === 'email taken') {
        return 'emailTaken';
      } else {
        return 'phoneNumberTaken';
      }
    }
    const json = await response.json();
    setCurrentUser(json);
    return true;
  };

  const login = async (emailOrPhone, password) => {
    // body must contain a password field
    // but could have either a email, or phoneNumber field

    // could have better email/phone validation,
    // backend validates proper email strings, but not phone numbers
    let body;
    if (emailOrPhone.includes('@')) {
      body = {email: emailOrPhone, password};
    } else {
      body = {phoneNumber: emailOrPhone, password};
    }

    const response = await fetch('/v0/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return false;
    }

    const json = await response.json();
    setCurrentUser(json);
    return true;
  };

  const logout = () => {
    fetch('/v0/auth/logout', {
      method: 'POST',
    })
      .then((response) => {
        // set current user to undefined
        setCurrentUser();
      });
  };


  useEffect(() => {
    // This here to check the user has a valid session cookie
    // when they load the web app.
    // This way they can login, close and reopen the page,
    // and still be logged in.
    fetch('/v0/auth/session')
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setCurrentUser(json);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
