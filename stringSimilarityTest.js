const natural = require('natural');


// [ [answer, guess] ]
const sampleStrings = [
  ['Mario\'s Pizza', 'Mario\'s Pizza'],
  ['Mario\'s Pizza', 'Mario\'s'],
  ['Mario\'s Pizza', 'Mario\'s Pizzeria'],
  ['Mario\'s Pizza', 'Mario\'s Restaurant'],
  ['Mario\'s Pizza', 'Nick\'s Pizza'],
  ['Anderson Park', 'Anderson'],
  ['Anderson Park', 'Anderson\'s Park'],
  ['Anderson Park', 'Anderson\'s Park']
]

for (let i = 0; i < sampleStrings.length; i++) {
  let answer = sampleStrings[i][0], guess = sampleStrings[i][1];
  console.log(`Answer:\n${answer}\n`, `Guess:\n${guess}\n`, `String distance:\n${natural.JaroWinklerDistance(answer, guess)}\n`);
}