---
title: Gate W
---
flowchart TD
    xs@{ shape: sm-circ }
    ys@{ shape: sm-circ }
    xs -.-> ys
    p1( )
    xs --o p1
    ys --> p1
    p2( )
    p1 --o p2
    ys --> p2
    e@{ shape: framed-circle }
    p2 --> e
