;
(function () {
  if (typeof HyperbolicCanvas === "undefined") {
    window.HyperbolicCanvas = {};
  }


  var Point = window.Point = window.HyperbolicCanvas.Point;
  var Line = window.Line = window.HyperbolicCanvas.Line;
  var Circle = window.Circle = window.HyperbolicCanvas.Circle;
  var Polygon = window.Polygon = window.HyperbolicCanvas.Polygon;
  var Canvas = window.Canvas = window.HyperbolicCanvas.Canvas;


  window.HyperbolicCanvas.test = function () {
    window.p1 = Point.fromCoordinates(.5, .5);
    window.p2 = Point.fromCoordinates(.5, -.7);
    window.p3 = Point.fromCoordinates(-.3, -.2);
    window.p4 = Point.fromCoordinates(-.3, .5);
    window.p5 = Point.fromCoordinates(.9, 0);
    window.p6 = Point.fromCoordinates(0, .9);
    window.l1 = Line.fromTwoPoints(p1, p2);
    window.l2 = Line.fromTwoPoints(p3, p2);
    window.l3 = Line.fromTwoPoints(p3, p4);
    window.l4 = Line.fromTwoPoints(p1, p4);
    window.l5 = Line.fromTwoPoints(p6, p5);
    window.c = HyperbolicCanvas.canvases[0];
    c.ctx.fillStyle = '#DD4814';
    c.ctx.strokeStyle = '#DD4814';


    // c.fillPolygon([p1,p2,p3,p4]);

    // c.ctx.strokeStyle = 'black';
    // c.drawPolygon([p1,p2,p3,p4]);

    // [l1,l2,l3,l4].forEach(function (l) {
    //   c.drawLine(l);
    // });
    var v = Polygon.fromNCenterRadius(5, Point.CENTER, 3)
    c.fillPolygon(v);
    var v = Polygon.fromNCenterRadius(5, Point.CENTER, 2)
    c.ctx.fillStyle = 'red';
    c.fillPolygon(v);
    var v = Polygon.fromNCenterRadius(5, Point.CENTER, 1)
    c.ctx.fillStyle = 'yellow';
    c.fillPolygon(v);
  };

  window.circleTest = function () {
    for (var i = 0; i < 1000; i++) {
      var points = [];
      for (var j = 0; j < 3; j++) {
        var x = 1 - Math.random() * 2;
        var y = Math.sqrt( 1 - x * x);
        y = Math.random() > .5 ? y : y * -1;
        points.push(new Point({ x: x, y: y }));
      }
      var center = Circle.fromThreePoints(points[0], points[1], points[2]).center;
      if (center === false) {
        return false;
      }
      console.log(i);
      console.log(points[0])
      console.log("d:" + Line.fromTwoPoints(center, points[0]).euclideanDistance());
      console.log(points[1])
      console.log("d:" + Line.fromTwoPoints(center, points[1]).euclideanDistance());
      console.log(points[2])
      console.log("d:" + Line.fromTwoPoints(center, points[2]).euclideanDistance());
      console.log(center);
    }
    return true;
  };
})();
