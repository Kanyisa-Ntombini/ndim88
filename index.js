class Magenta {
  constructor(codes) {
    this.codes = codes;
  }

  tokenise() {
    const length = this.codes.length;
    let currentPosition = 0;
    let tokens = [];
    const BUILT_IN_KEYWORDS = ['veza'];
    const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
  
    while (currentPosition < length) {
      let currentCharacter = this.codes[currentPosition];

      //if currentCharacter is a space or new line, continue
      if (currentCharacter === " " || currentCharacter === '\n') {
        currentPosition++;
        continue;
      } else if (currentCharacter === '"') {
        //the presence of " means we have he beginning of a string
        let inputString = '';
        currentPosition++;

        // while next char is not " or \n and we are not at the end of the code
        //This code inserts the string into inputString
        while (this.codes[currentPosition] !== '"' && this.codes[currentPosition] !== '\n' && currentPosition < length) {
          inputString += this.codes[currentPosition];
          currentPosition++;
        }

        // if the loop ended because of the end of the code and we didn't find the closing "
        if (this.codes[currentPosition] !== '"') {
          return {
            error: 'Akavalwanga amagama'
          }
        }
        currentPosition++;

        //adding the string to the tokens
        tokens.push({
          type: 'amagama',
          value: inputString
        });
      } else if (allowedCharacters.includes(currentCharacter)) {
        let inputString = currentCharacter;
        currentPosition++;

        // while the next char is a valid variable/keyword character
        while (allowedCharacters.includes(this.codes[currentPosition]) && currentPosition < length) {
          inputString += this.codes[currentPosition];
          currentPosition++;
        }

        // if the keyword is not a built in keyword
        if (!BUILT_IN_KEYWORDS.includes(inputString)) {
          return {
            error: `Asiyilindelanga le token:${inputString}`
          }
        }

        tokens.push({
          type:'keywords',
          value: inputString
        })
      } else {
        return{
          error: `Asiyilindelanga eligama: ${this.codes[currentPosition]}`
        }
      }
    }
    return {
      error: false,
      tokens
    }
  }

  run(){
    const {tokens, error} = this.tokenise();
    if (error) {
      console.log(error);
      return
    }
    console.log(tokens);
  }
}

/*const codes = 
`veza "Elethu Skeyi"
veza "Amyoli"`;*/
const codes = `veza "Elethu Skeyi"
veza "Amyoli"`;

const magenta = new Magenta(codes);
magenta.run();