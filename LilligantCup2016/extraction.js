var fs = require('fs');
var text = "{\n\t\"player\":[\n\t{\n\t\t";

fs.readFile('players.txt', 'utf8', function (err, buf) {
    if (err) return err;

    var arr = buf.toString().split("\n");
    var inf;

    var keys = ["\"num\": \"", "\",\n\t\t\"id\": \"", "\",\n\t\t\"qq\": \"", "\",\n\t\t\"time\" :\"", "\", \n\t\t\"fc\":\""]
    for (var i = 0; i < arr.length; i++) {
        inf = arr[i].split("\t");
        for (var j = 0; j < 5; j++) {
            text = text.concat(keys[j]);
            text = text.concat(inf[j]);
        }
        text = text.slice(0, -1);
        text = text.concat("\"\n\t}");
        if (i < arr.length - 1) {
            text = text.concat(",\n\t{\n\t\t");
        } else {
            text = text.concat("\n],\n");
        }
    }

//match
    text = text.concat("\t\"match\": {\n")
    fs.readFile('winner_r1.txt', 'utf8', function (err, buf) {
        if (err) return err;

        text = text.concat("\t\t\"match1\": [");
        var arr = buf.toString().split("\n");

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].slice(0, -1);
            var inf = arr[i].split("\t");
            text = text.concat("\"" + inf[0] + "\"");
            if (i < arr.length - 1) text = text.concat(", ");
        }
        text = text.concat("],\n");

        fs.readFile('winner_r2.txt', 'utf8', function (err, buf) {
            if (err) return err;

            text = text.concat("\t\t\"match2\": [");
            var arr = buf.toString().split("\n");

            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].slice(0, -1);
                var inf = arr[i].split("\t");
                text = text.concat("\"" + inf[0] + "\"");
                if (i < arr.length - 1) text = text.concat(", ");
            }
            text = text.concat("]\n\t}\n}");


            fs.writeFile("information.json", text, function (err) {
                if (err) throw err;
            });
        });
    });
});