/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n ? array.slice(0, n) : array[0];
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n >= array.length ? array : (n ? array.slice(array.length - n) : array[array.length - 1]);
    //[0, 1, 2, 3, 4, 5] n = 3
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    
    for (let i in collection) {
      iterator(collection[i], i, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var index = -1;
    for (var i = 0; i < array.length; i++) {
      if(array[i] === target) {
        index = i;
        break;
      }
    }
    return index;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var newArr = [];
    for (let i in collection) {
      if ( iterator(collection[i]) ) {
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var newArr = [];
    for (let i in collection) {
      if ( !iterator(collection[i]) ) {
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    //I know I could have just done: loop through array, push each value into a new array, if new array doesn't already include that value
    //But whatever this was fun
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      if (!newArr.includes(array[i])) {
        newArr.push(array[i]);
      }
    }
    return newArr;

    //THIS METHOD BELOW WILL MODIFY THE ORIGINAL ARRAY!

    // for (let i = 0; i < array.length; i++) {
    //   //store current index
    //   var curIndex = i;
    //   //store current value
    //   var curVal = array[i];
    //   //figure out the next occurrence of curVal, starting right after this occurrence
    //   var nextIndex = array.indexOf(curVal, curIndex + 1);
    //   //until there are no more occurrences of this valin the array, do this
    //   while (nextIndex !== -1) {
    //     //make the next occurrence the new current index
    //     curIndex = nextIndex;
    //     //remove that particular occurrence
    //     array.splice(curIndex, 1);
    //     //look for the next occurrence, starting AT THE INDEX YOU JUST GOT RID OF
    //     nextIndex = array.indexOf(curVal, curIndex)
    //   }
    //   //done with the value at array[i], move on through the for-loop
    // }
    // return array;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      newArr.push(iterator(array[i]));
    }
    return newArr;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      newArr.push( array[i][propertyName] );
    }
    return newArr;
  };

  // Calls the method named by methodName on each value in the list. 
  //MAKE SURE YOU RETURN A NEW ARRAY WITH the change list item (after mthod is called on it)
  _.invoke = function(list, methodName, args) {

    var newList = [];
    
    for (let i = 0; i < list.length; i++){
      
      //this works for 'invoke with function reference...
      newList.push(methodName.call(list[i], args));

      //this works for 'invoke'...
      // newList.push(list[i][methodName](args));
      
    }
    return newList;
   
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if(initialValue) {
      var prevVal = initialValue;
    } else {
      var prevVal = 0;
    }

    for (let i in collection) {
      prevVal = iterator(prevVal, collection[i]);
    } 

    return prevVal;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for (var i in collection) {
      if (collection[i] === target) {
        return true;
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {

    if (arguments.length < 2) {
      return true;
    }

    for (var i in collection) {
      if (!iterator(collection[i]) ){
        return false;
      }
    }

    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    
    //if there's no iterator, just check and see if any values are truthy and if you find one, return true
    if (arguments.length < 2) {
      for (var i in collection) {
        if ( (collection[i]) ){
          return true;
        }
      }
      //nothing passed, return false
      return false;
    }

    //for every item, use iterator to look for a true value and if you find one, return true
    for (var i in collection) {
      if (iterator(collection[i]) ){
        return true;
      }
    }

    //nothing passed--return false
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    growingObj = this;
    for (let prop in obj) {
      var key = prop;
      var value = obj[prop];
      console.log(key, value);
      growingObj[key] = value;
      console.log(this[key]);
      
    }
    
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };



  // Shuffle an array.
  _.shuffle = function(array) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);
