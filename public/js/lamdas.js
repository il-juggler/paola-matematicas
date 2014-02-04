(function() {
  var I, ƒ;

  ƒ = function(name) {
    var params, v;
    params = Array.prototype.slice.call(arguments, 1);
    v = null;
    return function(o) {
      if (typeof (v = o[name]) === 'function') {
        return v.apply(o, params);
      } else {
        return v;
      }
    };
  };

  I = function(d) {
    return d;
  };

  this['Y'] = I;

  this['ƒ'] = ƒ;

  this['Fn'] = ƒ;

}).call(this);
