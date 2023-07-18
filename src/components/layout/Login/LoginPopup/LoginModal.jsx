import React, { useState } from "react";

import { Button } from "antd";
import {
  GoogleOutlined,
  GithubOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../../config/firebase";

import { upLogin } from "../../../../modules/UserLoginSlice";

import "./LoginModal.css";
import { useDispatch } from "react-redux";

const LoginModal = ({ setModal }) => {
  const [loginInfo, setLoginInfo] = useState([]);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      dispatch(
        upLogin({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          accessToken: result.user.accessToken,
        })
      );
    });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <CloseOutlined
          style={{
            marginTop: "10px",
            marginRight: "10px",
            alignSelf: "flex-end",
            zIndex: "2",
          }}
          onClick={() => setModal(false)}
        />
        <div className="button-div">
          <Button
            type="primary"
            icon={<GoogleOutlined />}
            size="large"
            onClick={handleGoogleLogin}
          >
            Log In With Google
          </Button>
          <Button type="primary" icon={<GithubOutlined />} size="large">
            Log In With Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
