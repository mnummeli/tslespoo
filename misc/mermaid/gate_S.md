---
title: Gate S
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
    ys --o p2
    zs --> p2
    p3( )
    p1 --o p3
    p2 --> p3
    e@{ shape: framed-circle }
    p3 --> e
