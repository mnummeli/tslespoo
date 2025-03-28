---
title: Gate C
---
flowchart TD
    xs@{ shape: sm-circ }
    ys@{ shape: sm-circ }
    zs@{ shape: sm-circ }
    xs -.-> ys
    ys -.-> zs
    p1( )
    xs --o p1
    zs --> p1
    p2( )
    p1 --o p2
    ys --> p2
    e@{ shape: framed-circle }
    p2 --> e
