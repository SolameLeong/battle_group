(function () {
    var main = new Vue({
        el: "#groupBattle",
        data: {
            namelist: null
        },
        ready: function () {
            this.$http.get('./player.json').then(function (response) {
                this.namelist = response.data.namelist;
            })
        }
    });
})();
