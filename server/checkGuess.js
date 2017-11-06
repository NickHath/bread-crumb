const natural = require('natural');

const EXACT_THRESHOLD = 0.87
    , CLOSE_THRESHOLD = 0.75;

module.exports = {

  exactMatch: (guess, answer) => {
    answer = answer.toLowerCase().split(/\s/).join(' ');
    guess = guess.toLowerCase().split(/\s/).join(' ');
    let stringDistance = natural.JaroWinklerDistance(answer, guess);
    return stringDistance >= EXACT_THRESHOLD;
  },


  closeMatch: (guess, answer) => {
    answer = answer.toLowerCase().split(/\s/).join(' ');
    guess = guess.toLowerCase().split(/\s/).join(' ');
    let stringDistance = natural.JaroWinklerDistance(answer, guess);
    return stringDistance >= CLOSE_THRESHOLD;
  },


  matchingWords: (guess, answer) => {
    let matchingWords = [];
    answer = answer.toLowerCase().split(/\s/);
    guess = guess.toLowerCase().split(/\s/);
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
  }

}