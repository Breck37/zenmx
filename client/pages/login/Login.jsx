import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useCurrentMode, useAuth } from '../../hooks';
import { LoginStyled } from '../../styles';
import ModernMotoLogo from '../../svgs/ModernMotoFlat.svg';
import { Modal } from '../../components';
import { Magic } from 'magic-sdk';

const Login = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  // const { user, isLoading } = useUser();
  const { user, loading } = useAuth();
  const [isEmailModalOpen] = useState(false);
  console.log('IN LOGIN', user);
  if (!loading && user) {
    router.push('/home');
  }

  // useEffect(() => {
  //   const svgPath = document.querySelectorAll('.ModernMotoFlat_svg__path');

  //   if (svgPath) {
  //     const svgText = anime({
  //       targets: svgPath,
  //       loop: true,
  //       direction: 'alternate',
  //       strokeDashoffset: [anime.setDashoffset, 0],
  //       easing: 'easeInOutSine',
  //       duration: 2000,
  //       delay: (el, i) => {
  //         return i * 100;
  //       },
  //     });
  //     svgText.play();
  //   }
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { elements } = event.target;

    // Add the Magic code here
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
    ).auth.loginWithMagicLink({ email: elements.email.value });

    // Once we have the token from magic,
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    });

    console.log('auth request', authRequest);
    // update our own database
    if (authRequest.ok) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      // router.push('/dashboard')
      console.log('HIT OKAY');
    } else {
      /* handle errors */
    }
  };

  // const toggleModal = () => {
  //   setIsEmailModalOpen(!isEmailModalOpen);
  // };

  if (loading) {
    <CircularProgress />;
  }

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('authed')) {
            window.location.href = "/home"
          }
        `,
          }}
        />
      </Head>
      <LoginStyled isDarkMode={currentMode}>
        <div className="svg">
          <ModernMotoLogo />
        </div>
        <div className="title">
          <span>Modern</span>
          <span>Moto</span>
        </div>
        <div className="tagline">
          <i>The</i> MX fantasy app
        </div>
        <Modal size="normal" isOpen={isEmailModalOpen}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" />
            <button>Log in</button>
            {/* <Button label='Submit' /> */}
          </form>
        </Modal>
        Log In
        {/* <div className="login-button">
          <Button label="Log In" onClick={toggleModal} />
        </div> */}
      </LoginStyled>
    </>
  );
};

export default Login;
