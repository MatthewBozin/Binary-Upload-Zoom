import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

const AuthRedirect: React.FC = () => {
  const router = useRouter();

  const postLogin = async () => {
    await axios.post('/api/auth/login', {
      code: router.query.code,
    });

    router.push('protected');
  };

  React.useEffect(() => {
    if (!router.query.code) return;
    postLogin();
  }, [router.query]);

  return (
    <div>auth-redirect</div>
  );
};

export default AuthRedirect;
