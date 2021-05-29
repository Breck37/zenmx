import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useCurrentMode, useCurrentUser } from '../../hooks';
import { LoginStyled } from '../../styles';
import ModernMotoLogo from '../../svgs/ModernMotoFlat.svg';
import { Modal, Button } from '../../components';
import { Magic } from 'magic-sdk';

const Login = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  const { currentUser: user, loading } = useCurrentUser();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  if (!loading && user && user.email) {
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

    if (authRequest.ok) {
      router.push('/home')
    } else {
      /* handle errors */
      console.log('User Does not have access!', { authRequest })
    }
  };

  const toggleModal = () => {
    setIsEmailModalOpen(!isEmailModalOpen);
  };

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
            <button>Submit</button>
          </form>
        </Modal>
        <div className="login-button">
          <Button label="Log In" onClick={toggleModal} />
        </div>
      </LoginStyled>
    </>
  );
};

export default Login;
