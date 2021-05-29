import { useUser } from '@auth0/nextjs-auth0';
import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Contact = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }
  });

  if (isLoading) {
    return <CircularProgress />;
  }
  return <div>Contact</div>;
};

export default Contact;
