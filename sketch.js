// Declaring Global Variables ==================================================
let qtree, retrievedPoints, query;
let queryX1, queryX2, queryY1, queryY2;

// Setting Constants ===========================================================
const mintGreenRGB = [201, 237, 220];
const defaultSize = 2;
const selectedSize = 7;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(500, 500);

  qtree = new QuadTree(new Rectangle(width / 2, height / 2, width, height), 4);

  // Seeding QuadTree with random points
  let points = [];
  for (let i = 0; i < 250; i++) {
    points.push(new Point(random(width), random(height)));
  }
  qtree.insertPoints(points);
}

function draw() {
  background(0);
  drawQuadTree(qtree);

  // Querying QuadTree
  query = constructQueryBoundary(queryX1, queryY1, queryX2, queryY2);
  if (query !== null) {
    drawBoundary(query, mintGreenRGB);
    retrievedPoints = qtree.queryRange(query);
    drawPoints(retrievedPoints, selectedSize);
  }
}

function mousePressed() {
  queryX1 = mouseX;
  queryY1 = mouseY;
}

function mouseDragged() {
  queryX2 = mouseX;
  queryY2 = mouseY;
}

function mouseReleased() {
  queryX2 = mouseX;
  queryY2 = mouseY;
}

// Helper Functions ============================================================
/**
 * Constructs a boundary rectangle object based on provided coordinates.
 *
 * @param {number} queryX1 - The x-coordinate of the first point.
 * @param {number} queryY1 - The y-coordinate of the first point.
 * @param {number} queryX2 - The x-coordinate of the second point.
 * @param {number} queryY2 - The y-coordinate of the second point.
 *
 * @returns {Rectangle|null} Returns a Rectangle object representing the
 * constructed boundary based on the provided coordinates. Returns null if any
 * of the input values are not numbers.
 *
 * @description
 * This function constructs a Rectangle object using the coordinates provided.
 * It calculates the center point and dimensions of the rectangle based on the
 * coordinates of two points. If any of the input values are not numbers, it
 * returns null.
 */
function constructQueryBoundary(queryX1, queryY1, queryX2, queryY2) {
  if (isNaN(queryX1) || isNaN(queryX2) || isNaN(queryY1) || isNaN(queryY2)) {
    return null;
  }

  let centerX = (queryX2 + queryX1) / 2;
  let centerY = (queryY2 + queryY1) / 2;

  let width = abs(queryX2 - queryX1);
  let height = abs(queryY2 - queryY1);

  return new Rectangle(centerX, centerY, width, height);
}

// Drawing Custom Objects ======================================================
function drawQuadTree(qtree) {
  if (qtree.children.length != 0) {
    qtree.children.forEach((child) => {
      drawQuadTree(child);
    });
  }

  drawBoundary(qtree.boundary, [255, 255, 255]);
  drawPoints(qtree.points);
}

function drawBoundary(boundary, rgb) {
  let x = boundary.x;
  let y = boundary.y;
  let width = boundary.width;
  let height = boundary.height;

  if (rgb.every((element) => element === 255)) {
    noFill();
  } else {
    fill(...rgb, 40);
  }
  stroke(...rgb);
  rectMode(CENTER);
  rect(x, y, width, height);
}

function drawPoints(points, size) {
  if (size === undefined) {
    size = defaultSize;
  }

  fill(255);
  points.forEach((point) => {
    ellipse(point.x, point.y, size, size);
  });
}
