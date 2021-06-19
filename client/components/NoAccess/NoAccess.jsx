import React from 'react';
import { useRouter } from 'next/router';
import NoAccessStyled from './NoAccessStyled';
import Button from '../Button/Button';

const NoAccess = ({ data }) => {
  const router = useRouter();

  const productAccessMessage = () => {
    switch(data.message) {
      case 'db': 
        return {
          variant: 'db',
          title: 'Not so fast!',
          lineOne: 'Space here at modern moto is not taken for granted.',
          lineTwo: 'We must figure out how to create room for you!',
          lineThree: 'Please send an email to brent.eckert7@gmail.com for more information.',
        };
      case 'save':
      default: 
        return {
          variant: 'save',
          title: 'Oopsies!',
          lineOne: 'It looks like we had trouble creating your user.',
          lineTwo: 'Please feel free to try again using the button below,',
          lineThree: 'or please send an email to brent.eckert7@gmail.com for support.',
        };
    }
  }

  const handleNavigateToLogin = () => {
      router.push('/login');
  }

  const message = productAccessMessage(data);

  return ( 
    <NoAccessStyled>
      <h1>{message.title}</h1>
      <p>{message.lineOne}</p>
      <p>{message.lineTwo}</p>
      <p>{message.lineThree}</p>
      {!message.variant !== 'db' ? <Button small onClick={handleNavigateToLogin} label="Back to Login" /> : null}
    </NoAccessStyled>
  );
};

export default NoAccess;
