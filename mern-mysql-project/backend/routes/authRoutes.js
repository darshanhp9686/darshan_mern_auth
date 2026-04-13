const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const router = express.Router();

const SECRET = "secretkey";


// REGISTER
router.post("/register", (req, res) => {

    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Missing required fields");
    }

    const hash = bcrypt.hashSync(password, 10);

    db.query(
        "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)", [name, email, phone, hash],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send("Database error");
            }

            res.send("User registered successfully");

        }
    );

});


// LOGIN
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?", [email],
        (err, result) => {

            if (err) return res.status(500).send(err);

            if (result.length === 0)
                return res.status(404).send("User not found");

            const valid = bcrypt.compareSync(password, result[0].password);

            if (!valid)
                return res.status(400).send("Wrong password");

            const token = jwt.sign({ id: result[0].id },
                SECRET
            );

            res.json({
                message: "Login successful",
                token
            });

        }
    );

});


module.exports = router;