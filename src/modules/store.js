import { configureStore } from "@reduxjs/toolkit";
import UploadSlice from "./UploadSlice";
import UploadSuccessSlice from "./UploadSuccessSlice";

const store = configureStore({
  reducer: {
    upload: UploadSlice,
    uploadSuccess: UploadSuccessSlice,
  },
});

export default store;
