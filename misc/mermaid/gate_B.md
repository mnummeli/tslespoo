---
title: Gate B
---
flowchart TD
    xs@{ shape: sm-circ }
    ys@{ shape: sm-circ }
    zs@{ shape: sm-circ }
    xs -.-> ys
    ys -.-> zs
    p1( )
    ys --o p1
    zs --> p1
    p2( )
    xs --o p2
    p1 --> p2
    e@{ shape: framed-circle }
    p2 --> e
