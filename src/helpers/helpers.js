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
