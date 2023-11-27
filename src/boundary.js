/**
 * Represents an interface for a two-dimensional boundary.
 * @class Boundary
 */
class Boundary {
  /**
   * Creates a boundary object.
   * @constructor
   */
  constructor() {}

  /**
   * Checks if a point is contained within the boundary.
   * @method Boundary#containsPoint
   * @param {Point} point - The point to check containment for.
   * @returns {boolean} - Returns true if the point is inside the boundary, false otherwise.
   */
  containsPoint(points) {}

  /**
   * Checks if this boundary intersects with another boundary.
   * @method Boundary#intersects
   * @param {Boundary} boundary - The boundary to check for intersection.
   * @returns {boolean} - Returns true if there is an intersection, false otherwise.
   */
  intersects(boundary) {}
}

/**
 * Represents a rectangular boundary in a two-dimensional space.
 * @class Rectangle
 * @extends Boundary
 */
class Rectangle extends Boundary {
  /**
   * Creates a rectangle object with a given center, width, and height.
   * @constructor
   * @param {number} centerX - The x-coordinate of the center of the rectangle.
   * @param {number} centerY - The y-coordinate of the center of the rectangle.
   * @param {number} width - The width of the rectangle.
   * @param {number} height - The height of the rectangle.
   */
  constructor(centerX, centerY, width, height) {
    super();
    this.x = centerX;
    this.y = centerY;
    this.width = width;
    this.height = height;
  }

  /**
   * Checks if a point is contained within the rectangle.
   * @method Rectangle#containsPoint
   * @param {Point} point - The point to check containment for.
   * @returns {boolean} - Returns true if the point is inside the rectangle, false otherwise.
   */
  containsPoint(point) {
    let withinXAxis = this.leftBorder <= point.x && this.rightBorder >= point.x;
    let withinYAxis = this.topBorder <= point.y && this.bottomBorder >= point.y;
    return withinXAxis && withinYAxis;
  }

  /**
   * Checks if this rectangle intersects with another boundary.
   * @method Rectangle#intersects
   * @param {Rectangle} rectangle - The boundary to check for intersection.
   * @returns {boolean} - Returns true if there is an intersection, false otherwise.
   */
  intersects(boundary) {
    return !(
      this.topBorder > boundary.bottomBorder ||
      this.bottomBorder < boundary.topBorder ||
      this.leftBorder > boundary.rightBorder ||
      this.rightBorder < boundary.leftBorder
    );
  }

  /**
   * Gets the top border coordinate of the rectangle.
   * @member {number}
   */
  get topBorder() {
    return this.y - this.height / 2;
  }

  /**
   * Gets the right border coordinate of the rectangle.
   * @member {number}
   */
  get rightBorder() {
    return this.x + this.width / 2;
  }

  /**
   * Gets the bottom border coordinate of the rectangle.
   * @member {number}
   */
  get bottomBorder() {
    return this.y + this.height / 2;
  }

  /**
   * Gets the left border coordinate of the rectangle.
   * @member {number}
   */
  get leftBorder() {
    return this.x - this.width / 2;
  }
}
