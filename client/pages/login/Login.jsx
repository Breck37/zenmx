import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useCurrentMode } from "../../hooks/currentMode";
import { LoginStyled } from "../../styles";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const { currentMode } = useCurrentMode();
  const { user } = useUser();
  const router = useRouter();
  let isMounted = false;

  useEffect(() => {
    if (user && isMounted) {
      router.push("/home");
    }
    return () => {
      isMounted = true;
    };
  }, [isMounted]);

  if (!isMounted) {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  if (loading) {
    return <CircularProgress />;
  }

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
