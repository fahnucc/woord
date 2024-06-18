class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }

  canLeadToWord(char) {
    return !!this.children[char];
  }

  getChildNode(char) {
    return this.children[char];
  }

  static fromJSON(jsonNode) {
    const node = new TrieNode();
    node.isEndOfWord = jsonNode.isEndOfWord;
    Object.keys(jsonNode.children).forEach((char) => {
      node.children[char] = TrieNode.fromJSON(jsonNode.children[char]);
    });
    return node;
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
    trie.root = TrieNode.fromJSON(JSON.parse(json));
    return trie;
  }
}

export default Trie;
