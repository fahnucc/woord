import fs from "fs";

export const loadWordsFromJson = (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);

  if (Array.isArray(parsedData)) {
    return { type: "array", data: parsedData };
  } else if (typeof parsedData === "object" && parsedData !== null) {
    return { type: "object", data: parsedData };
  } else {
    throw new Error("Unsupported data format");
  }
};

export const addWordsToTrie = (words, trie) => {
  if (words.type === "object") {
    Object.keys(words.data).forEach((word) => {
      trie.insert(word);
    });
  } else if (words.type === "array") {
    words.data.forEach((word) => {
      trie.insert(word);
    });
  } else {
    throw new Error("Unsupported words format");
  }
};
