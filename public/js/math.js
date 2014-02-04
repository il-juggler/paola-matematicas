(function() {
  angular.module('math', ['ngRoute', 'ngAnimate']).run([
    '$rootScope', function($rootScope) {
      return $rootScope.holaMundo = 'HOLA-MUNDO';
    }
  ]).directive('matSumPoints', function($parse) {
    return {
      link: function(scope, jqElement, attrs) {
        var data, el, gSumando, lienzo, p_angle, points, sum, translate, π;
        el = jqElement[0];
        data = $parse(attrs.matSumPoints)(scope);
        lienzo = d3.select(el).attr('width', 600).attr('height', 200);
        sum = lienzo.selectAll('g.sumando').data(data);
        π = Math.PI;
        translate = function(x, y) {
          return 'translate('.concat(x, ',', y, ')');
        };
        p_angle = d3.scale.linear().range([0, 1.94 * π]).domain([0, 16]);
        gSumando = sum.enter().append('g').attr('class', 'sumando').attr('transform', function(d, i) {
          return translate(100 + i * 200, 100);
        });
        gSumando.append('circle').attr('r', 0).attr('cy', 0).attr('cx', 0).attr('r', 90).attr('fill', 'rgba(90,180,90,0.3)').attr('stroke', 'rgba(90,180,90,1)').attr('stroke-width', 4);
        points = gSumando.selectAll('.point').data(function(d) {
          return Array(d);
        });
        points.enter().append('circle').attr('class', 'point').attr('r', 3).attr('cx', function(d, i) {
          return 40 * Math.sin(p_angle(i));
        }).attr('cy', function(d, i) {
          return 40 * Math.cos(p_angle(i));
        }).attr('fill', 'none').attr('stroke', 'black');
        return points.each(function(d, i) {
          var sle;
          sle = d3.select(this).attr('opacity', 0);
          return sle.transition().delay(i * 50).style('opacity', 0.2).attr('r', 10).transition().attr('r', 19);
        });
      }
    };
  });

}).call(this);
