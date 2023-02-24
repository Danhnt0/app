
module.exports = function (io){
    var users = [];

    io.on('connection', function(socket){
       
        socket.on('add_user', function(data){
            socket.username = data;
            users.push(data);
           
           
            var mes = {
                sender: 'Server',
                message: 'Welcome to the chat room ' + data,
               
            };
            socket.emit('update_chat', mes);

            var cl_mes = {
                sender: 'Server',
                message: data + ' has joined the chat room',
               
            };
            socket.broadcast.emit('update_chat', cl_mes);
        });

        socket.on('send_message', function(data){
            var mes = {
                sender: "You",
                message: data,
               
            };
            socket.emit('update_chat', mes);

            var cl_mes = {
                sender: socket.username,
                message: data,

            };
            socket.broadcast.emit('update_chat', cl_mes);
        });

        socket.on('disconnect', function(){
            var index = users.indexOf(socket.username);
            users.splice(index, 1);
            var cl_mes = {
                sender: 'Server',
                message: socket.username + ' has left the chat room',
               
            };
            socket.broadcast.emit('update_chat', cl_mes);
        });


    });


          
}