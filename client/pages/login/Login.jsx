import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCurrentMode } from "../../hooks/currentMode";
import { LoginStyled } from "../../styles";

const Login = () => {
  const { currentMode } = useCurrentMode();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  return (
    <LoginStyled isDarkMode={currentMode}>
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
