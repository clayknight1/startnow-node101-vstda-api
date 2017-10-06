const express = require('express')
const morgan = require('morgan')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mockData = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

const app = express()
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send(mockData);
});

app.get('/api/TodoItems', (req, res) => {
    res.json(mockData);
});
app.get('/api/TodoItems/:todoItemId', (req, res) => {
    var item; 
    for (i = 0; i < mockData.length; i++) { 
        if (mockData[i].todoItemId === parseInt(req.params.todoItemId)) {
            item = mockData[i]    
            }
  }; 
    if (item) {
        console.log('404')
    }
    res.status(200).json(item);
});

app.post('/api/TodoItems', jsonParser, (req, res, next) => {
    var postInput = req.body
    var match = false
    for (j = 0; j < mockData.length; j++) {
        if ( mockData[j].todoItemId === postInput.todoItemId ) {
            mockData[j] = postInput
        }
    };
        if (!match) {
            mockData.push(postInput);
            res.status(201).json(req.body);
        }; 
}); 

app.delete('/api/TodoItems/:todoItemId', (req, res) => {
    var temp = []
    
    for (k = 0; k < mockData.length; k++) {
        var a = mockData[k]
        if ( mockData[k].todoItemId == parseInt(req.params.todoItemId) ) {
            res.status(200).json(mockData[k])
        };
    }
})


module.exports = app;
