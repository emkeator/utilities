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
      
      if(typeof (methodName) === 'string') {
        //this works for 'invoke'...when methodName is passed as a string
        newList.push(list[i][methodName](args));
      } else {
        //this works for 'invoke with function reference'...when it's an array.prototype.methodName
        newList.push(methodName.call(list[i], args));
      }
      
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
    //I know I could simplify this code down but it's so nice and readable like this
    //so I'm keeping it!
    let growingObj = arguments[0];
    let otherArgs = Array.from(arguments);
    otherArgs.shift();
    
    for (let i = 0; i < otherArgs.length; i++) {
      let curObj = otherArgs[i];
      
      for (let prop in curObj) {
        let key = prop;
        let value = curObj[prop];
        growingObj[key] = value;
      }
    }
  
    return growingObj;
    
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    let growingObj = arguments[0];
    let otherArgs = Array.from(arguments);
    otherArgs.shift();
    
    for (let i = 0; i < otherArgs.length; i++) {
      let curObj = otherArgs[i];
      
      for (let prop in curObj) {
        let key = prop;
        let value = curObj[prop];
        if (!growingObj.hasOwnProperty(key)) {
          growingObj[key] = value;
        }
      }
    }
  
    return growingObj;
    
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
     let beenCalled = false;
     let firstAndOnlyVal = func.call();

     return function(func){
       beenCalled = true;
       if (beenCalled) {
        return firstAndOnlyVal;
       }
     }

  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    //refactored solution for dry code
    let memo = {};

    return function(singleArg) {
      
      if(!memo[singleArg]) {
        memo[singleArg] = func(singleArg);
      } 
      return memo[singleArg];

    };

    //Oringal solution -- slightly messier
    // let prevVal = [];
    // let args = [];

    // return function(singleArg) {
    //   if(args.indexOf(singleArg) !== -1) {

    //     return prevVal[args.indexOf(singleArg)];

    //   } else {
        
    //     args.push(singleArg);
    //     prevVal.push(func(singleArg));

    //     return prevVal[prevVal.length - 1];

    //   }
    // };
  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var successiveArgs = Array.from(arguments);
    successiveArgs.shift();
    successiveArgs.shift();
    
    setTimeout(function() { func.apply(null, successiveArgs); }, wait);    
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var play52CardPickup = array.slice(0);
    play52CardPickup.sort(function(a, b){
      return (a + b < Math.floor(Math.random() * (a + b + 1)) + (1 - a - b));
    })
    return play52CardPickup;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    
    function getSortItem(objectOrValue) {
      if ( typeof iterator === 'function' ) {
        return iterator(objectOrValue);
      } else {
        return objectOrValue[iterator];
      }
    }

    collection.sort(function(a, b) {
      return getSortItem(a) > getSortItem(b);
    })
    
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    
    var arrays = Array.from(arguments);
    var longest =[];
    for (var i = 0; i < arrays.length; i++) {
      if (arrays[i].length > longest.length) {
        longest = arrays[i];
      }
    }

    var zippedUp = [];
    for (var i = 0; i < longest.length; i++) {
      //each array we are taking items from
      let module = [];
      for (let j = 0; j < arrays.length; j++) {
        if(arrays[j][i]) {
          module.push(arrays[j][i]);
        } else {
          module.push(undefined);
        }
      }
      zippedUp.push(module);
    }

    return zippedUp;
    



  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    
    function recFlatten(array) {
      //create a new array to work with
      var newArr = [];
      //loop through the array
      for (let i = 0; i < array.length; i++) {
        //if it's not an array
        if (!Array.isArray(array[i])) {
          //push the object/value into the newArray
          newArr.push(array[i]);
        } else {
          //if it IS an array, concatenate the recursively called & flattened version to newArray
          newArr = newArr.concat(recFlatten(array[i]));
          //if an array it'll get passed into this function--if it's one dimension, it'll just 
          //every item get pushed into the new array, which is returned below. If it's not one dimension,
          //it'll go through this process on the arrays nested within
        }
      }
      return newArr;
    }
   
    return recFlatten(nestedArray);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrays = Array.from(arguments);
    
    var allShared = [];
    //loop through items of first array
    for (let i = 0; i < arrays[0].length; i++) {
      let inAll = true; //default, this item's in all arrays
      //loop through every other array in arrays
      for (let j = 0; j < arrays.length; j++) {
          //if current val is not in one of the arrays, set inAll to false and break
          if(!arrays[j].includes(arrays[0][i])) {
            inAll = false;
            break;
          }
      }
      if (inAll) {
        allShared.push(arrays[0][i]);
      }

    }
    return allShared;


  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var arrays = Array.from(arguments);
    
    var onlyMe = [];
    //loop through items of first array
    for (let i = 0; i < arrays[0].length; i++) {
      let inJustMe = true; //default, this item's in just the first array
      //loop through every other array in arrays
      for (let j = 1; j < arrays.length; j++) {
          //if current val is in one of the arrays, set inJustMe to false and break
          if(arrays[j].includes(arrays[0][i])) {
            inJustMe = false;
            break;
          }
      }
      if (inJustMe) {
        onlyMe.push(arrays[0][i]);
      }

    }
    return onlyMe;
  };

}).call(this);
