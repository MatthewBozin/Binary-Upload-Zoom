import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Cookies from 'universal-cookie';

import CenteredContainer from 'client/components/CenteredContainer';
import { AUTH_COOKIE_NAME } from 'shared/constants';

const cookies = new Cookies();

const Container = styled(CenteredContainer)({
  marginTop: '40px',
});

const Logout: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    cookies.remove(AUTH_COOKIE_NAME);

    router.push('/');
  }, []);

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Logout;
