import React, { useEffect, useState } from "react";

import Tracks from "./Tracks";

import { database } from "../../config/firebase";
import { get, ref } from "firebase/database";
import { Empty } from "antd";

const Home = () => {
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const [dataList, setDataList] = useState({});

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

  return <div>{isDataEmpty ? <Empty /> : <Tracks dbList={dataList} />}</div>;
};

export default Home;
