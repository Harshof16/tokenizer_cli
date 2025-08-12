
import readline from 'readline';

function tokenize(text) {
  return text.match(/\w+|[^\w\s]/g) || [];
}

function tokenToId(token) {
  let sum = 0;
  for (let i = 0; i < token.length; i++) {
    sum += token.charCodeAt(i) * (i + 1);
  }
  sum += token.length;
  const id = (sum % 97) + 10;
  return id;
}

// Decoding: ID to Token
function idToToken(id, dictionary) {
  const matches = Object.entries(dictionary)
    .filter(([token, tokenId]) => tokenId === id)
    .map(([token]) => token);
  return matches.length ? matches.join(", ") : "(no match)";
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter text to tokenize: ", (input) => {
  const tokens = tokenize(input);
  const dictionary = {};

  const ids = tokens.map(token => {
    const id = tokenToId(token);
    dictionary[token] = id;
    return id;
  });

  console.log("\nTokens: ", tokens.join(" | "));
  console.log("Token IDs: ", ids.join(" "));
  console.log("Token Count:", tokens.length);

  rl.question("\nEnter a Token ID to decode: ", (idInput) => {
    const decoded = idToToken(parseInt(idInput, 10), dictionary);
    console.log(`Decoded Token(s) for ID ${idInput}: ${decoded}`);
    rl.close();
  });
});
