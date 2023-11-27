/**
 * Represents a QuadTree used for spatial partitioning.
 * @class QuadTree
 */
class QuadTree {
  /**
   * Creates a QuadTree object with a given boundary and capacity.
   * @constructor
   * @param {Boundary} boundary - The boundary of the QuadTree.
   * @param {number} [capacity=10] - The maximum capacity of points in a node.
   */
  constructor(boundary, capacity) {
    this.capacity = capacity || 10;
    // Set node boundary
    this.boundary = boundary;
    // Children nodes
    this.children = [];
    // Points in the node
    this.points = [];
  }

  /**
   * Inserts a point into the QuadTree.
   * @method QuadTree#insert
   * @param {Point} point - The point to insert into the QuadTree.
   * @returns {boolean} - Returns true if successfully inserted, false otherwise.
   */
  insert(point) {
    // Check if point is within boundary
    if (!this.boundary.containsPoint(point)) {
      return false;
    }

    // Check if node has capacity
    if (this.points.length < this.capacity && this.children.length === 0) {
      this.points.push(point);
      return true;
    }

    // Subdivide node if no children
    if (this.children.length === 0) {
      this.subdivide();
    }

    // Recursively call `insert`
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.insert(point)) {
        return true;
      }
    }
  }

  /**
   * Inserts multiple points into the QuadTree.
   * @method QuadTree#insertPoints
   * @param {Point[]} points - An array of points to insert into the QuadTree.
   * @returns {boolean} - Returns true after inserting all points.
   */
  insertPoints(points) {
    points.forEach((point) => {
      this.insert(point);
    });
    return true;
  }

  /**
   * Subdivides the node into four child QuadTrees.
   * @method QuadTree#subdivide
   */
  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let halfWidth = this.boundary.width / 2;
    let halfHeight = this.boundary.height / 2;

    const boundaryConstructor = this.boundary.constructor;
    let boundaries = [
      // North West
      new boundaryConstructor(
        x - halfWidth / 2,
        y - halfHeight / 2,
        halfWidth,
        halfHeight
      ),
      // North East
      new boundaryConstructor(
        x - halfWidth / 2,
        y + halfHeight / 2,
        halfWidth,
        halfHeight
      ),
      // South West
      new boundaryConstructor(
        x + halfWidth / 2,
        y - halfHeight / 2,
        halfWidth,
        halfHeight
      ),
      // South East
      new boundaryConstructor(
        x + halfWidth / 2,
        y + halfHeight / 2,
        halfWidth,
        halfHeight
      ),
    ];

    for (let i = 0; i < boundaries.length; i++) {
      this.children[i] = new QuadTree(boundaries[i], this.capacity);
    }

    // Shifting points to leaves
    this.insertPoints(this.points);
    this.points = [];
  }

  /**
   * Queries points within a specified boundary.
   * @method QuadTree#queryRange
   * @param {Boundary} boundary - The boundary to query within.
   * @param {Point[]} [found] - An array to collect found points (optional).
   * @returns {Point[]} - Array of points within the query boundary.
   */
  queryRange(boundary, found) {
    if (found === undefined) {
      found = [];
    }

    // Check if points are within query boundary
    if (!boundary.intersects(this.boundary)) {
      return found;
    }

    // Go to children nodes
    if (this.children.length != 0) {
      this.children.forEach((child) => {
        child.queryRange(boundary, found);
      });
    }

    // Collect points within query boundary
    found.push(...this.points);
    return found;
  }
}
