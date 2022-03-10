#!/usr/bin/env python3

from math import sqrt
from sys import argv

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

def create_neg(p):
    return 2*p+3

def create_impl(p,q):
    return 2*cons(p,q)+4

def to_str(p):
    if p==0:
        return 'P'
    elif p==1:
        return 'Q'
    elif p==2:
        return 'R'
    else:
        p1=p-3
        p2=p1//2
        if p1%2==0:
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
        p2=p1//2
        if p1%2==0:
            return not evaluate(p2,v)
        else:
            p2l=car(p2)
            p2r=cdr(p2)
            return not evaluate(p2l,v) or evaluate(p2r,v)

def has_double_negation(p):
    if p<3:
        return False
    else:
        p1=p-3
        p2=p1//2
        if p1%2==0:
            if (p2-3)%2==0:
                return True
            else:
                return has_double_negation(p2)
        else:
            p2l=car(p2)
            p2r=cdr(p2)
            return has_double_negation(p2l) or has_double_negation(p2r)

def is_tautology(p):
    for i in range(8):
        if not evaluate(p,i):
            return False
    return True

# Axioms of propositional logic
# AI:       4 P=>P
# AK:      58 P=>Q>=P *
# MT:    8358 (P=>Q)=>(~Q)=>~P *
# MP:    9508 P=>(P=>Q)=>Q +
# AW:   10120 (P=>P=>Q)=>P=>Q
# AC:  542980 (P=>Q=>R)=>Q=>P=>R
# AB:  742168 (P=>Q)=>(R=>P)=>R=>Q
# AS: 1006086 (P=>Q=>R)=>(P=>Q)=>P=>R *

if __name__ == "__main__":
    if len(argv)<2:
        n=100
    else:
        n=int(argv[1])
    for i in range(n):
        if not has_double_negation(i) and is_tautology(i):
            print(str(i) + ' ' + to_str(i))
