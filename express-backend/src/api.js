const express = require('express')
const app = express()
var cors = require('cors')
const gramatica = require('../dist/Analizador/gramatica');

app.use(express.json()); //permite parsear a json
app.use(cors()); //activamos cors

app.post('/ejecutar', function (req, res) {
    const text = req.body;
    //gramatica.parse(text);
    console.log(text);
    res.send('Todo Ok');
})
 
app.listen(3000, () => {
    console.log('LISTEN ON PORT 3000');
});