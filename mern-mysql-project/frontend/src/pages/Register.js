import { useState } from "react";
import API from "../api/api";

function Register() {

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const registerUser = async() => {

        try {

            if (!data.name || !data.email || !data.password) {
                alert("Please fill all required fields");
                return;
            }

            const res = await API.post("/auth/register", data);

            alert("Registered Successfully");

            window.location.href = "/";

        } catch (err) {

            console.log(err);

            alert("Error while registering");

        }

    };

    return (

        <
        div >

        <
        h2 > Register < /h2>

        <
        input placeholder = "Name"
        value = { data.name }
        onChange = {
            (e) =>
            setData({...data, name: e.target.value })
        }
        />

        <
        br / > < br / >

        <
        input placeholder = "Email"
        value = { data.email }
        onChange = {
            (e) =>
            setData({...data, email: e.target.value })
        }
        />

        <
        br / > < br / >

        <
        input placeholder = "Phone"
        value = { data.phone }
        onChange = {
            (e) =>
            setData({...data, phone: e.target.value })
        }
        />

        <
        br / > < br / >

        <
        input type = "password"
        placeholder = "Password"
        value = { data.password }
        onChange = {
            (e) =>
            setData({...data, password: e.target.value })
        }
        />

        <
        br / > < br / >

        <
        button onClick = { registerUser } >
        Register <
        /button>

        <
        /div>

    );

}

export default Register;