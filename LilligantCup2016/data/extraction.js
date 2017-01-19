var fs = require('fs');
var info = {};

fs.readFile('players.txt', 'utf8', function (err, buf) {
    if (err) return err;

    var arr = buf.toString().split("\n");
    var inf;
    info.players = [];

    for (var i = 0; i < arr.length; i++) {
        info.players[i] = {};
        inf = arr[i].split("\t");
        info.players[i].num = inf[0];
        info.players[i].id = inf[1];
        info.players[i].qq = inf[2];
        info.players[i].time = inf[3];
        info.players[i].fc = inf[4];
    }

//match
    info.match = {};
    fs.readFile('winner_r1.txt', 'utf8', function (err, buf) {
        if (err) return err;

        info.match.match1 = [];
        var arr = buf.toString().split("\n");

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].slice(0, -1);
            var inf = arr[i].split("\t");
            info.match.match1[i] = inf[0]
        }

        fs.readFile('winner_r2.txt', 'utf8', function (err, buf) {
            if (err) return err;

            info.match.match2 = [];
            var arr = buf.toString().split("\n");

            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].slice(0, -1);
                var inf = arr[i].split("\t");
                info.match.match2[i] = inf[0];
            }

            var text = JSON.stringify(info);
            fs.writeFile("information.json", text, function (err) {
                if (err) throw err;
            });
        });
    });
});