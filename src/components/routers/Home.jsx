import React, { useEffect, useState } from "react";

import Tracks from "./Tracks";

import { database } from "../../config/firebase";
import { get, ref } from "firebase/database";
import { Empty, notification } from "antd";
import { useSelector } from "react-redux";

const Home = () => {
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const [dataList, setDataList] = useState({});
  const uploadSuccess = useSelector(
    (state) => state.uploadSuccess.isUploadSuccess
  );

  useEffect(() => {
    const dbRef = ref(database);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setDataList(snapshot.val());
        setIsDataEmpty(false);
      } else {
        console.log("No Data");
      }
    });
  }, []);

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
    <div>
      <div>{isDataEmpty ? <Empty /> : <Tracks dbList={dataList} />}</div>
    </div>
  );
};

export default Home;
