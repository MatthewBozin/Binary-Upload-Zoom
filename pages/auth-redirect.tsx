import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

import CenteredContainer from 'client/components/CenteredContainer';

const Container = styled(CenteredContainer)({
  marginTop: '40px',
});

const AuthRedirect: React.FC = () => {
  const router = useRouter();

  const postLogin = async () => {
    await axios.post('/api/auth/login', {
      code: router.query.code,
    });

    router.push('protected');
  };

  React.useEffect(() => {
    if (!router.query.code) {
      return;
    }

    postLogin();
  }, [router.query]);

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default AuthRedirect;
