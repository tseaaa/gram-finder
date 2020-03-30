// eslint-disable-next-line import/no-webpack-loader-syntax
import rawCandidateAnagrams from 'raw-loader!../assets/CandidateList.txt';
import englishWord from './Dictionary';

// The combinations array is used to create stack variations of the raw candidate word list
const combinations = [
  [1, 2, 3, 4],
  [1, 2, 4, 3],
  [1, 3, 2, 4],
  [1, 3, 4, 2],
  [1, 4, 2, 3],
  [1, 4, 3, 2],
  [2, 1, 3, 4],
  [2, 1, 4, 3],
  [2, 3, 1, 4],
  [2, 3, 4, 1],
  [2, 4, 1, 3],
  [2, 4, 3, 1],
  [3, 1, 2, 4],
  [3, 1, 4, 2],
  [3, 2, 1, 4],
  [3, 2, 4, 1],
  [3, 4, 1, 2],
  [3, 4, 2, 1],
  [4, 1, 2, 3],
  [4, 1, 3, 2],
  [4, 2, 1, 3],
  [4, 2, 3, 1],
  [4, 3, 1, 2],
  [4, 3, 2, 1],
];

// The currentStatus object is what is returned on each individual attempt to find a winner
const currentStatus = {
  winners: [],
  currentCandidate: '',
  numAttempts: 0,
  numWinners: 0,
  totalPossibilities: 0,
};

// The raw list of candidate anagram sets is read and split from text asset CandidateList
const sCandidateAnagrams = rawCandidateAnagrams.split('\n');

// Now we take the array of word sets and make each line an array or words
const aCandidateAnagrams = [];
for (let index = 0; index < sCandidateAnagrams.length; index += 1) {
  const tempCandidate = sCandidateAnagrams[index].split(' ');
  aCandidateAnagrams.push([tempCandidate[0],
    tempCandidate[1],
    tempCandidate[2],
    tempCandidate[3]]);
}

const fullListCandidateAnagrams = [];

// Using combinations we create the full list of all possible candidate sets
for (let index = 0; index < aCandidateAnagrams.length; index += 1) {
  for (let cIndex = 0; cIndex < combinations.length; cIndex += 1) {
    fullListCandidateAnagrams
      .push([aCandidateAnagrams[index][combinations[cIndex][0] - 1],
        aCandidateAnagrams[index][combinations[cIndex][1] - 1],
        aCandidateAnagrams[index][combinations[cIndex][2] - 1],
        aCandidateAnagrams[index][combinations[cIndex][3] - 1]]);
  }
}

currentStatus.totalPossibilities = fullListCandidateAnagrams.length;

// isMatch will analyze the grid to see if all vertical columns form a word.
// If so, the candidate is a winner.
function isMatch(candidate) {
  for (let index = 0; index < candidate.length; index += 1) {
    const verticalWord = candidate[0].charAt(index)
      + candidate[1].charAt(index)
      + candidate[2].charAt(index)
      + candidate[3].charAt(index);

    if (!englishWord(verticalWord)) {
      return false;
    }
  }
  return true;
}

// tryNextCandidate is called by the Status vue component.
// It checks only the next candidate and supplies the current resulst and status
// by passing back currentStatus
//
// eslint-disable-next-line func-names
const tryNextCandidate = function () {
  currentStatus.currentCandidate = fullListCandidateAnagrams[currentStatus.numAttempts];
  if (isMatch(fullListCandidateAnagrams[currentStatus.numAttempts])) {
    currentStatus.numWinners += 1;
    currentStatus.winners.push({
      id: currentStatus.numWinners,
      words: fullListCandidateAnagrams[currentStatus.numAttempts],
    });
  }

  currentStatus.numAttempts += 1;
  return currentStatus;
};

// eslint-disable-next-line import/prefer-default-export
export const status = {
  tryNextCandidate,
};
