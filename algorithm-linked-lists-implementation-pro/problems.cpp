#include "linked_list.h"
#include <algorithm> //for reverse function

// Problem 1: Reverse Linked List
Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    Node* next = nullptr;
    while (curr != nullptr) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev; //Time: O(n), Space: O(1)
}


// Problem 2: Detect Cycle (Floyd's Tortoise and Hare)
bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false; //Time: O(n), Space: O(1)
}


// Problem 3: Merge Two Sorted Lists
Node* mergeTwoLists(Node* l1, Node* l2) {
    Node* dummy = new Node(0); //dummy node for easier merging
    Node* tail = dummy;
    while (l1 != nullptr && l2 != nullptr) {
        if (l1->data <= l2->data) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = (l1 != nullptr) ? l1 : l2;
    Node* result = dummy->next;
    delete dummy; //Clean up the dummy node.
    return result; //Time: O(m+n), Space: O(1)
}


// Problem 4: Remove Nth Node From End
void removeNthFromEnd(Node** head, int n) {
    Node* first = *head;
    Node* second = *head;
    for (int i = 0; i < n; i++) {
        if (first == nullptr) return; //Handle edge case where n > list length.
        first = first->next;
    }
    if (first == nullptr) { //If n is equal to the length of the list, remove the head
        *head = (*head)->next;
        return;
    }

    while (first->next != nullptr) {
        first = first->next;
        second = second->next;
    }
    second->next = second->next->next; //Time: O(n), Space:O(1)
}



// Problem 5: Palindrome Linked List
bool isPalindrome(Node* head) {
    if(head == nullptr || head->next == nullptr) return true; //base cases for empty or single-node lists

    //Find the middle of the list using slow and fast pointers.
    Node* slow = head;
    Node* fast = head;
    while(fast != nullptr && fast->next != nullptr){
        slow = slow->next;
        fast = fast->next->next;
    }

    //Reverse the second half of the list.
    Node* secondHalf = reverseList(slow);

    //Compare the first and reversed second halves.
    Node* firstHalf = head;
    while(secondHalf != nullptr){
        if(firstHalf->data != secondHalf->data) return false;
        firstHalf = firstHalf->next;
        secondHalf = secondHalf->next;
    }
    return true; //Time: O(n), Space: O(1)
}