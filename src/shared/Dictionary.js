import wordList from '../assets/words_dictionary.json';

export default function englishWord(possibleWord) {
  // console.log(`Possible word: ${possibleWord}`);
  if (wordList[possibleWord] !== 1) {
    return false;
  }
  return true;
}
