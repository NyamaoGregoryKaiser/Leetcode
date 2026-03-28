sorting-algorithms-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── sorting/
│   │                   ├── algorithms/
│   │                   │   ├── AbstractSorter.java         // Base for all sorters
│   │                   │   ├── BubbleSort.java
│   │                   │   ├── SelectionSort.java
│   │                   │   ├── InsertionSort.java
│   │                   │   ├── MergeSort.java
│   │                   │   ├── QuickSort.java
│   │                   │   ├── HeapSort.java
│   │                   │   ├── CountingSort.java
│   │                   │   └── RadixSort.java
│   │                   ├── problems/
│   │                   │   ├── P1_KthLargestElement.java   // Problem 1
│   │                   │   ├── P2_MergeIntervals.java      // Problem 2
│   │                   │   ├── P3_DutchNationalFlag.java   // Problem 3
│   │                   │   ├── P4_SortByFrequency.java     // Problem 4
│   │                   │   └── P5_FindMissingPositive.java // Problem 5
│   │                   └── utils/
│   │                       ├── ArrayGenerator.java
│   │                       └── Interval.java               // Helper for P2
│   ├── test/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── sorting/
│   │                   ├── algorithms/
│   │                   │   └── SortAlgorithmTest.java
│   │                   │   └── PerformanceBenchmark.java
│   │                   └── problems/
│   │                       ├── P1_KthLargestElementTest.java
│   │                       ├── P2_MergeIntervalsTest.java
│   │                       ├── P3_DutchNationalFlagTest.java
│   │                       ├── P4_SortByFrequencyTest.java
│   │                       └── P5_FindMissingPositiveTest.java
├── docs/
│   ├── README.md                           // Project overview, problem descriptions
│   ├── SortingAlgorithmsExplained.md       // Detailed algorithm explanations
│   ├── InterviewTipsAndVariations.md       // Interview strategies
│   └── diagrams/
│       ├── merge_sort_diagram.txt
│       ├── quick_sort_diagram.txt
│       └── heap_sort_diagram.txt
└── pom.xml                                 // Maven project file