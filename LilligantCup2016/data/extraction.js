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
            if (i == 0) inf[0] = inf[0].slice(1, 3);
            info.match.match1[i] = inf[0]
        }

        fs.readFile('winner_r2.txt', 'utf8', function (err, buf) {
            if (err) return err;

            info.match.match2 = [];
            var arr = buf.toString().split("\n");
            info.swiss_players = [];

            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].slice(0, -1);
                var inf = arr[i].split("\t");
                if (i == 0) inf[0] = inf[0].slice(1, 3);
                info.match.match2[i] = inf[0];
                var tmp = i * 4 + Number(inf[0].charAt(1)) - 1;
                info.swiss_players[i] = {};
                info.swiss_players[i].index = tmp;
                info.swiss_players[i].id = info.players[tmp].id;
                info.swiss_players[i].marks = [0, 0, 0];
            }

            fs.readFile('swiss_pas.txt', 'utf8', function (err, buf) {
                if (err) return err;

                info.swiss_match = [];
                var arr = buf.toString().split("\n");

                for (var i = 0; i < arr.length; i++) {
                    if (i < arr.length - 1) arr[i] = arr[i].slice(0, -1);
                    var inf = arr[i].split(" ");
                    if (i == 0) inf[0] = inf[0].slice(1, 3);
                    info.swiss_match[i] = [];
                    for (var x = 0; x < inf.length; x++) {
                        for (var y = 0; y < info.swiss_players.length; y++) {
                            if (inf[x] == info.swiss_players[y].id) {
                                info.swiss_match[i][x] = y;
                                break;
                            }
                        }
                    }
                }
                var text = JSON.stringify(info);
                fs.writeFile("information.json", text, function (err) {
                    if (err) throw err;
                });
            });
        });
    });
})
;