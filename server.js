const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

// Load config.json
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

app.get("/card", (req, res) => {
    setTimeout(() => {
        const dragonCard = getRandom(config.dragon);
        const tigerCard = getRandom(config.tiger);

        let winner = "tie";
        if (dragonCard > tigerCard) winner = "dragon";
        if (tigerCard > dragonCard) winner = "tiger";

        res.json({
            dragon: dragonCard,
            tiger: tigerCard,
            winner: winner
        });
    }, config.delay); // 10 seconds
});

app.listen(8880, () => {
    console.log("Dragon Tiger Server Running on Port 8880");
});