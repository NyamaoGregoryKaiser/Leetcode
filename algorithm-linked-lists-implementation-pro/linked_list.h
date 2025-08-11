#ifndef LINKED_LIST_H
#define LINKED_LIST_H

#include <iostream>

struct Node {
    int data;
    Node *next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node *head;
    LinkedList() : head(nullptr) {}
    void append(int val);
    void printList();
    ~LinkedList(); //destructor to prevent memory leaks.
};

#endif