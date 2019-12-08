var friendsData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        var userAnswer = req.body;
        var userAns = userAnswer.scores;
        var matchScore = [];
        var index = 0;

        for (var j = 0; j < friendsData.length; j++) {
            var allScores = friendsData[j].scores;
            var difference = 0;
            for (var k = 0; k < userAns[j].length; k++) {
                difference += Math.abs(parseInt(allScores[j]) - parseInt(userAns[j]));
            }
            matchScore.push(difference);
        }

        for (var k = 0; k < matchScore.length; k++) {
            if (matchScore[k] <= matchScore[index]) {
                index = k;
            }
        }

        friendsData.push(userAnswer);
        res.json(friendsData[index]);
    });
};
