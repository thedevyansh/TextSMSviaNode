const express = require('express'),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      Nexmo = require('nexmo'),
      socketio = require('socket.io');

const nexmo = new Nexmo({
    apiKey: 'YOUR_API_KEY',
    apiSecret: 'YOUR_API_SECRET'
}, { debug: true });

const app = express();

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const { number, text } = req.body;

    nexmo.message.sendSms('YOUR_VIRTUAL_NUMBER', number, text, (err, responseData) => {
        if(err) {
            console.log(err);
        } else {
            console.dir(responseData);

            const { messages } = responseData;
            const number = messages[0]['to'];

            io.emit('smsStatus', number);
        }
    });
})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started running on PORT ${PORT}`));

const io = socketio(server);

io.on('connection', socket => {
    console.log('Connected');

    io.on('disconnect', () => {
        console.log('Disconnected');
    })
})