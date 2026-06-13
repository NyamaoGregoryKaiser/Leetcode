const { isValidParentheses, isValidParenthesesBruteForce } = require('../src/problems/Problem1_ValidParentheses');

console.log('--- Benchmarking Valid Parentheses ---');

// Function to generate a long valid parentheses string
function generateValidString(length) {
    let s = '';
    for (let i = 0; i < length / 2; i++) {
        s += '(';
    }
    for (let i = 0; i < length / 2; i++) {
        s += ')';
    }
    return s;
}

// Function to generate a long invalid parentheses string (worst case for brute force)
function generateWorstCaseInvalidString(length) {
    let s = '';
    for (let i = 0; i < length / 2; i++) {
        s += '(';
    }
    s += ']'; // Make it invalid early, but still long
    for (let i = 0; i < length / 2 - 1; i++) {
        s += ')';
    }
    return s.slice(0, length); // Ensure exact length
}

// Function to generate a moderately complex valid string
function generateComplexValidString(length) {
    let s = '';
    let stack = [];
    const open = ['(', '{', '['];
    const close = [')', '}', ']'];
    const pairs = { '(': ')', '{': '}', '[': ']' };

    for (let i = 0; i < length / 2; i++) {
        const char = open[Math.floor(Math.random() * open.length)];
        s += char;
        stack.push(pairs[char]);
    }
    while (stack.length > 0) {
        s += stack.pop();
    }
    return s;
}

const lengths = [1000, 10000, 50000]; // Test string lengths

lengths.forEach(length => {
    const validString = generateValidString(length);
    const complexValidString = generateComplexValidString(length);
    const worstCaseInvalidString = generateWorstCaseInvalidString(length);

    console.log(`\n--- Testing with string length: ${length} ---`);

    // Optimal (Stack-based) solution
    console.time(`isValidParentheses (Optimal) - Valid, length ${length}`);
    isValidParentheses(validString);
    console.timeEnd(`isValidParentheses (Optimal) - Valid, length ${length}`);

    console.time(`isValidParentheses (Optimal) - Complex Valid, length ${length}`);
    isValidParentheses(complexValidString);
    console.timeEnd(`isValidParentheses (Optimal) - Complex Valid, length ${length}`);

    console.time(`isValidParentheses (Optimal) - Worst Case Invalid, length ${length}`);
    isValidParentheses(worstCaseInvalidString);
    console.timeEnd(`isValidParentheses (Optimal) - Worst Case Invalid, length ${length}`);


    // Brute Force (String Replacement) solution
    // Note: This can be very slow for large N.
    console.time(`isValidParenthesesBruteForce (Brute Force) - Valid, length ${length}`);
    isValidParenthesesBruteForce(validString);
    console.timeEnd(`isValidParenthesesBruteForce (Brute Force) - Valid, length ${length}`);

    console.time(`isValidParenthesesBruteForce (Brute Force) - Complex Valid, length ${length}`);
    isValidParenthesesBruteForce(complexValidString);
    console.timeEnd(`isValidParenthesesBruteForce (Brute Force) - Complex Valid, length ${length}`);

    console.time(`isValidParenthesesBruteForce (Brute Force) - Worst Case Invalid, length ${length}`);
    isValidParenthesesBruteForce(worstCaseInvalidString);
    console.timeEnd(`isValidParenthesesBruteForce (Brute Force) - Worst Case Invalid, length ${length}`);
});

console.log('\n--- Benchmarking Complete ---');