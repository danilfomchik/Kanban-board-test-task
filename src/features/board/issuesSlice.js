import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";
import { getRepository } from "../../helpers/helpers";

import { getOpenDate } from "./helpers";

const initialState = {
    columns: [
        { id: 0, title: "ToDo", state: "all", issues: [] },
        { id: 1, title: "In Progress", state: "open", issues: [] },
        { id: 2, title: "Done", state: "closed", issues: [] },
    ],
    issuesLoadingStatus: "idle",
};

export const fetchIssues = createAsyncThunk(
    "issues/fetchIssues",
    async (queryUrl) => {
        const { request } = useHttp();
        const { full_name } = getRepository(queryUrl);

        const allIssues = await request(
            `https://api.github.com/repos/${full_name}/issues?state=open&assignee=none&per_page=2`
        );

        const openIssues = await request(
            `https://api.github.com/repos/${full_name}/issues?state=open&assignee=*&per_page=2`
        );
        const closedIssues = await request(
            `https://api.github.com/repos/${full_name}/issues?state=closed&per_page=2`
        );

        return Promise.all([
            allIssues.map(_transformIssue),
            openIssues.map(_transformIssue),
            closedIssues.map(_transformIssue),
        ]);
    }
);

export const _transformIssue = (issue) => {
    return {
        repository_url: issue.repository_url,
        id: issue.id,
        title: issue.title,
        user_url: issue.user.html_url,
        user_name: issue.user.login,
        comments: issue.comments,
        state: issue.state,
        assignees: issue.assignees.map((assignee) => {
            return {
                id: assignee.id,
                login: assignee.login,
            };
        }),
        created_at: getOpenDate(issue.created_at),
        number: issue.number,
    };
};

const issuesSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {
        reorderIssues: (state, action) => {
            const { sourceCol, reorderedIssues } = action.payload;

            state.columns.map((column, i) => {
                if (column.id === sourceCol.id) {
                    column.issues = reorderedIssues;
                } else {
                    column = column;
                }
            });
        },
        moveIssue: (state, action) => {
            const { newSourceCol, newDestinationCol } = action.payload;

            state.columns.map((column, i) => {
                if (column.id === newSourceCol.id) {
                    column.issues = newSourceCol.issues;
                } else if (column.id === newDestinationCol.id) {
                    column.issues = newDestinationCol.issues;
                } else {
                    column = column;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIssues.pending, (state) => {
                state.issuesLoadingStatus = "loading";
            })
            .addCase(fetchIssues.fulfilled, (state, action) => {
                state.issuesLoadingStatus = "idle";
                state.columns.map((column, i) => {
                    column.issues = action.payload[i];
                });
            })
            .addCase(fetchIssues.rejected, (state) => {
                state.issuesLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const { reducer, actions } = issuesSlice;

export const { reorderIssues, moveIssue } = actions;

export default reducer;
