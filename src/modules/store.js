import { configureStore } from "@reduxjs/toolkit";
import UploadSlice from "./UploadSlice";
import UploadSuccessSlice from "./UploadSuccessSlice";
import UserLoginSlice from "./UserLoginSlice";
import DatalistSlice from "./DatalistSlice";

const store = configureStore({
  reducer: {
    upload: UploadSlice,
    uploadSuccess: UploadSuccessSlice,
    login: UserLoginSlice,
    datalist: DatalistSlice,
  },
});

export default store;
