import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("Give something");
    res.send("TESTING..");
});

app.listen(3000, () => {
    console.log("Server listening to port 3000...");
});