#!/usr/bin/env python3

from math import sqrt

def T(n):
    return int(n*(n+1)/2)

def invT(p):
    return int((sqrt(1+8*p)-1)/2)

def cons(x,y):
    return T(x+y)+y

def car(p):
    s=invT(p)
    y=p-T(s)
    return s-y

def cdr(p):
    s=invT(p)
    y=p-T(s)
    return y

def to_str(p):
    if p==0:
        return 'P'
    elif p==1:
        return 'Q'
    elif p==2:
        return 'R'
    else:
        p1=p-3
        if p1%2==0:
            p2=p1//2
            if p2<3:
                return '~{}'.format(to_str(p2))
            else:
                return '~({})'.format(to_str(p2))
        else:
            p2=p1//2
            p2l=car(p2)
            p2r=cdr(p2)
            if p2l<3:
                return '{}=>{}'.format(to_str(p2l),to_str(p2r))
            else:
                return '({})=>{}'.format(to_str(p2l),to_str(p2r))

def evaluate(p,v):
    if p==0:
        return v&1!=0
    elif p==1:
        return v&2!=0
    elif p==2:
        return v&4!=0
    else:
        p1=p-3
        if p1%2==0:
            p2=p1//2
            return not evaluate(p2,v)
        else:
            p2=p1//2
            p2l=car(p2)
            p2r=cdr(p2)
            return not evaluate(p2l,v) or evaluate(p2r,v)

def is_tautology(p):
    for i in range(8):
        if not evaluate(p,i):
            return False
    return True

if __name__ == "__main__":
    for i in range(0,100):
        if is_tautology(i):
            print(str(i) + ' ' + to_str(i))
