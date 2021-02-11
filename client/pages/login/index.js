import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCurrentMode } from "../../hooks/darkMode";
import { LoginStyled } from "../../styles/LoginStyled";

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
      <a href="/api/auth/login">Login</a>
    </LoginStyled>
  );
};

export default Login;
