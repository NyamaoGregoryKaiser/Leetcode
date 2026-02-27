binary-search-project/
├── src/
│   ├── problems/
│   │   ├── binarySearch.js           // Standard BS, First/Last Occurrence
│   │   ├── searchRotatedArray.js     // Search in Rotated Sorted Array
│   │   ├── findPeakElement.js        // Find Peak Element
│   │   ├── sqrtX.js                  // Sqrt(x) using Binary Search
│   │   └── index.js                  // Exports all problem solutions
│   ├── utils/
│   │   ├── logger.js                 // Custom logging utility
│   │   └── arrayUtils.js             // Helper utilities for arrays
│   └── index.js                      // Main exports from src
├── test/
│   ├── testRunner.js                 // Custom test execution framework
│   ├── testBinarySearch.js           // Tests for binarySearch.js
│   ├── testRotatedArray.js           // Tests for searchRotatedArray.js
│   ├── testFindPeakElement.js        // Tests for findPeakElement.js
│   ├── testSqrtX.js                  // Tests for sqrtX.js
│   └── allTests.js                   // Orchestrates all test files
├── docs/
│   ├── README.md                     // Project overview (this file)
│   ├── binarySearchAlgorithm.md      // Detailed explanation of Binary Search
│   └── interviewTips.md              // Interview guidance and common variations
├── benchmark/
│   └── benchmark.js                  // Performance comparison script
└── package.json                      // Project metadata and scripts