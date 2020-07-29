import { useEffect } from 'react';
import * as firebase from 'firebase';
import { useHistory } from 'react-router-dom';

export default function useProtectedRoute() {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        console.error(
          'Access to protected route denied, redirecting to login...'
        );
        history.push('/login');
      }
    });
  }, [history]);
}