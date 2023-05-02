export const getRepository = (url) => {
    let info = [];

    if (url.includes("https://github.com/")) {
        info = url.replace(/https:\/\/github.com\//i, "").split("/");
    }

    return {
        full_name: info.join("/"),
        owner: info[0],
        repositoryName: info[1],
    };
};

export const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const [removed] = sourceCol.splice(startIndex, 1);
    sourceCol.splice(endIndex, 0, removed);

    return sourceCol;
};

export const changeIssuesState = (issues, state) => {
    return issues.map((issue) => (issue.state = state));
};
