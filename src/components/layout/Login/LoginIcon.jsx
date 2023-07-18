import React from "react";
import WhenNotLoggedin from "./WhenNotLoggedin";
import { useSelector } from "react-redux";

const LoginIcon = () => {
  const accessToken = useSelector((state) => state.login.accessToken);
  const photoUrl = useSelector((state) => state.login.photoURL);

  return (
    <div>
      {accessToken ? (
        <img
          src={photoUrl}
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ) : (
        <WhenNotLoggedin />
      )}
    </div>
  );
};

export default LoginIcon;
