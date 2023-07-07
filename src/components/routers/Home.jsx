import React, { useEffect, useState } from "react";

import Tracks from "./Tracks";

import { database } from "../../config/firebase";
import { get, ref } from "firebase/database";
import { Empty } from "antd";

const Home = () => {
  const [dataList, setDataList] = useState({});

  useEffect(() => {
    const dbRef = ref(database);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setDataList(snapshot.val());
      } else {
        console.log("No Data");
      }
    });
  }, []);

  return (
    <div>{dataList.length > 0 ? <Empty /> : <Tracks dbTree={dataList} />}</div>
  );
};

export default Home;
