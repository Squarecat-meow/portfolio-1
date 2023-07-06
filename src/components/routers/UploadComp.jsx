//React imports
import React, { useRef, useState } from "react";

//icon, Components imports
import { Progress, Button } from "antd";

//firebase imports
import { storage } from "../../config/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

//css imports
import "./UploadComp.css";
import { FaUpload } from "react-icons/fa";

//components imports
import UploadForm from "./UploadForm";

//framer motion imports
import { motion } from "framer-motion";

//redux imports
import { upFileLocation, upState, upFolder } from "../../modules/UploadSlice";
import { useDispatch, useSelector } from "react-redux";

//etc imports
import { v4 as uuidv4 } from "uuid";

const UploadComp = () => {
  //const [uploading, setUploading] = useState(false);
  const [upPercent, setUpPercent] = useState(0);
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.upload.isUploading);

  const handleUpload = (e) => {
    const file = e.target.files;
    const fileName = file[0].name;

    const folderName = uuidv4();
    dispatch(upFolder(folderName));

    const uploadFileLocation = `${folderName}/${fileName}`;
    const storageRef = ref(storage, uploadFileLocation);
    dispatch(upFileLocation(uploadFileLocation));
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on("state_changed", (snapshot) => {
      dispatch(upState(true));
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setUpPercent(progress);
    });
  };

  return (
    <div>
      <div className="upload-container">
        <Button
          type="dashed"
          icon={<FaUpload />}
          className="file-uploader"
          onClick={() => buttonRef.current.click()}
          style={{ display: uploading ? "none" : "block" }}
        >
          Click to Upload
        </Button>
        <input
          type="file"
          ref={buttonRef}
          accept="audio/mp3, audio/wav"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <Progress
          percent={upPercent}
          style={{ display: uploading ? "block" : "none" }}
          className="progress-bar"
        />
      </div>
      {uploading && (
        <motion.div
          initial={{ opacity: 0, x: 3 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <UploadForm />
        </motion.div>
      )}
    </div>
  );
};

export default UploadComp;
