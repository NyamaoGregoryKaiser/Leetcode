```cpp
#include <benchmark/benchmark.h>
#include "../src/algorithms.h" // Include algorithms.h from parent directory's src folder
#include <string>
#include <vector>
#include <random>
#include <algorithm> // For std::shuffle

// Helper to generate a random string of given length and character set
std::string generate_random_string(int length, const std::string& char_set) {
    std::string s(length, ' ');
    std::random_device rd;
    std::mt19937 generator(rd());
    std::uniform_int_distribution<> distribution(0, char_set.size() - 1);
    for (int i = 0; i < length; ++i) {
        s[i] = char_set[distribution(generator)];
    }
    return s;
}

// =========================================================================
// Benchmarks for Longest Palindromic Substring
// =========================================================================

static void BM_LongestPalindrome_ExpandAroundCenter(benchmark::State& state) {
    std::string s = generate_random_string(state.range(0), "abcdefghijklmnopqrstuvwxyz");
    for (auto _ : state) {
        benchmark::DoNotOptimize(StringAlgorithms::longestPalindromeExpandAroundCenter(s));
    }
}
// Register with increasing string lengths.
BENCHMARK(BM_LongestPalindrome_ExpandAroundCenter)->RangeMultiplier(2)->Range(8, 8 << 10); // 8 to 8192

static void BM_LongestPalindrome_DP(benchmark::State& state) {
    std::string s = generate_random_string(state.range(0), "abcdefghijklmnopqrstuvwxyz");
    for (auto _ : state) {
        benchmark::DoNotOptimize(StringAlgorithms::longestPalindromeDP(s));
    }
}
BENCHMARK(BM_LongestPalindrome_DP)->RangeMultiplier(2)->Range(8, 8 << 10); // 8 to 8192

// Comparison for small string lengths where O(N^2) might not show significant differences
static void BM_LongestPalindrome_Comparison_Small(benchmark::State& state) {
    std::string s = "bananas"; // A fixed, small string
    for (auto _ : state) {
        StringAlgorithms::longestPalindromeExpandAroundCenter(s);
        StringAlgorithms::longestPalindromeDP(s);
    }
}
// BENCHMARK(BM_LongestPalindrome_Comparison_Small);


// =========================================================================
// Benchmarks for Minimum Window Substring
// =========================================================================

static void BM_MinWindowSubstring(benchmark::State& state) {
    // S length, T length
    int s_len = state.range(0);
    int t_len = state.range(1);

    std::string s = generate_random_string(s_len, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    std::string t = generate_random_string(t_len, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"); // T usually has fewer chars than S, specific chars
    
    // Ensure T is constructible from S (at least some chance)
    if (t_len > s_len) {
        t = s.substr(0, s_len); // Adjust t to be within s length
    }
    
    // For realistic benchmark, ensure t actually appears in s
    std::random_device rd;
    std::mt19937 g(rd());
    std::uniform_int_distribution<> dist(0, s_len - t_len);
    if (s_len >= t_len) {
        int start_idx = dist(g);
        for(int i=0; i<t_len; ++i) {
            s[start_idx + i] = t[i]; // Embed T in S
        }
    }


    for (auto _ : state) {
        benchmark::DoNotOptimize(StringAlgorithms::minWindowSubstring(s, t));
    }
}
// (S_LENGTH, T_LENGTH)
// Test with various S lengths and T lengths relative to S
BENCHMARK(BM_MinWindowSubstring)->Args({100, 10})->Args({1000, 50})->Args({10000, 100})->Args({100000, 200});


// =========================================================================
// Benchmarks for String to Integer (atoi)
// =========================================================================

static void BM_MyAtoi(benchmark::State& state) {
    std::string s_val;
    switch (state.range(0)) {
        case 0: s_val = "   -42"; break;
        case 1: s_val = "2147483647"; break; // INT_MAX
        case 2: s_val = "-2147483648"; break; // INT_MIN
        case 3: s_val = "2147483648"; break; // Overflow positive
        case 4: s_val = "-91283472332"; break; // Overflow negative
        case 5: s_val = "123456789012345678901234567890"; break; // Very long, very positive
        case 6: s_val = "-123456789012345678901234567890"; break; // Very long, very negative
        case 7: s_val = "   +00000000000000000000000000000123456789 with words and more stuff"; break;
        default: s_val = "42"; break;
    }
    for (auto _ : state) {
        benchmark::DoNotOptimize(StringAlgorithms::myAtoi(s_val));
    }
}
// Test with a few representative strings (small, max/min, overflow, long)
BENCHMARK(BM_MyAtoi)->DenseRange(0, 7);


// =========================================================================
// Benchmarks for Group Anagrams
// =========================================================================

// Generator for a vector of strings
std::vector<std::string> generate_string_vector(int num_strings, int string_len) {
    std::vector<std::string> strs;
    std::string char_set = "abcdefghijklmnopqrstuvwxyz";
    std::random_device rd;
    std::mt19937 generator(rd());

    for (int i = 0; i < num_strings; ++i) {
        std::string s = generate_random_string(string_len, char_set);
        strs.push_back(s);

        // Add some anagrams to make the grouping non-trivial
        if (i % 5 == 0 && string_len > 0) { // Every 5th string, make an anagram
            std::shuffle(s.begin(), s.end(), generator);
            strs.push_back(s);
        }
    }
    return strs;
}


static void BM_GroupAnagrams_SortedString(benchmark::State& state) {
    // num_strings, string_len
    std::vector<std::string> strs = generate_string_vector(state.range(0), state.range(1));
    for (auto _ : state) {
        benchmark::DoNotOptimize(StringAlgorithms::groupAnagramsSortedString(strs));
    }
}
// (NUM_STRINGS, STRING_LENGTH)
BENCHMARK(BM_GroupAnagrams_SortedString)->Args({100, 5})->Args({1000, 10})->Args({10000, 15})->Args({1000, 50});


static void BM_GroupAnagrams_FrequencyArray(benchmark::State& state) {
    // num_strings, string_len
    std::vector<std::string> strs = generate_string_vector(state.range(0), state.range(1));
    for (auto _ : state) {
        benchmark::DoNotOptimize(StringAlgorithms::groupAnagramsFrequencyArray(strs));
    }
}
// (NUM_STRINGS, STRING_LENGTH)
BENCHMARK(BM_GroupAnagrams_FrequencyArray)->Args({100, 5})->Args({1000, 10})->Args({10000, 15})->Args({1000, 50});

BENCHMARK_MAIN();
```