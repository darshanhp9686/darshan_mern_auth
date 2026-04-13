import { useState } from "react";
import API from "../api/api";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const sendEmail = async() => {

        await API.post("/auth/forgot-password", { email });

        alert("Reset link sent");

    };

    return (

        <
        div >

        <
        h2 > Forgot Password < /h2>

        <
        input placeholder = "Email"
        onChange = {
            (e) => setEmail(e.target.value) }
        />

        <
        br / > < br / >

        <
        button onClick = { sendEmail } >
        Send Email <
        /button>

        <
        /div>

    );

}

export default ForgotPassword;