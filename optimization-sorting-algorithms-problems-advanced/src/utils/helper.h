#ifndef HELPER_H
#define HELPER_H
#include <vector>

void mergeSort(std::vector<int>& arr);
void quickSort(std::vector<int>& arr, int low, int high);
void heapSort(std::vector<int>& arr);
int quickSelect(std::vector<int>& arr, int left, int right, int k);

#endif