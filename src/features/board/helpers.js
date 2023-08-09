export const onReorderColumnIssues = (sourceCol, startIndex, endIndex) => {
    const sourceColIssues = [...sourceCol.issues];

    const [removed] = sourceColIssues.splice(startIndex, 1);
    sourceColIssues.splice(endIndex, 0, removed);

    return sourceColIssues;
};

export const onMoveIssues = (
    sourceCol,
    source,
    destinationCol,
    destination
) => {
    const sourceColIssues = [...sourceCol.issues];
    const destinationColIssues = [...destinationCol.issues];

    const [removed] = sourceColIssues.splice(source.index, 1);
    destinationColIssues.splice(
        destination.index,
        0,
        changeIssuesState(removed, destinationCol.state)
        // removed
    );

    return {
        newSourceCol: { ...sourceCol, issues: sourceColIssues },
        newDestinationCol: { ...destinationCol, issues: destinationColIssues },
    };
};

export const getOpenDate = (time) => {
    console.log("render");
    let result = "";

    const endTime = Date.parse(new Date()) - Date.parse(time);
    const remainingDays = Math.floor(endTime / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((endTime / (1000 * 60 * 60)) % 24);

    if (remainingDays === 0) {
        result = ` opened ${remainingHours} hours ago`;
    } else {
        result = ` opened ${remainingDays} days ago`;
    }

    return result;
};

export const changeIssuesState = (issue, columnState) => {
    const defaultAssigne = {
        id: "userId",
        login: "userLogin",
    };

    let result = {};

    switch (columnState) {
        case "all":
            result = {
                ...issue,
                state: "open",
                assignees: [],
            };
            break;
        case "open":
            result = {
                ...issue,
                state: columnState,
                assignees: [defaultAssigne],
            };
            break;
        case "closed":
            result = {
                ...issue,
                state: columnState,
                assignees: [],
            };
            break;

        default:
            break;
    }

    return result;
};
