import { createContext, useContext, useState } from "react";

const IssuesContext = createContext(null);

export const useIssuesContext = () => {
    return useContext(IssuesContext);
};

export const IssuesProvider = ({ children, value }) => {
    return (
        <IssuesContext.Provider value={value}>
            {children}
        </IssuesContext.Provider>
    );
};
