import fs from "fs";

export const loadWordsFromJson = (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const addWordsToTrie = (words, trie) => {
  Object.keys(words).forEach((word) => {
    trie.insert(word);
  });
};
