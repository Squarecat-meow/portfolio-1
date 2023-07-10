import React, { useRef, useState } from "react";

import { Button, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
  ref,
  updateMetadata,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage, database } from "../../config/firebase";
import { set, ref as dbRef } from "firebase/database";

import "./UploadForm.css";

import { useDispatch, useSelector } from "react-redux";

import { upState, upCoverURL, upReset } from "../../modules/UploadSlice";
import { upSuccess } from "../../modules/UploadSuccessSlice";
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const fileLocation = useSelector((state) => state.upload.fileURL);
  const folderName = useSelector((state) => state.upload.folderName);
  const storageLocation = useSelector((state) => state.upload.storageLocation);
  const audioFileRef = ref(storage, fileLocation);

  const [coverFile, setCoverFile] = useState("");
  const [coverLoading, setCoverLoading] = useState("");
  const coverRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCoverUpload = () => {
    const file = coverRef.current.files[0];
    const coverStorageRef = ref(storage, `${folderName}/${file.name}`);
    const uploadTask = uploadBytesResumable(coverStorageRef, file);

    uploadTask.on("state_changed", () => {
      setCoverLoading(true);
    });

    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCoverFile(url);
        dispatch(upCoverURL(url));
      });
      setCoverLoading(false);
    });
  };

  const coverLocation = useSelector((state) => state.upload.coverURL);

  const onFinish = (values) => {
    const writeMetadata = {
      customMetadata: {
        Title: values.title,
        Genre: values.genre,
        AdditionalTag: values.AdditiionalTag,
        Description: values.Description,
      },
    };

    updateMetadata(audioFileRef, writeMetadata).then((metadata) => {
      console.log("Wrote Metadata:", metadata.customMetadata);
    });

    const folderRef = dbRef(database, folderName);

    set(folderRef, {
      fileLocation: { fileLocation },
      coverLocation: { coverLocation },
      storageLocation: { storageLocation },
    });

    dispatch(upState(false));
    dispatch(upReset());

    setTimeout(() => {
      dispatch(upSuccess(false));
    }, 1000);

    navigate("/", { replace: true });
  };

  return (
    <div className="form-container">
      <Form
        onFinish={onFinish}
        onFinishFailed={(errorinfo) => {
          console.log("Failed:", errorinfo);
        }}
      >
        <div>
          <div className="cover-divbox">
            {coverLoading && <LoadingOutlined style={{ fontSize: "48px" }} />}
            {coverFile && (
              <img className="cover-preview" src={coverFile} alt="Cover File" />
            )}
          </div>
          <Button
            onClick={() => coverRef.current.click()}
            style={{ marginBottom: "10px" }}
          >
            Upload Cover Image
          </Button>
          <input
            type="file"
            ref={coverRef}
            style={{ display: "none" }}
            accept="image/jpeg, image/png"
            onChange={handleCoverUpload}
          />
        </div>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Title can't be Empty.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="genre"
          label="Genre"
          rules={[
            {
              required: true,
              message: "Genre can't be Empty.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="Additional Tags">
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadForm;
