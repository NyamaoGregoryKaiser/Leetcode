#include "gtest/gtest.h" // You'll need to install gtest
#include "hash_table.h" // Include your hash table header


TEST(HashTableTest, InsertAndGet) {
    HashTable<int, int> ht(10);
    ht.insert(1, 10);
    EXPECT_EQ(ht.get(1), 10);
}


// Add more test cases for each problem and the hash table itself...


int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}