#!/usr/bin/env python3

from sys import argv

def A(m,n):

    right = [m]
    result = n
    i = 0

    while True:
        if len(right) == 0:
            break

        if right[i] > 0 and result > 0:
            right.append(right[i])
            right[i] -= 1
            result -= 1
            i += 1

        elif right[i] > 0 and result == 0:
            right[i] -= 1
            result = 1

        elif right[i] == 0:
            result += 1
            right.pop()
            i -=1

    return result

if __name__ == "__main__":
    print(A(int(argv[1]),int(argv[2])))
