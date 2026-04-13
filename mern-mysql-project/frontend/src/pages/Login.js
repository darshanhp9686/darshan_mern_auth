import { useState } from "react";
import API from "../api/api";

function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const loginUser = async() => {

        try {

            const res = await API.post("/auth/login", data);

            localStorage.setItem("token", res.data.token);

            alert("Login successful");

            window.location.href = "/dashboard";

        } catch (err) {

            alert("Login failed");

        }

    };

    return (

        <
        div >

        <
        h2 > Login < /h2>

        <
        input placeholder = "Email"
        onChange = {
            (e) => setData({...data, email: e.target.value }) }
        />

        <
        br / > < br / >

        <
        input type = "password"
        placeholder = "Password"
        onChange = {
            (e) => setData({...data, password: e.target.value }) }
        />

        <
        br / > < br / >

        <
        button onClick = { loginUser } >
        Login <
        /button>

        <
        /div>

    );

}

export default Login;