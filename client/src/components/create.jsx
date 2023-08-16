import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    });
    const navigate = useNavigate();

    // These methods will update the state properties
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    // This function will handle the submission
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create urrl, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setForm({ name: "", position: "", level: ""});
        navigate("/");
    }
}