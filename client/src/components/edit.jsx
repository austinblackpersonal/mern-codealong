import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString;
            const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

            if(!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if(!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

        setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            position: form.position,
            level: form.level,
        };

        // This will send a post request to update the data in the database
        await fetch(`http://localhosot:5050/record/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type' : 'application/json'
            },
        });

        navigate("/");
    }

    // TODO: This following section will display the form that takes the input from the user to update the data.
}