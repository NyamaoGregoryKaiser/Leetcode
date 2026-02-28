import { primeFactorsTrialDivision } from './primeFactors-trial-division';
import { primeFactorsSieve, MAX_SIEVE_LIMIT, resetSieveForTesting } from './primeFactors-sieve';

export const Problem2PrimeFactorization = {
    primeFactorsTrialDivision,
    primeFactorsSieve,
    MAX_SIEVE_LIMIT,
    resetSieveForTesting, // Expose for testing purposes if needed
};

// Re-export specific algorithms for direct import if needed
export { primeFactorsTrialDivision } from './primeFactors-trial-division';
export { primeFactorsSieve } from './primeFactors-sieve';