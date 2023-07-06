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
import {
  formTitle,
  formGenre,
  formTag,
  formDesc,
} from "../../modules/UploadFormSlice";

import { upState, upCover, upReset } from "../../modules/UploadSlice";

const UploadForm = () => {
  const fileLocation = useSelector((state) => state.upload.fileLocation);
  const folderName = useSelector((state) => state.upload.folderName);
  const audioFileRef = ref(storage, fileLocation);
  const [coverFile, setCoverFile] = useState("");
  const [coverLoading, setCoverLoading] = useState("");
  const coverRef = useRef();

  const dispatch = useDispatch();

  const writeFormTitle = useSelector((state) => state.form.title);
  const writeFormGenre = useSelector((state) => state.form.genre);
  const writeFormTag = useSelector((state) => state.form.additionalTag);
  const writeFormDesc = useSelector((state) => state.form.description);

  const writeMetadata = {
    customMetadata: {
      Title: writeFormTitle,
      Genre: writeFormGenre,
      AdditionalTag: writeFormTag,
      Description: writeFormDesc,
    },
  };

  const handleCoverUpload = () => {
    const file = coverRef.current.files[0];
    const coverStorageRef = ref(storage, `${folderName}/${file.name}`);
    const uploadTask = uploadBytesResumable(coverStorageRef, file);
    dispatch(upCover(`${folderName}/${file.name}`)); //DB에 커버 경로 올리는 dispatch

    uploadTask.on("state_changed", () => {
      setCoverLoading(true);
    });

    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCoverFile(url);
      });
      setCoverLoading(false);
    });
  };

  const coverLocation = useSelector((state) => state.upload.coverLocation);

  const onFinish = (values) => {
    dispatch(formTitle(values.title));
    dispatch(formGenre(values.genre));
    dispatch(formTag(values.tags));
    dispatch(formDesc(values.desc));

    updateMetadata(audioFileRef, writeMetadata);

    const folderRef = dbRef(database, folderName);

    set(folderRef, {
      fileLocation: { fileLocation },
      coverLocation: { coverLocation },
    });

    dispatch(upState(false));
    dispatch(upReset());
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
