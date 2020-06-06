const numberField = document.getElementById('number'),
      textField = document.getElementById('msg'),
      sendSms = document.querySelector('.button'),
      revealPara = document.querySelector('.reveal');

sendSms.addEventListener('click', sendSMS);

const socket = io();

socket.on('smsStatus', data => {
    revealPara.innerHTML = `<h5>Message sent successfully to ${data}.</h5>`;
})

function sendSMS() {
    const number = numberField.value.replace(/\D/g, ''),
          text = textField.value;

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ number, text })
    })
    .then(data => console.log(data))

    .catch(err => console.log(err))
}