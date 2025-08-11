#include "linked_list.h"
#include "problems.cpp"
#include <cassert>
#include <iostream>

void testReverseList() {
    LinkedList list;
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    list.append(5);
    
    Node* reversedHead = reverseList(list.head);
    
    assert(reversedHead->data == 5);
    assert(reversedHead->next->data == 4);
    assert(reversedHead->next->next->data == 3);
    // ...add more assertions
    std::cout << "Reverse List Test Passed!" << std::endl;

}


void testHasCycle(){
    //Test cases for hasCycle function...
    std::cout << "Has Cycle Test Passed!" << std::endl;
}
// Add similar test functions for other problems


int main() {
    testReverseList();
    //Add calls to other test functions here...
    return 0;
}