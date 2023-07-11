import React, { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import LoginModal from "./LoginPopup/LoginModal";

const WhenNotLoggedin = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <div>
        <FaUserCircle onClick={() => setModal(true)} />
        {modal && <LoginModal />}
      </div>
    </div>
  );
};

export default WhenNotLoggedin;
