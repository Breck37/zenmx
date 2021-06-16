import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCurrentMode } from '../hooks/currentMode';
import { IndexStyled } from '../styles';
import CircularProgress from '@material-ui/core/CircularProgress';

///// EXAMPLES ////
/// NEED TO LOOK AT https://live.amasupercross.com/xml/sx/RaceData.json WHILE RACE IS HAPPENING

export default function LandingPage({ user, loading: isLoading }) {
  const { currentMode } = useCurrentMode();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }

    if (!isLoading && user) {
      router.push('/home');
    }
  }, [isLoading]);

  return (
    <IndexStyled currentMode={currentMode}>
      <CircularProgress />
    </IndexStyled>
  );
}