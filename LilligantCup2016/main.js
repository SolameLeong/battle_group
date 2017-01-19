var v;
window.onload = function () {
    var a = new Vue({
        el: '#locate',
        data: {
            groupNumbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',
                'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V']
        },
        methods: {
            generate_id: function(number) {
                var text = '#group'.concat(number);
                return text;
            }
        }
    });
    var b = new Vue({
        el: '#group-battle',
        data: {
            players: [],
            groupNumbers: [],
            match: null
        },
        mounted: function () {
            this.$http.get('data/information.json').then(function (response) {
                return response.json()
            }).then(function (data) {
                this.match = data.match;
                this.players = data.players;
                this.groupNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',
                    'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'];
            })
        },
        methods: {
            get_id: function (group, match, turn) {
                var winner;
                for (var i = 0; i < this.groupNumbers.length; i++) {
                    if (group == this.groupNumbers[i]) {
                        if (turn == 0) winner = i * 2 + Number(match);
                        else winner = i;
                        break;
                    }
                }
                var number;
                if (turn == 0) number = this.match.match1[winner];
                else number = this.match.match2[winner];

                if (number !== '') {
                    var index = Number(number.charAt(1)) + i * 4 - 1;
                    return this.players[index].id;
                }
                return;
            },
            get_group: function(group) {
                return 'group'.concat(group);
            }
        }
    })
};
