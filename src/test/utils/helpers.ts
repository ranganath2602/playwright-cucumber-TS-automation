import * as readline from 'readline';

export async function getUserInput(): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    return new Promise((resolve) => {
      rl.question('Please enter your input: ', (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }