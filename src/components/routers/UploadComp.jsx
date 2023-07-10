//React imports
import React, { useRef, useState } from "react";

//icon, Components imports
import { Progress, Button } from "antd";

//firebase imports
import { storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

//css imports
import "./UploadComp.css";
import { FaUpload } from "react-icons/fa";

//components imports
import UploadForm from "./UploadForm";

//framer motion imports
import { motion } from "framer-motion";

//redux imports
import {
  upFileURL,
  upStorage,
  upState,
  upFolder,
} from "../../modules/UploadSlice";
import { useDispatch, useSelector } from "react-redux";

//etc imports
import { v1 as uuidv1 } from "uuid";

const UploadComp = () => {
  //const [uploading, setUploading] = useState(false);
  const [upPercent, setUpPercent] = useState(0);
  const [showFileName, setShowFileName] = useState("");
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.upload.isUploading);

  const handleUpload = (e) => {
    const file = e.target.files;
    const fileName = file[0].name;
    setShowFileName(fileName);

    const folderName = uuidv1();
    const uploadFileLocation = `${folderName}/${fileName}`;
    dispatch(upFolder(folderName));
    dispatch(upStorage(uploadFileLocation));

    const storageRef = ref(storage, uploadFileLocation);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on("state_changed", (snapshot) => {
      dispatch(upState(true));
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setUpPercent(progress);
    });

    uploadTask.then(() => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        dispatch(upFileURL(url));
      });
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
        <span
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            display: uploading ? "block" : "none",
          }}
        >
          {showFileName}
        </span>
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
