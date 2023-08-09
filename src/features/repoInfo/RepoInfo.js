import React from "react";

import { useSelector } from "react-redux";

const RepoInfo = () => {
    const issuesLoadingStatus = useSelector(
        (state) => state.issues.issuesLoadingStatus
    );

    const info = useSelector((state) => state.info.repoInfo);

    if (issuesLoadingStatus === "loading") {
        return <h5>Loading...</h5>;
    }

    return (
        info.full_name &&
        issuesLoadingStatus !== "error" && (
            <div className="repo-info">
                <div className="repo-info__path">
                    <a
                        href={`https://github.com/${info.owner}`}
                        target="_blanck"
                    >
                        <span>{info.owner}</span>
                    </a>
                    <span className="delimiter">&gt;</span>
                    <a
                        href={`https://github.com/${info.owner}/${info.repositoryName}`}
                        target="_blanck"
                    >
                        <span>{info.repositoryName}</span>
                    </a>
                </div>
                <i className="fas fa-star"></i>
                <span>{Math.round(info.stars / 1000)}k stars</span>
            </div>
        )
    );
};

export default RepoInfo;
