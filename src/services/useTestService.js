// import React from "react";
// import { useHttp } from "../hooks/http.hook";
// import { getRepository } from "../helpers/helpers";

// export const useBoardService = () => {
//     const _apiBase = "https://api.github.com/repos";

//     const { loading, request, error, clearError } = useHttp();

//     const getIssues = async (queryUrl) => {
//         const { full_name, owner, repositoryName } = getRepository(queryUrl);

//         const data = await request(`${_apiBase}/${full_name}`);

//         const allIssues = await request(
//             `${_apiBase}/${full_name}/issues?state=open&assignee=none&per_page=3`
//         );
//         const openIssues = await request(
//             `${_apiBase}/${full_name}/issues?state=open&assignee=*&per_page=4`
//         );
//         const closedIssues = await request(
//             `${_apiBase}/${full_name}/issues?state=closed&per_page=5`
//         );

//         return {
//             info: {
//                 stars: data.stargazers_count,
//                 full_name: data.full_name,
//                 owner,
//                 repositoryName,
//                 full_name_url: data.html_url,
//             },
//             issues: [
//                 allIssues.map(_transformIssue),
//                 openIssues.map(_transformIssue),
//                 closedIssues.map(_transformIssue),
//             ],
//             // issues: {
//             //     allIssues: allIssues.map(_transformIssue),
//             //     openIssues: openIssues.map(_transformIssue),
//             //     closedIssues: closedIssues.map(_transformIssue),
//             // },
//         };
//     };

//     const _transformIssue = (issue) => {
//         return {
//             repository_url: issue.repository_url,
//             id: issue.id,
//             title: issue.title,
//             user_url: issue.user.html_url,
//             user_name: issue.user.login,
//             comments: issue.comments,
//             state: issue.state,
//             assignees: issue.assignees,
//             created_at: issue.created_at,
//             number: issue.number,
//         };
//     };

//     return { loading, error, clearError, getIssues };
// };
