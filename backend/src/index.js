const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const app = express();

const questions = [
  {
    id: 1,
    title: "What is react?",
    description: "Why is it important to know about react for developers now?",
    answers: []
  },
  {
    id: 2,
    title: 'How do I make a sandwich?',
    description: 'I am trying very hard, but I do not know how to make a delicious sandwich. Can someone help me?',
    answers: []
  }
];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


app.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length
  }))

  res.send(qs);
})


app.get('/:id', (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)))
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
})

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-cjv7mffd.auth0.com/.well-known/jwks.json`
  }),
  audience: `v26cEIZsPZgjTtY2ajXbHGIRPu093J0B`,
  issuer: `https://dev-cjv7mffd.auth0.com/`,
  algorithms: ['RS256']
});



app.post('/', checkJwt, (req, res) => {
  const { title, description } = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name,
  }
  questions.push(newQuestion);
  res.status(200).send();
})


app.post('/answer/:id', checkJwt, (req, res) => {
  const { answer } = req.body;
  const question = questions.filter(q => q.id === parseInt(req.params.id))
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  questions[0].answers.push({
    answer,
    author: req.user.name,
  })

  res.send(200).send();
})


app.listen(8081, () => {
  console.log('listening on port 8081');
})
