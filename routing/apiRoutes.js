var friendArray = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendArray);
    });

    app.post("/api/friends", function (req, res) {
        var newFriendScore = req.body.scores;
        var scoresArr = [];
        var friendCount = 0;
        var bestMatch = 0;

        for (var i = 0; i < friendArray.length; i++) {
            var scoreDiff = 0;
            for (var j = 0; j < newFriendScore.length; j++) {
                scoreDiff += (Math.abs(parseINT(friendArray[i].scores[j]) - parseInt(newFriendScore[j])));
            }
            scoresArr.push(scoreDiff);
        }
        for (var i=0; i<scoresArr.length; i++) {
            if (scoresArr[i] <= scoresArr[bestMatch]){
                bestMatch = i;
            }
        }
        var bff = friendArray[bestMatch];
        res.json(bff);
        friendArray.push(req.body);
    });
};