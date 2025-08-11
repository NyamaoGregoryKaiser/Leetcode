#include "linked_list.h"

void LinkedList::append(int val) {
    Node *newNode = new Node(val);
    if (head == nullptr) {
        head = newNode;
        return;
    }
    Node *temp = head;
    while (temp->next != nullptr) {
        temp = temp->next;
    }
    temp->next = newNode;
}

void LinkedList::printList() {
    Node *temp = head;
    while (temp != nullptr) {
        std::cout << temp->data << " ";
        temp = temp->next;
    }
    std::cout << std::endl;
}

LinkedList::~LinkedList(){
    Node* current = head;
    while(current != nullptr){
        Node* next = current->next;
        delete current;
        current = next;
    }
}