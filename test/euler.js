'use strict';

var test = require('tap').test

var euler = require('../')
var eulerZero = euler( 0, 0, 0, 'XYZ' );
var eulerAxyz = euler( 1, 0, 0, 'XYZ' );
var eulerAzyx = euler( 0, 1, 0, 'ZYX' );
  
var matrixEquals4 = function( a, b, tolerance ) {
  tolerance = tolerance || 0.0001;
  if( a.elements.length != b.elements.length ) {
    return false;
  }
  for( var i = 0, il = a.elements.length; i < il; i ++ ) {
    var delta = a.elements[i] - b.elements[i];
    if( delta > tolerance ) {
      return false;
    }
  }
  return true;
};

test( 'constructor/equals', function(t) {
  var a = new euler();
  t.ok(a.equals( eulerZero ));
  t.ok(! a.equals( eulerAxyz ));
  t.ok(! a.equals( eulerAzyx ));
  t.end();
});

test( 'clone/copy/equals', function(t) {
  var a = eulerAxyz.clone();
  t.ok(a.equals( eulerAxyz ));
  t.ok(! a.equals( eulerZero ));
  t.ok(! a.equals( eulerAzyx ));

  a.copy( eulerAzyx );
  t.ok(a.equals( eulerAzyx ));
  t.ok(! a.equals( eulerAxyz ));
  t.ok(! a.equals( eulerZero ));
  t.end();
});

test( 'set', function(t) {
  var a = euler();

  a.set( 0, 1, 0, 'ZYX' );
  t.ok(a.equals( eulerAzyx ));
  t.ok(! a.equals( eulerAxyz ));
  t.ok(! a.equals( eulerZero ));
  t.end();
});

/*test( 'Quaternion.setFromEuler/Euler.fromQuaternion', function(t) {
  var testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
  for( var i = 0; i < testValues.length; i ++ ) {
    var v = testValues[i];
    var q = quaternion().setFromEuler( v );

    var v2 = euler().setFromQuaternion( q, v.order );
    var q2 = quaternion().setFromEuler( v2 );
    t.ok(q.equals( q2 ));  
  }
  t.end();
});*/

/*test( 'reorder', function(t) {
  var testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
  for( var i = 0; i < testValues.length; i ++ ) {
    var v = testValues[i];
    var q = quaternion().setFromEuler( v );

    v.reorder( 'YZX' );   
    var q2 = quaternion().setFromEuler( v );
    t.ok(q.equals( q2 ));  

    v.reorder( 'ZXY' );
    var q3 = quaternion().setFromEuler( v );
    t.ok(q.equals( q3 ));  
  }
  t.end();
});*/
