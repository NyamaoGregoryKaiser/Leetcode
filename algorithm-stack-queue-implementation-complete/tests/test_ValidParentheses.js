const assert = require('assert');
const { isValidParentheses, isValidParenthesesBruteForce } = require('../src/problems/Problem1_ValidParentheses');

console.log('--- Running Valid Parentheses Tests ---');

function runTest(name, testFunction) {
    try {
        testFunction();
        console.log(`✅ ${name}`);
    } catch (error) {
        console.error(`❌ ${name}`);
        console.error(error.message);
        process.exit(1); // Exit with error code
    }
}

// Test cases for the optimal stack-based solution
runTest('isValidParentheses: Should return true for valid strings', () => {
    assert.strictEqual(isValidParentheses("()"), true, '"()" should be valid');
    assert.strictEqual(isValidParentheses("()[]{}"), true, '"()[]{}" should be valid');
    assert.strictEqual(isValidParentheses("{[]}"), true, '"{[]}" should be valid');
    assert.strictEqual(isValidParentheses("([{}])"), true, '"([{}])" should be valid');
    assert.strictEqual(isValidParentheses(""), true, 'Empty string should be valid');
    assert.strictEqual(isValidParentheses("{{(())}}"), true, '"{{(())}}" should be valid');
});

runTest('isValidParentheses: Should return false for invalid strings (mismatched types)', () => {
    assert.strictEqual(isValidParentheses("(]"), false, '"(]" should be invalid');
    assert.strictEqual(isValidParentheses("([)]"), false, '"([)]" should be invalid');
    assert.strictEqual(isValidParentheses("{[}]"), false, '"{[}]" should be invalid');
    assert.strictEqual(isValidParentheses("((({)))"), false, '"((({)))" should be invalid');
});

runTest('isValidParentheses: Should return false for invalid strings (unclosed brackets)', () => {
    assert.strictEqual(isValidParentheses("["), false, '"[" should be invalid (unclosed)');
    assert.strictEqual(isValidParentheses("((("), false, '"(((" should be invalid (unclosed)');
    assert.strictEqual(isValidParentheses("{{{"), false, '""{{{" should be invalid (unclosed)');
});

runTest('isValidParentheses: Should return false for invalid strings (unopened brackets)', () => {
    assert.strictEqual(isValidParentheses("]"), false, '"]" should be invalid (unopened)');
    assert.strictEqual(isValidParentheses(")))"), false, '")))" should be invalid (unopened)');
    assert.strictEqual(isValidParentheses("}}}"), false, '"}}}" should be invalid (unopened)');
    assert.strictEqual(isValidParentheses("())"), false, '"())" should be invalid (extra closing)');
});

runTest('isValidParentheses: Should return false for strings with odd length', () => {
    assert.strictEqual(isValidParentheses("({)"), false, 'Odd length string "({)" should be invalid');
    assert.strictEqual(isValidParentheses("([)]}"), false, 'Odd length string "([)]}" should be invalid');
});

// Test cases for the brute-force string replacement solution (for comparison/completeness)
runTest('isValidParenthesesBruteForce: Should return true for valid strings', () => {
    assert.strictEqual(isValidParenthesesBruteForce("()"), true, '"()" should be valid (brute-force)');
    assert.strictEqual(isValidParenthesesBruteForce("()[]{}"), true, '"()[]{}" should be valid (brute-force)');
    assert.strictEqual(isValidParenthesesBruteForce("{[]}"), true, '"{[]}" should be valid (brute-force)');
    assert.strictEqual(isValidParenthesesBruteForce("([{}])"), true, '"([{}])" should be valid (brute-force)');
    assert.strictEqual(isValidParenthesesBruteForce(""), true, 'Empty string should be valid (brute-force)');
});

runTest('isValidParenthesesBruteForce: Should return false for invalid strings', () => {
    assert.strictEqual(isValidParenthesesBruteForce("(]"), false, '"(]" should be invalid (brute-force)');
    assert.strictEqual(isValidParenthesesBruteForce("([)]"), false, '"([)]" should be invalid (brute-force)');
    assert.strictEqual(isValidParenthesesBruteForce("["), false, '"[" should be invalid (brute-force)');
    assert.strictEqual(isValidParenthesesBruteForce("]"), false, '"]" should be invalid (brute-force)');
    assert.strictEqual(isValidParenthesesBruteForce("((("), false, '"(((" should be invalid (brute-force)');
});

console.log('All Valid Parentheses tests passed!');