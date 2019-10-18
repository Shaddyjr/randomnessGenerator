export default class Random{
    constructor(){
        this.randFunc = Math.random;
    }

    setSeed(seed){
        this.numberGuard(seed);
        // taken from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
        this.randFunc = function () {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        }
    }
    
    numberGuard(num){
        if (num != undefined && typeof num != "number") throw new TypeError;
    }

    objectGuard(obj){
        if (typeof obj !== "object") throw new TypeError;
    }

    /**
     * Responsible for main pseudo-randomization functionality.
     * With no arguments, returns decimal between 0 (inclusive) and 1 (exclusive).
     * If given 1 array argument, returns a random element from the array.
     * If given 1 number argument, returns a random integer between 0 (inclusive) and the given number (exclusive).
     * If given 2 number arguments, returns a random integer between min (inclusive) and the max number (exclusive).
     * 
     * @param {*} min 
     * @param {Number} max 
     */
    random(min, max) {
        const randNum = this.randFunc();
        let result = randNum;
        if (Array.isArray(min) || typeof min === "string") {
            result = min[Math.floor(randNum * min.length)];
        } else if (max) {
            result = Math.floor(randNum * (max - min)) + min;
        } else if (min) {
            result = Math.floor(randNum * min);
        }
        return result;
    }

/**
     * Generates a pseudo-random number based on a normal distrubution.
     * If given no argument, will return a decimal with a std of 1 and a mean of 0.
     * If given 1 number argument, will return an integer with a std of the given number and a mean of 0.
     * If given 2 number arguments, will return a decimal with a std of the frst given number and a mean of second given number.
     * 
     * @param {Number} std standard deviation of population
     * @param {Number} mean mean of population
     */
    normRand(std, mean){
        this.numberGuard(std);
        this.numberGuard(mean);

        std = std || 1;
        mean = mean || 0;
        let u, v, val;
        u = 1 - this.random();
        v = 1 - this.random();
        val = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        if(std === 1 && mean === 0) return val * std + mean;
        return Math.round(val * std + mean);
    }

    /**
     * Returns a key from input object based on that key's value (counts or probabilities).
     * 
     * @param {Object} obj object with categorical keys and values representing counts or probabilities
     */
    randProb(inputObj) {
        this.objectGuard(inputObj);
        // const obj = {...inputObj}; // babel
        const obj = inputObj; // shallow clone
        let sum = 0;
        for(const val of Object.values(obj)){
            this.numberGuard(val);
            if(val < 0) throw RangeError(`Probability values cannot be negative`);
            sum += val;
        }
        if(sum === 0) throw RangeError(`Probabilities cannot all be zero`);
        if(sum != 1){ // convert to probabilities
            for(const key in obj) obj[key] /= sum;
        }

        const pick = this.random();
        let total = 0;
        for(const [key,val] of Object.entries(obj)) {
            total += val;
            if (pick <= total) return key;
        }
        return null;
    }
}