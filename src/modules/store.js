import { configureStore } from "@reduxjs/toolkit";
import UploadSlice from "./UploadSlice";
import UploadFormSlice from "./UploadFormSlice";

const store = configureStore({
  reducer: {
    upload: UploadSlice,
    form: UploadFormSlice,
  },
});

export default store;
