import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";
import { getRepository } from "../../helpers/helpers";

const initialState = {
    repoInfo: {},
    repoInfoLoadingStatus: "idle",
};

export const fetchRepoInfo = createAsyncThunk(
    "repoInfo/fetchRepoInfo",
    async (queryUrl) => {
        const { request } = useHttp();
        const { full_name } = getRepository(queryUrl);

        return await request(`https://api.github.com/repos/${full_name}`);
    }
);

const _transformInfo = (info) => {
    return {
        stars: info.stargazers_count,
        full_name: info.full_name,
        owner: info.owner.login,
        repositoryName: info.name,
        full_name_url: info.html_url,
    };
};

const repoInfoSlice = createSlice({
    name: "repoInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepoInfo.pending, (state, action) => {
                state.repoInfoLoadingStatus = "loading";
            })
            .addCase(fetchRepoInfo.fulfilled, (state, action) => {
                state.repoInfoLoadingStatus = "idle";
                state.repoInfo = _transformInfo(action.payload);
            })
            .addCase(fetchRepoInfo.rejected, (state, action) => {
                state.repoInfoLoadingStatus = "error";
            });
    },
});

const { reducer, actions } = repoInfoSlice;

export default reducer;
