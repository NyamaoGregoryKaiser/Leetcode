/**
 * @file Implements the solution for the Evaluate Reverse Polish Notation problem.
 * @module problems/evalRPN
 */

const Stack = require('../../data-structures/Stack');

/**
 * Evaluates an arithmetic expression given in Reverse Polish Notation (RPN).
 * RPN (also known as postfix notation) is a mathematical notation where every operator
 * follows all of its operands.
 *
 * The algorithm uses a stack to store operands.
 * When a number is encountered, it's pushed onto the stack.
 * When an operator is encountered, the top two operands are popped from the stack,
 * the operation is performed, and the result is pushed back onto the stack.
 *
 * Supported operators: `+`, `-`, `*`, `/`.
 * Division between two integers should truncate toward zero.
 *
 * @param {string[]} tokens An array of strings representing the RPN expression.
 * @returns {number} The integer result of the expression.
 *
 * @example
 * evalRPN(["2", "1", "+", "3", "*"]); // ((2 + 1) * 3) = 9
 * evalRPN(["4", "13", "5", "/", "+"]); // (4 + (13 / 5)) = 4 + 2 = 6
 * evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]);
 * // ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
 * // ((10 * (6 / (12 * -11))) + 17) + 5
 * // ((10 * (6 / -132)) + 17) + 5
 * // ((10 * 0) + 17) + 5  (integer division 6/-132 truncates to 0)
 * // (0 + 17) + 5 = 22
 * evalRPN(["1"]); // 1
 */
function evalRPN(tokens) {
    if (!tokens || tokens.length === 0) {
        throw new Error("Input array of tokens cannot be empty.");
    }

    const stack = new Stack();

    // Set of valid operators for quick lookup.
    const operators = new Set(['+', '-', '*', '/']);

    for (const token of tokens) {
        // If the token is an operator
        if (operators.has(token)) {
            // An operator requires two operands. If stack has less than 2, it's an invalid expression.
            if (stack.size() < 2) {
                throw new Error("Invalid RPN expression: Not enough operands for operator.");
            }
            // Pop the two topmost operands. Note: order matters for subtraction and division.
            // operand2 is popped first (it was pushed second), operand1 is popped second (it was pushed first).
            const operand2 = stack.pop();
            const operand1 = stack.pop();

            let result;
            switch (token) {
                case '+':
                    result = operand1 + operand2;
                    break;
                case '-':
                    result = operand1 - operand2;
                    break;
                case '*':
                    result = operand1 * operand2;
                    break;
                case '/':
                    // Division truncates toward zero.
                    // Math.trunc() handles both positive and negative numbers correctly.
                    result = Math.trunc(operand1 / operand2);
                    break;
                default:
                    // This case should ideally not be reached if `operators` set is exhaustive.
                    throw new Error(`Unknown operator: ${token}`);
            }
            // Push the result back onto the stack.
            stack.push(result);
        }
        // If the token is a number (operand)
        else {
            // Convert the string token to an integer and push it onto the stack.
            // Using `Number()` or `parseInt()` is fine. `+token` is a concise way to convert to number.
            stack.push(Number(token));
        }
    }

    // After processing all tokens, the stack should contain exactly one element,
    // which is the final result of the expression.
    if (stack.size() !== 1) {
        throw new Error("Invalid RPN expression: Too many operands or operators remaining.");
    }

    return stack.pop();
}

/**
 * Time Complexity Analysis:
 * O(N), where N is the number of tokens in the input array.
 * We iterate through the `tokens` array once. Each operation (push, pop, arithmetic calculation,
 * set lookup) takes O(1) time.
 *
 * Space Complexity Analysis:
 * O(N), in the worst case, if all tokens are numbers before any operators appear
 * (e.g., ["1", "2", "3", "4", "5", "+", "*", "-", "/"]), the stack could store up to N/2 + 1 numbers.
 * In the best case (e.g., ["1", "2", "+"]), the stack size remains small.
 */

module.exports = evalRPN;