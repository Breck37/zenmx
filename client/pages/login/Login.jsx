import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useCurrentMode } from "../../hooks/currentMode";
import { LoginStyled } from "../../styles";
import ModernMotoLogo from "../../svgs/ModernMotoFlat.svg";
import anime from "animejs";

const Login = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  const { user, isLoading } = useUser();

  if (!isLoading && user) {
    router.push("/home");
  }

  useEffect(() => {
    const svgPath = document.querySelectorAll(".ModernMotoFlat_svg__path");

    if (svgPath) {
      const svgText = anime({
        targets: svgPath,
        loop: true,
        direction: "alternate",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 2000,
        delay: (el, i) => {
          return i * 100;
        },
      });
      svgText.play();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { elements } = event.target;

    // Add the Magic code here
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email: elements.email.value });

    // Once we have the token from magic,
    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });

    // update our own database

    // const authRequest = await fetch()

    // if (authRequest.ok) {
    // We successfully logged in, our API
    // set authorization cookies and now we
    // can redirect to the dashboard!
    // router.push('/dashboard')
    // } else { /* handle errors */ }
  };

  return (
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
      Login
    </LoginStyled>
  );
};

export default Login;
