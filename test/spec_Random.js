import Random from './../src/generateRandom/lib/random';
import { expect } from "chai";

describe('Random', function() {
    let random;
    beforeEach(function(){
        random = new Random;
    })

    describe('.setSeed()', function() {
        it('should throw TypeError if not a number', function() {
            expect(()=>random.setSeed("A")).to.throw(TypeError);
        });
        it('should cause .randFunc() to return same number', function() {
            const seed = 123;
            const r1 = new Random();
            r1.setSeed(seed);
            const r2 = new Random();
            r2.setSeed(seed);
            expect(r1.randFunc()).to.equal(r2.randFunc());
        });
    });
    describe(".random()",function(){
        it("should return a number between 0 and 1(exclusive) by default",function(){
            const result = random.random();
            expect(result).to.be.within(0, 1);
        });
        it("should return a number between 0 and 1(exclusive) when given single number argument",function(){
            const num = 5;
            const result = random.random(num);
            expect(result).to.be.within(0, num);
        });
        it("should return a number between 2 given numbers when given two number arguments",function(){
            const num1 = -5;
            const num2 = -2;
            const result = random.random(num1, num2);
            expect(result).to.be.within(num1, num2);
        });
        it("should return an item from given array if given an array",function(){
            const item = {};
            const arr = [item];
            expect(random.random(arr)).to.equal(item);
        });
        it("should return a char from given string if given a sting",function(){
            expect(random.random("a")).to.equal("a");
        });
    });
    describe(".randProb()",function(){
        it("should throw a TypeError if not given an object",function(){
            expect(()=>random.randProb("A")).to.throw(TypeError);
        });
        it("should throw a RangeError if given a negative number",function(){
            expect(()=>random.randProb({"a":-1})).to.throw(RangeError);
        });
        it("should throw a RangeError if given numbers with a zero sum",function(){
            expect(()=>random.randProb({"a":0})).to.throw(RangeError);
        });
        it("should return a key from given object in correct proportion",function(){
            const probs = {"A":1,"B":0,"C":0};
            expect(random.randProb(probs)).to.equal("A");
        });
        it("should return a key from given object in correct proportion with given count",function(){
            const probs = {"A":42,"B":0,"C":0};
            expect(random.randProb(probs)).to.equal("A");
        });
    });
});