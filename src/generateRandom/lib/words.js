import Random from "./random";

export default class Words{
    constructor(doubleLetterRate = .25, options = {}){
        this.random = new Random;
        this.doubleLetterRate = doubleLetterRate;
        this.specialChars = ["-","'"];
    }

    guardString(str){
        if(str !== undefined && typeof str !== "string") throw new TypeError;
    }
    
    guardNumber(num){
        if(num !== undefined && typeof num !== "number") throw new TypeError;
    }

    capFirst(word){
        this.guardString(word);
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }

    words(num = 10){
        const out = new Array(num);
        for(let i = 0; i< num; i++) out[i] = this.word();
        return out; 
    }

    name(surname){

    }

    word(num = 2, delim = " "){ // returns single random word
        // sections, specialCharFlag, surname
        const output = new Array(num);
        for(let i = 0; i < num; i++) output[i] = this.compileWord();
        return output.join(delim);
    }

    compileWord(syllableCountMean = 1){
        let out = "";
        // randomly start with vowel
        if(this.random.random() < .5) out += this.randVow();
        
        // adding syllables
        let syllableCount = this.random.normRand(2,syllableCountMean);
        syllableCount = syllableCount > 0 ? syllableCount : 1;
        while(syllableCount > 0){
            out += this.syllable()
            syllableCount--;
        }
        // randomly end with consonant
        if(this.random.random() < .5) out += this.randCons();
        // randomly adds special characters
        if(this.specialChars && out.length > 3){
            const index = this.random.random(1, out.length - 1);
            const specialChar = this.random.random(this.specialChars);
            out = out.slice(0,index) + specialChar + out.slice(index);
        }
        // cap
        return this.capFirst(out);
    }

    syllable(){ // returns a single syllable
        const consonant = this.randCons();
        if(consonant === "q") return "qu";
        const vowel = this.randVow();
        let syllable = consonant + vowel;
        // randomly adds double letters
        if(this.random.random() < this.doubleLetterRate){
            const char = this.random.random(syllable);
            syllable = syllable.replace(char, char + char);
        }
        return syllable;
    }

    randCons(){
        return this.random.random(Words.CONSONANTS);
    }

    randVow(){
        return this.random.random(Words.VOWELS);
    }
}

Words.CONSONANTS = "bcdfghjklmnpqrstvwxyz";
Words.VOWELS     = "aeiou";