import { gcdBruteForce } from './gcd-bruteforce';
import { gcdEuclideanRecursive } from './gcd-euclidean-recursive';
import { gcdEuclideanIterative } from './gcd-euclidean-iterative';

export const Problem1GCD = {
    gcdBruteForce,
    gcdEuclideanRecursive,
    gcdEuclideanIterative,
};

// Re-export specific algorithms for direct import if needed
export { gcdBruteForce } from './gcd-bruteforce';
export { gcdEuclideanRecursive } from './gcd-euclidean-recursive';
export { gcdEuclideanIterative } from './gcd-euclidean-iterative';