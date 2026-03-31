```cpp
#ifndef DATA_GENERATOR_HPP
#define DATA_GENERATOR_HPP

#include <vector>
#include <random>
#include <algorithm> // For std::shuffle, std::sort
#include <set>       // For unique elements

namespace DataGenerator {

    // Generates a vector of random integers
    std::vector<int> generateRandomVector(int size, int min_val, int max_val) {
        std::vector<int> data(size);
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> distrib(min_val, max_val);

        for (int i = 0; i < size; ++i) {
            data[i] = distrib(gen);
        }
        return data;
    }

    // Generates a vector of random integers with specified number of unique elements
    std::vector<int> generateRandomVectorWithUnique(int size, int num_unique, int min_val, int max_val) {
        if (num_unique > size || num_unique < 0) {
            num_unique = size; // Default to all unique or up to size
        }
        if (num_unique > (max_val - min_val + 1)) {
            num_unique = (max_val - min_val + 1); // Max possible unique values
        }

        std::vector<int> data;
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> distrib(min_val, max_val);

        // Generate unique values first
        std::set<int> unique_values;
        while (unique_values.size() < num_unique) {
            unique_values.insert(distrib(gen));
        }

        // Fill data with unique values
        for (int val : unique_values) {
            data.push_back(val);
        }

        // Fill the rest with random values from the unique set or any within range
        while (data.size() < size) {
            data.push_back(distrib(gen));
        }

        std::shuffle(data.begin(), data.end(), gen); // Shuffle to randomize positions
        return data;
    }


    // Generates K sorted vectors
    std::vector<std::vector<int>> generateKSortedVectors(int num_lists, int list_size_avg, int value_range_max) {
        std::vector<std::vector<int>> k_lists;
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> size_distrib(std::max(1, list_size_avg / 2), list_size_avg * 2);
        std::uniform_int_distribution<> val_distrib(0, value_range_max);

        for (int i = 0; i < num_lists; ++i) {
            int current_list_size = size_distrib(gen);
            std::vector<int> current_list(current_list_size);
            for (int j = 0; j < current_list_size; ++j) {
                current_list[j] = val_distrib(gen);
            }
            std::sort(current_list.begin(), current_list.end());
            k_lists.push_back(current_list);
        }
        return k_lists;
    }

    // Generates a list of sorted linked lists for Merge K Sorted Lists problem
    struct ListNode {
        int val;
        ListNode *next;
        ListNode() : val(0), next(nullptr) {}
        ListNode(int x) : val(x), next(nullptr) {}
        ListNode(int x, ListNode *next) : val(x), next(next) {}
    };

    // Helper to print a linked list (for debugging/verification)
    void printList(ListNode* head) {
        ListNode* current = head;
        while(current) {
            std::cout << current->val << " -> ";
            current = current->next;
        }
        std::cout << "nullptr" << std::endl;
    }

    // Helper to delete a linked list
    void deleteList(ListNode* head) {
        ListNode* current = head;
        while(current) {
            ListNode* next = current->next;
            delete current;
            current = next;
        }
    }

    // Generates a single sorted linked list from a vector
    ListNode* createSortedList(const std::vector<int>& vec) {
        if (vec.empty()) return nullptr;
        ListNode* head = new ListNode(vec[0]);
        ListNode* current = head;
        for (size_t i = 1; i < vec.size(); ++i) {
            current->next = new ListNode(vec[i]);
            current = current->next;
        }
        return head;
    }

    // Generates K sorted linked lists
    std::vector<ListNode*> generateKSortedLists(int num_lists, int list_size_avg, int value_range_max) {
        std::vector<ListNode*> k_lists_nodes;
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> size_distrib(std::max(0, list_size_avg / 2), list_size_avg * 2);
        std::uniform_int_distribution<> val_distrib(0, value_range_max);

        for (int i = 0; i < num_lists; ++i) {
            int current_list_size = size_distrib(gen);
            std::vector<int> current_vec(current_list_size);
            for (int j = 0; j < current_list_size; ++j) {
                current_vec[j] = val_distrib(gen);
            }
            std::sort(current_vec.begin(), current_vec.end());
            k_lists_nodes.push_back(createSortedList(current_vec));
        }
        return k_lists_nodes;
    }

} // namespace DataGenerator

#endif // DATA_GENERATOR_HPP

```