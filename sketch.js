let qtree, point, query;

function setup() {
  createCanvas(500, 500);
  qtree = new QuadTree(new Rectangle(width / 2, height / 2, width, height), 2);
}

function draw() {
  background(0);
  drawQuadTree(qtree);
}

function drawQuadTree(qtree) {
  if (qtree.children.length != 0) {
    qtree.children.forEach((child) => {
      drawQuadTree(child);
    });
  }

  drawBoundary(qtree.boundary);
  drawPoints(qtree.points);
}

function drawBoundary(boundary) {
  let x = boundary.x;
  let y = boundary.y;
  let width = boundary.width;
  let height = boundary.height;

  noFill();
  stroke(255);
  rectMode(CENTER);
  rect(x, y, width, height);
}

function drawPoints(points) {
  fill(255);
  points.forEach((point) => {
    ellipse(point.x, point.y, 2, 2);
  });
}

function mousePressed() {
  let points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new Point(mouseX + random(-10, 10), mouseY + random(-10, 10)));
  }
  qtree.insertPoints(points);
  points = [];
  console.log(qtree);
}
