import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children, apiEndpoint }) => {
  const { user } = useContext(UserContext);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(apiEndpoint, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then(() => setIsAuthorized(true))
        .catch(() => setIsAuthorized(false));
    } else {
      setIsAuthorized(false);
    }
  }, [user, apiEndpoint]);

  if (isAuthorized === null) {
    return <p>Loading...</p>; // Show loading while verifying
  }

  return isAuthorized ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
