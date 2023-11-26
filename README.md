# QuadTree

The QuadTree data structure is a hierarchical spatial partitioning method used to efficiently organize and query data in a two-dimensional space. It recursively divides space into quadrants, allowing for faster search and retrieval of points within a defined boundary.

## Overview

This repository contains an implementation of a QuadTree in JavaScript, providing a structure for spatial partitioning and point insertion/retrieval within a given boundary.

## Features

- **Insertion**: Efficiently add points into the QuadTree.
- **Querying**: Retrieve points within a specified range.
- **Spatial Partitioning**: Divide space into quadrants for optimized data organization.

## Usage

To use the QuadTree in your JavaScript project:

1. **Initialization**:
```javascript
const boundary = new Rectangle(x, y, width, height);
const quadTree = new QuadTree(boundary, capacity);
```

2. **Insertion**:
```javascript
const point = new Point(x, y);
quadTree.insert(point);
```

3. **Querying**:
```javascript
const queryBoundary = new Rectangle(x, y, width, height);
const pointsInRange = quadTree.queryRange(queryBoundary);
```

## Example

```javascript
// Initialize a boundary and QuadTree
const boundary = new Boundary(0, 0, 500, 500);
const quadTree = new QuadTree(boundary, 4);

// Insert points into the QuadTree
const points = [
  new Point(100, 100),
  new Point(200, 200),
  // ...more points
];
quadTree.insertPoints(points);

// Query points within a range
const queryBoundary = new Rectangle(50, 50, 100, 100);
const pointsInRange = quadTree.queryRange(queryBoundary);
```