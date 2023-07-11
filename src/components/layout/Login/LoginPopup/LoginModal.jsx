import React, { useState } from "react";

import { Button } from "antd";
import { FaGoogle, FaGithub } from "react-icons/fa";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../../config/firebase";

import { upLogin } from "../../../../modules/UserLoginSlice";

import "./LoginModal.css";
import { useDispatch } from "react-redux";

const LoginModal = () => {
  const [loginInfo, setLoginInfo] = useState([]);
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      setLoginInfo([
        {
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          accessToken: result.user.accessToken,
        },
      ]);
    });
    console.log(loginInfo);
  };

  return (
    <div className="login-container">
      <Button
        type="primary"
        icon={<FaGoogle />}
        size="large"
        onClick={handleGoogleLogin}
      >
        Log In With Google
      </Button>
      <Button type="primary" icon={<FaGithub />} size="large">
        Log In With Github
      </Button>
    </div>
  );
};

export default LoginModal;
