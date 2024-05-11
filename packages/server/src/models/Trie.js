class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  contains(word) {
    word = word.toLowerCase();
    let node = this.root;
    for (const char of word) {
      const child = node.children[char];
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  toJSON() {
    return JSON.stringify(this.root);
  }

  static fromJSON(json) {
    const trie = new Trie();
    trie.root = JSON.parse(json);
    return trie;
  }
}

export default Trie;
