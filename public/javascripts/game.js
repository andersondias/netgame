$(function(){
    var server = io.connect('http://192.168.254.12:3000');
    Number.prototype.times = function(func) { 
        for(var i = 0; i < Number(this); i++) {
            func(i); 
        }
    }

    var current_position_x = 0;
    var current_position_y = 0;

    function draw() {
        var canvas = document.getElementById('world');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');  
            (10).times(function(column_index) {
                (10).times(function(entry_index) {
                    ctx.fillStyle = 'rgb(' + ((entry_index) * 25) + ',' + column_index * 25 + ',0)';
                    ctx.fillRect(column_index*50, (entry_index*50), 50, 50);
                });
            });
            ctx.fillStyle = 'rgb(255,255,255)'
            ctx.fillRect(current_position_x * 50, current_position_y * 50, 50, 50);
        }
    }
    draw();

    function move(key) {
        switch(key) {
            case 37: current_position_x--;break;
            case 38: current_position_y--;break;
            case 39: current_position_x++;break;
            case 40: current_position_y++;break;
        }
        if(current_position_x < 0) current_position_x = 0;
        if(current_position_y < 0) current_position_y = 0;
        console.log("E: "+ key + ', X: ' + current_position_x + ', Y: ' + current_position_y);
        draw();
    }

    $('body').keydown(function(e){
        move(e.keyCode);
        server.emit('move', e.keyCode);
    });
    server.on('move', function(key){
        move(key);
    });
});