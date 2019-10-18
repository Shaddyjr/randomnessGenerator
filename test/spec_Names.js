import Words from './../src/generateRandom/lib/words';
import { expect } from "chai";

describe('words', function() {
    let words;
    beforeEach(function(){
        words = new Words;
    })
    describe('.capFirst()', function() {
        it('should return a string with first letter capitalized and rest lowercase', function() {
            const result1 = words.capFirst("abcd");
            expect(result1).to.equal("Abcd");
            const result2 = words.capFirst("ABCD");
            expect(result2).to.equal("Abcd");
        });
         
        it('should throw a TypeError when not given a string', function() {
            expect(()=>words.capFirst(42)).to.throw(TypeError);
        }); 
    });
    describe('.word()', function() {
        it('should return a string', function() {
            const word = words.word();
            expect(word).to.be.a("string");   
        }); 
        it('should return multiple words separated by spaces when given a number great than 1 as first argument', function() {
            const word = words.word(3);
            const split = word.split(" ");
            expect(split).to.have.lengthOf(3);
        });
        it('should return multiple words separated by given second argument delimiter', function() {
            const word = words.word(3, "*");
            const split = word.split("*");
            expect(split).to.have.lengthOf(3);
        });
        it('should throw a TypeError when not given a number as first argument', function() {
            expect(()=>words.word("a")).to.throw(TypeError);
        }); 
        it('should throw a TypeError when not given a string as second argument', function() {
            expect(()=>words.word(1,1)).to.throw(TypeError);
        });
    });
    xdescribe('.word()', function() {
        xit('should', function() {
            
        }); 
    });
    xdescribe('.word()', function() {
        xit('should', function() {
            
        }); 
    });
    
});