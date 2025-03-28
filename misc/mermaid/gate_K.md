---
title: Gate K
---
flowchart TD
    subgraph one
    xs@{ shape: sm-circ }
    subgraph two
    ys@{ shape: sm-circ }
    ye@{ shape: framed-circle }
    xs --> ye
    end
    xe@{ shape: framed-circle }
    ye --> xe
    end
