```typescript
/**
 * src/index.ts
 *
 * Main entry point for the project.
 * Exports all algorithms and utilities.
 * Can also be used to run a simple demo or example.
 */

import { logger, LogLevel } from '@utils/logger';
import { PerformanceTimer } from '@utils/performanceTimer';

// Export all algorithms
export * from './algorithms';

// Export all utilities
export * from './utils';

// Example usage if this file is run directly
if (require.main === module) {
  logger.setLevel(LogLevel.INFO); // Set logger level for examples

  logger.info("String Manipulation Project Examples:");
  logger.info("------------------------------------");

  // --- Longest Palindromic Substring ---
  logger.info("\n--- Longest Palindromic Substring ---");
  const s1 = "babad";
  const s2 = "cbbd";
  const s3 = "forgeeksskeegfor";
  const s4 = "a";
  const s5 = "";

  const { longestPalindromeExpandAroundCenter, longestPalindromeDP } = require('./algorithms/longestPalindromicSubstring');
  const timer = new PerformanceTimer();

  timer.start();
  const res1_expand = longestPalindromeExpandAroundCenter(s1);
  timer.stop();
  logger.info(`LPS (ExpandAroundCenter) for "${s1}": "${res1_expand}" (Took ${timer.stop().toFixed(2)} ms)`);

  timer.start();
  const res1_dp = longestPalindromeDP(s1);
  timer.stop();
  logger.info(`LPS (DP) for "${s1}": "${res1_dp}" (Took ${timer.stop().toFixed(2)} ms)`);

  logger.info(`LPS for "${s2}": "${longestPalindromeExpandAroundCenter(s2)}"`);
  logger.info(`LPS for "${s3}": "${longestPalindromeExpandAroundCenter(s3)}"`);
  logger.info(`LPS for "${s4}": "${longestPalindromeExpandAroundCenter(s4)}"`);
  logger.info(`LPS for "${s5}": "${longestPalindromeExpandAroundCenter(s5)}"`);


  // --- Group Anagrams ---
  logger.info("\n--- Group Anagrams ---");
  const strs1 = ["eat","tea","tan","ate","nat","bat"];
  const strs2 = [""];
  const strs3 = ["a"];

  const { groupAnagramsSortKey, groupAnagramsCountKey } = require('./algorithms/groupAnagrams');

  timer.start();
  const res_anagrams_sort = groupAnagramsSortKey(strs1);
  timer.stop();
  logger.info(`Group Anagrams (Sort Key) for [${strs1.join(', ')}]: ${JSON.stringify(res_anagrams_sort)} (Took ${timer.stop().toFixed(2)} ms)`);

  timer.start();
  const res_anagrams_count = groupAnagramsCountKey(strs1);
  timer.stop();
  logger.info(`Group Anagrams (Count Key) for [${strs1.join(', ')}]: ${JSON.stringify(res_anagrams_count)} (Took ${timer.stop().toFixed(2)} ms)`);

  logger.info(`Group Anagrams for [${strs2.join(', ')}]: ${JSON.stringify(groupAnagramsCountKey(strs2))}`);
  logger.info(`Group Anagrams for [${strs3.join(', ')}]: ${JSON.stringify(groupAnagramsCountKey(strs3))}`);


  // --- Minimum Window Substring ---
  logger.info("\n--- Minimum Window Substring ---");
  const mw_s1 = "ADOBECODEBANC", mw_t1 = "ABC"; // Expected: "BANC"
  const mw_s2 = "a", mw_t2 = "a";             // Expected: "a"
  const mw_s3 = "a", mw_t3 = "aa";            // Expected: ""
  const mw_s4 = "cabwefgewcwaefgcf", mw_t4 = "cae"; // Expected: "caw"

  const { minWindow } = require('./algorithms/minWindowSubstring');

  logger.info(`Min Window for s="${mw_s1}", t="${mw_t1}": "${minWindow(mw_s1, mw_t1)}"`);
  logger.info(`Min Window for s="${mw_s2}", t="${mw_t2}": "${minWindow(mw_s2, mw_t2)}"`);
  logger.info(`Min Window for s="${mw_s3}", t="${mw_t3}": "${minWindow(mw_s3, mw_t3)}"`);
  logger.info(`Min Window for s="${mw_s4}", t="${mw_t4}": "${minWindow(mw_s4, mw_t4)}"`);


  // --- String to Integer (atoi) ---
  logger.info("\n--- String to Integer (atoi) ---");
  const atoi_s1 = "42";                 // Expected: 42
  const atoi_s2 = "   -42";             // Expected: -42
  const atoi_s3 = "4193 with words";    // Expected: 4193
  const atoi_s4 = "words and 987";      // Expected: 0
  const atoi_s5 = "-91283472332";       // Expected: -2147483648 (MIN_INT)
  const atoi_s6 = "2147483647";         // Expected: 2147483647 (MAX_INT)
  const atoi_s7 = "2147483648";         // Expected: 2147483647 (MAX_INT clamped)
  const atoi_s8 = "-2147483648";        // Expected: -2147483648 (MIN_INT)
  const atoi_s9 = "-2147483649";        // Expected: -2147483648 (MIN_INT clamped)
  const atoi_s10 = "+-12";              // Expected: 0
  const atoi_s11 = "  -0012a42";        // Expected: -12
  const atoi_s12 = "  +0012a42";        // Expected: 12
  const atoi_s13 = " ";                 // Expected: 0
  const atoi_s14 = "  -";               // Expected: 0
  const atoi_s15 = "  +";               // Expected: 0

  const { myAtoi } = require('./algorithms/myAtoi');

  logger.info(`myAtoi for "${atoi_s1}": ${myAtoi(atoi_s1)}`);
  logger.info(`myAtoi for "${atoi_s2}": ${myAtoi(atoi_s2)}`);
  logger.info(`myAtoi for "${atoi_s3}": ${myAtoi(atoi_s3)}`);
  logger.info(`myAtoi for "${atoi_s4}": ${myAtoi(atoi_s4)}`);
  logger.info(`myAtoi for "${atoi_s5}": ${myAtoi(atoi_s5)}`);
  logger.info(`myAtoi for "${atoi_s6}": ${myAtoi(atoi_s6)}`);
  logger.info(`myAtoi for "${atoi_s7}": ${myAtoi(atoi_s7)}`);
  logger.info(`myAtoi for "${atoi_s8}": ${myAtoi(atoi_s8)}`);
  logger.info(`myAtoi for "${atoi_s9}": ${myAtoi(atoi_s9)}`);
  logger.info(`myAtoi for "${atoi_s10}": ${myAtoi(atoi_s10)}`);
  logger.info(`myAtoi for "${atoi_s11}": ${myAtoi(atoi_s11)}`);
  logger.info(`myAtoi for "${atoi_s12}": ${myAtoi(atoi_s12)}`);
  logger.info(`myAtoi for "${atoi_s13}": ${myAtoi(atoi_s13)}`);
  logger.info(`myAtoi for "${atoi_s14}": ${myAtoi(atoi_s14)}`);
  logger.info(`myAtoi for "${atoi_s15}": ${myAtoi(atoi_s15)}`);
}
```