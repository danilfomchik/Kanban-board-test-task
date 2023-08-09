import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { _transformIssue } from "../board/issuesSlice";

import { getRepository } from "../../helpers/helpers";
import { useHttp } from "../../hooks/http.hook";

import { fetchIssues } from "../board/issuesSlice";
import { fetchRepoInfo } from "../repoInfo/repoInfoSlice";

import "./search.scss";

const Search = ({ defaultColumns }) => {
    const { request } = useHttp();
    const dispatch = useDispatch();

    const onRequest = async (query) => {
        // ---------------- make with RTK query -------------
        // const { full_name } = getRepository(query);
        // const allIssues = await request(
        //     `https://api.github.com/repos/${full_name}/issues?state=open&assignee=none&per_page=2`
        // );
        // request(
        //     "http://localhost:3001/columns/0",
        //     "PATCH",
        //     JSON.stringify({
        //         issues: allIssues.map(_transformIssue),
        //     })
        // );
        // ---------------- make with RTK query -------------

        dispatch(fetchIssues(query));
        dispatch(fetchRepoInfo(query));

        // prevQuery.current = query;
    };

    return (
        <div className="search">
            <Formik
                initialValues={{
                    search: "https://github.com/facebook/react",
                    // in prod version
                    // search: "",
                }}
                validationSchema={yup.object({
                    search: yup
                        .string()
                        .min(19, "More than 19 characters required!")
                        .required("Required field!"),
                })}
                onSubmit={(values, { resetForm }) => {
                    onRequest(values.search);
                    resetForm();
                }}
            >
                <Form className="search-form">
                    <div className="search-form__group">
                        <Field
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Enter repo URL"
                            className="search-form__input"
                        />

                        <Button
                            className="search-form__btn"
                            type="submit"
                            variant="light"
                        >
                            Load issues
                        </Button>
                    </div>

                    <ErrorMessage name="search">
                        {(msg) => (
                            <div className="search-form__error">{msg}</div>
                        )}
                    </ErrorMessage>
                </Form>
            </Formik>
        </div>
    );
};

export default Search;
