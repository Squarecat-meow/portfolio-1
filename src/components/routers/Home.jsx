import React, { useEffect, useState } from "react";

import Tracks from "./Tracks";

import { database } from "../../config/firebase";
import { get, ref } from "firebase/database";

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
  console.log(dataList);

  return <div>home</div>;
};

export default Home;
