import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

const AuthRedirect: React.FC = () => {
  const router = useRouter();
  const postLogin = async () => {
    axios.post('/api/auth/login', {
      code: router.query.code,
    });
  };
  React.useEffect(() => {
    if (!router.query.code) return;
    postLogin();
  }, [router.query]);
  return (
    <div>auth-redirect</div>
  );
};

//discord.com/oauth2/authorize?response_type=code&redirect_uri=http://localhost:2121/auth-redirect&scope=identify%20guilds&client_id=1065792338783383552

export default AuthRedirect;
