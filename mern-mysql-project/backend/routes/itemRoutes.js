const verifyToken = require("../middleware/authMiddleware");
const express = require("express");
const db = require("../config/db");

const router = express.Router();


// GET ALL ITEMS
router.get("/", (req, res) => {

    const user_id = 1;

    db.query(
        "SELECT * FROM items WHERE user_id=?", [user_id],
        (err, result) => {

            if (err) return res.send(err);

            res.json(result);

        });

});


// GET SINGLE ITEM
router.get("/:id", (req, res) => {

    db.query(
        "SELECT * FROM items WHERE id=?", [req.params.id],
        (err, result) => {

            if (err) return res.send(err);

            res.json(result[0]);

        });

});


// CREATE ITEM
router.post("/", (req, res) => {

    const { title, description, status } = req.body;

    const user_id = 1;

    db.query(
        "INSERT INTO items(user_id,title,description,status) VALUES(?,?,?,?)", [user_id, title, description, status],
        (err) => {

            if (err) return res.send(err);

            res.send("Item created");

        });

});


// UPDATE ITEM
router.put("/:id", (req, res) => {

    const { title, description, status } = req.body;

    db.query(
        "UPDATE items SET title=?,description=?,status=? WHERE id=?", [title, description, status, req.params.id],
        (err) => {

            if (err) return res.send(err);

            res.send("Item updated");

        });

});


// DELETE ITEM
router.delete("/:id", (req, res) => {

    db.query(
        "DELETE FROM items WHERE id=?", [req.params.id],
        (err) => {

            if (err) return res.send(err);

            res.send("Item deleted");

        });

});


// DASHBOARD STATS
router.get("/stats/all", (req, res) => {

    const user_id = 1;

    db.query(
        `
 SELECT
 COUNT(*) as total,
 SUM(status='active') as active,
 SUM(status='pending') as pending,
 SUM(status='completed') as completed
 FROM items
 WHERE user_id=?
 `, [user_id],
        (err, result) => {

            if (err) return res.send(err);

            res.json(result[0]);

        });

});


module.exports = router;