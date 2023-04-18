import React from "react";
import { useHttp } from "../hooks/http.hook";

export const useBoardService = () => {
    const _apiBase = "https://api.github.com/repos";

    const { loading, request, error, clearError } = useHttp();

    const getIssues = async (queryUrl) => {
        let name = "";

        if (queryUrl.includes("https://github.com/")) {
            name = queryUrl.replace(/https:\/\/github.com\//i, "");
        }

        // const url = `${_apiBase}/${name}/issues?state=${"all"}&per_page=30`;

        const allIssues = await Promise.all([
            request(`${_apiBase}/${name}/issues?state=all&per_page=30`),
            request(`${_apiBase}/${name}/issues?state=open&per_page=30`),
            request(`${_apiBase}/${name}/issues?state=closed&per_page=30`),
        ]);

        console.log(allIssues);

        return {
            allIssues: allIssues[0].map(_transformIssue),
            openIssues: allIssues[1].map(_transformIssue),
            closedIssues: allIssues[2].map(_transformIssue),
        };
    };

    const _transformIssue = (issue) => {
        return {
            repository_url: issue.repository_url,
            id: issue.id,
            title: issue.title,
            owner: issue.user.html_url,
            comments: issue.comments,
            state: issue.state,
        };
    };

    return { loading, error, clearError, getIssues };
};
