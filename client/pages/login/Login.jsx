import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useCurrentMode } from "../../hooks/currentMode";
import { LoginStyled } from "../../styles";
import ModernMotoLogo from "../../svgs/ModernMotoFlat.svg";
import anime from "animejs";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const { currentMode } = useCurrentMode();
  const { user, isLoading } = useUser();
  const router = useRouter();

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
      <a className="login-button" href="/api/auth/login">
        Login
      </a>
    </LoginStyled>
  );
};

export default Login;
