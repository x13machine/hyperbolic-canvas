;
(function () {
  if (typeof HyperbolicCanvas === "undefined") {
    window.HyperbolicCanvas = {};
  }

  var Angle = window.HyperbolicCanvas.Angle;
  /*
  * Point object relative to the unit circle, where 0,0 is canvas center
  */
  var Point = window.HyperbolicCanvas.Point = function (options) {
    this.x = options.x;
    this.y = options.y;
  };

  Point.prototype.equals = function (otherPoint) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  };

  Point.prototype.angle = function () {
    return Circle.UNIT.angleAt(this);
  };

  Point.prototype.distanceFromCenter = function () {
    var r = HyperbolicCanvas.Line.givenTwoPoints(Point.CENTER, this).euclideanDistance();
    return 2 * Math.atanh(r);
  };

  Point.prototype.distantPoint = function (distance, angle) {
    angle = Angle.normalize(angle);
    if (distance === 0) {
      return this;
    }
    if (this.equals(Point.CENTER)) {
      return Point.givenHyperbolicPolarCoordinates(distance, angle);
    }

    var thisAngle = this.angle();

    if (thisAngle === angle) {
      return Point.givenHyperbolicPolarCoordinates(this.distanceFromCenter() + distance, thisAngle);
    }
    if (Math.abs(thisAngle - angle) === Math.PI) {
      return Point.givenHyperbolicPolarCoordinates(this.distanceFromCenter() - distance, thisAngle);
    }

    var a, b, c, alpha, gamma;

    var thisOpposite = Angle.normalize(thisAngle + Math.PI);
    var dir;

    if (thisAngle > thisOpposite) {
      if (angle > thisOpposite && angle < thisAngle) {
        dir = -1;
      } else {
        dir = 1;
      }
    } else {
      if (angle > thisAngle && angle < thisOpposite) {
        dir = 1;
      } else {
        dir = -1;
      }
    }

    b = this.distanceFromCenter();
    c = distance;
    alpha = Math.abs(Math.PI - Math.abs(thisAngle - angle));

    a = Math.acosh(Math.cosh(b) * Math.cosh(c) - Math.sinh(b) * Math.sinh(c) * Math.cos(alpha));

    var cosgamma = (Math.cosh(a) * Math.cosh(b) - Math.cosh(c)) / (Math.sinh(a) * Math.sinh(b));
    if (cosgamma < -1) {
      // never seems to happen
      cosgamma = -1;
    } else if (cosgamma > 1) {
      // correct floating point error
      cosgamma = 1;
    }
    gamma = Math.acos(cosgamma);

    return Point.givenHyperbolicPolarCoordinates(a, Angle.normalize(thisAngle + gamma * dir));
  };

  Point.prototype.isOnPlane = function () {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2) < 1;
  };

  Point.givenCoordinates = function (x, y) {
    return new Point({ x: x, y: y });
  };

  Point.givenPolarCoordinates = function (radius, angle, inverted) {
    return new Point({ x: radius * Math.cos(angle), y: radius * Math.sin(inverted ? -1 * angle : angle) });
  };

  Point.givenHyperbolicPolarCoordinates = function (radius, angle, inverted) {
    // returns NaN coordinates at distance > 709
    // at angle 0, indistinguishable from limit at distance > 36

    angle = Angle.normalize(angle);

    var euclideanRadius = (Math.exp(radius) - 1) / (Math.exp(radius) + 1);
    return new Point({ x: euclideanRadius * Math.cos(angle), y: euclideanRadius * Math.sin(inverted ? -1 * angle : angle) });
  };

  Point.between = function (p0, p1) {
    return new Point({ x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 });
  };

  Point.CENTER = new Point({ x: 0, y: 0 });
})();
