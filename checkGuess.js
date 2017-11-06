const natural = require('natural');

export default function checkGuess(answer, guess) {
  answer = answer.toLowerCase().split(/\s/).join(' ');
  guess = guess.toLowerCase().split(/\s/).join(' ');
  let stringDistance = natural.JaroWinklerDistance(answer, guess);
  if (stringDistance >= 0.87) {
    return 'Correct!';
  } else if (stringDistance >= 0.75) {
    let matchingWords = [];
    answer = answer.split(' ');
    guess = guess.split(' ');
    for (let i = 0; i < guess.length; i++) {
      for (let j = 0; j < answer.length; j++) {
        if (guess[i] === answer[j]) {
          matchingWords.push(guess[i]);
        }
      }
    }
    let response = 'You\'re close.'
    if (matchingWords.length === 1) {
      response += ` ${matchingWords[0]} was correct.`
    } else if (matchingWords.length > 1) {
      response += ` ${matchingWords.join(', ')} were correct.`      
    }
    return response;
  } else {
    return 'Sorry, try again';
  }
}


// [ [answer, guess] ]
// const sampleStrings = [
//   ['Mario\'s Pizza', 'Mario\'s Pizza'],
//   ['Mario\'s Pizza', 'Mario\'s'],
//   ['Mario\'s Pizza', 'Mario\'s Pizzeria'],
//   ['Mario\'s Pizza', 'Mario\'s Restaurant'],
//   ['Mario\'s Pizza', 'Nick\'s Pizza'],
//   ['Mario\'s Pizza', 'Fake guess'],
//   ['Anderson Park', 'Anderson'],
//   ['Anderson Park', 'Anderson\'s Park'],
//   ['Anderson Park', 'Anderson\'s Park']
// ]

// for (let i = 0; i < sampleStrings.length; i++) {
//   let answer = sampleStrings[i][0], guess = sampleStrings[i][1];
//   console.log(checkGuess(answer, guess));
// }