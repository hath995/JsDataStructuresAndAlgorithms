// you can write to stdout for debugging purposes, e.g.
// printf("this is a debug message\n");
#include "stdio.h"
#include "string.h"
#include "math.h"
#include "stdlib.h"

int min(int a, int b) {
  if(a<b) {
    return a;
  }else{
    return b;
  }
}

void merge(int* src, int i, int j, int* dst, int p, int n) {
  int x = pow(2,p);
  int xbound = pow(2,p);
  int y = min(pow(2,p),n-j);
  int ybound = min(pow(2,p),n-j);

  if(j>=n) {
    memcpy(dst+i, src+i, (n-i)*sizeof(int));
  }else{
    while(x+y > 0) {
      //printf("x=%d y=%d\n",x, y);
        int xindex = xbound-x;
        int yindex = ybound-y;
      if(x  == 0) {
        dst[i+xbound+yindex] = src[j+yindex];
        y -= 1;
      }else if(y == 0) {
        dst[i+ybound+xindex] = src[i+xindex];
        x -= 1;
      }else if(src[i+xindex] < src[j+yindex]) {
        dst[i+xindex+yindex] = src[i+xindex];
        x -= 1;
      }else {
        dst[i+xindex+yindex] = src[j+yindex];
        y -= 1;
      }
    }
  }
}

void merge_sort(int*a, int n) {
  int* next = malloc(n*sizeof(int));
  int* origA = a;
  int p = 0;
  int *temp;
  while(pow(2, p) < n) {
    for(int i = 0; i < n; i += pow(2,p+1)) {
      int j = i + pow(2, p);
      //printf("i=%d j=%d, p=%d \n",i, j, p);
        merge(a, i, j, next, p, n);
      //print_arr(a,10);
      //print_arr(next,10);
    }
    temp = a;
    a = next;
    next = temp;
    p += 1;
  }
  memcpy(origA, a, n*sizeof(int));

}

void print_arr(int* arr, int n) {
  for(int i = 0; i < n; i++) {
    printf("%d ",arr[i]);
  }
  printf("\n");
}

int is_triangle(int*A, int i) {
    if(A[i+2]-A[i+1] < A[i]) {
        return 1;   
    }
    return 0;
}

int solution(int A[], int N) {
    // write your code in C99
    merge_sort(A, N);
    for(int i = 0; i< N-2; i++) {
        if(is_triangle(A, i)) {
            return 1;   
        }
    }
    return 0;
}