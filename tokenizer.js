
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter text to tokenize: ", (input) => {
  const tokens = tokenize(input);
  const ids = tokens.map(token => tokenToId(token));

  console.log("\nTokens: ", tokens.join(" | "));
  console.log("Token IDs: ", ids.join(" "));
  console.log("Token Count:", tokens.length);

  rl.close();
});
