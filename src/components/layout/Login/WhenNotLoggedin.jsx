import React, { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import LoginModal from "./LoginPopup/LoginModal";
import { AnimatePresence, motion } from "framer-motion";

const WhenNotLoggedin = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <div>
        <FaUserCircle onClick={() => setModal(!modal)} />
        <AnimatePresence>
          {modal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
            >
              <LoginModal setModal={setModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WhenNotLoggedin;
