import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../hooks/http.hook";
import { useBoardService } from "../services/useBoardService";

// const { loading, error, clearError, getIssues } = useBoardService();

export const fetchIssues = createAsyncThunk(
    "issues/fetchIssues",
    (queryUrl) => {
        let name = "";

        if (queryUrl.includes("https://github.com/")) {
            name = queryUrl.replace(/https:\/\/github.com\//i, "");
        }

        // Todo - opened
        // inProgress - opened + assigned
        // Done - closed

        const allIssues = Promise.all([
            useHttp.request(
                `https://api.github.com/repos/${name}/issues?state=open&per_page=10`
            ),
            useHttp.request(
                `https://api.github.com/repos/${name}/issues?state=open&assignee=*&per_page=15`
            ),
            useHttp.request(
                `https://api.github.com/repos/${name}/issues?state=closed&per_page=25`
            ),
        ]);

        // console.log(allIssues);

        return allIssues;
    }
);

const boardSlice = createSlice({
    name: "issues",
    initialState: {
        allIssues: [],
        openIssues: [],
        closedIssues: [],
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: {
        [fetchIssues.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [fetchIssues.fulfilled]: (state, action) => {
            console.log(state, action);

            state.loading = false;

            state.allIssues = action.payload;
            // setOpenIssues(data.openIssues);
            // setClosedIssues(data.closedIssues);
        },
        [fetchIssues.rejected]: (state, action) => {},
    },
});

export const { handleSearch } = boardSlice.actions;

export default boardSlice.reducer;
