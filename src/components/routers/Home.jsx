import React, { useEffect, useState } from "react";

import Tracks from "./Tracks";

import { database } from "../../config/firebase";
import { get, ref } from "firebase/database";
import { Empty, notification } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { upDatalist } from "../../modules/DatalistSlice";

const Home = () => {
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  //const [dataList, setDataList] = useState({});
  const uploadSuccess = useSelector(
    (state) => state.uploadSuccess.isUploadSuccess
  );
  const dataList = useSelector((state) => state.datalist);
  const dispatch = useDispatch();

  useEffect(() => {
    const dbRef = ref(database, "audio");
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        dispatch(upDatalist(snapshot.val()));
        setIsDataEmpty(false);
      } else {
        console.log("No Data");
      }
    });
  });

  useEffect(() => {
    openNotification();
  });

  const openNotification = () => {
    if (uploadSuccess === true) {
      notification.success({
        message: "Upload Successful",
        placement: "topLeft",
        duration: "3",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "white", height: "92vh" }}>
      <div>{isDataEmpty ? <Empty /> : <Tracks dbList={dataList} />}</div>
    </div>
  );
};

export default Home;
