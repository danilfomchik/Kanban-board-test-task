import { configureStore } from "@reduxjs/toolkit";

import issues from "../features/board/issuesSlice";
import info from "../features/repoInfo/repoInfoSlice";

const store = configureStore({
    reducer: { issues, info },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
