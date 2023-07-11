import { configureStore } from "@reduxjs/toolkit";
import UploadSlice from "./UploadSlice";
import UploadSuccessSlice from "./UploadSuccessSlice";
import UserLoginSlice from "./UserLoginSlice";

const store = configureStore({
  reducer: {
    upload: UploadSlice,
    uploadSuccess: UploadSuccessSlice,
    login: UserLoginSlice,
  },
});

export default store;
