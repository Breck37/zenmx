import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Contact = ({ user, loading: isLoading }) => {
  const router = useRouter();

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
