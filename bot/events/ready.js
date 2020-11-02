module.exports = async (client) => {
    console.log(`Logged In As : ${client.user.tag}`);

    function status() {
        let status = [`!help`, `Made With ❤️ By HirboSH`];
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        
        client.user.setActivity(randomStatus, { type : 'LISTENING'});
    }

    setInterval(status, 100000);
}