import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import "./search.scss";

const Search = ({ query, setQuery, handleRequest }) => {
    return (
        <div className="search">
            <Formik
                initialValues={{
                    search: "https://github.com/facebook/react",
                }}
                validationSchema={yup.object({
                    search: yup.mixed().required("Required field!"),
                })}
                onSubmit={(values) => {
                    handleRequest(values.search);
                }}
            >
                <Form>
                    <Field
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Enter repo URL"
                    />
                    <ErrorMessage name="search">
                        {(msg) => <div className="error">{msg}</div>}
                    </ErrorMessage>

                    <button type="submit">Load issues</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Search;
