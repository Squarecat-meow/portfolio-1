import React, { useEffect, useState } from "react";

import { ref, getMetadata, deleteObject } from "firebase/storage";
import { ref as dbref, remove } from "firebase/database";
import { storage, database } from "../../../config/firebase";

import "./TrackChild.css";
import AudioPlayer from "./AudioPlayer/AudioPlayer";

import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";

import { useSelector } from "react-redux";

import makeArray from "../../../functions/makeArray";

const TrackChild = ({ audioFile, coverFile, storageLocation, trackKey }) => {
  const [metadataState, setMetadataState] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileRef = ref(storage, `${storageLocation}`);
  const storageName = useSelector((state) => state.datalist);
  const storageValue = makeArray(storageName);

  useEffect(() => {
    getMetadata(fileRef).then((metadata) => {
      setMetadataState(metadata.customMetadata);
    });
  }, []);

  const onClick = () => {
    setIsModalOpen(true);
  };

  const handleItemRemove = async () => {
    remove(dbref(database, `${storageValue[trackKey]}`));
    setTimeout(() => {
      deleteObject(ref(storage, `${storageValue[trackKey]}/`));
    }, 500);
  };

  const handleOK = () => {
    handleItemRemove();
    window.location.reload(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: "1",
      danger: true,
      label: <span>Delete</span>,
    },
  ];

  return (
    <div className="track-container">
      <div className="cover-div">
        <img
          style={{ width: "150px", height: "150px" }}
          src={coverFile}
          alt="Cover File"
        />
      </div>
      <div className="track-data-container">
        <div className="track-text-container">
          <h1>{metadataState.Title}</h1>
          <span className="genre">{metadataState.Genre}</span>
          <Dropdown menu={{ items, onClick }}>
            <MoreOutlined />
          </Dropdown>
        </div>
        <AudioPlayer audioUrl={audioFile} />
      </div>
      <Modal
        title="Delete Track"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        width={300}
      >
        <p>Are you sure to delete this track?</p>
      </Modal>
    </div>
  );
};

export default TrackChild;
