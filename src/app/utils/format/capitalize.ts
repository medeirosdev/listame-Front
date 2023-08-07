export const capitalize = (word: string = '') => {
  if (!word.length) return '';
  const [firstLetter, ...restOfTheWord] = [...word];
  return firstLetter.toUpperCase().concat(...restOfTheWord);
};
