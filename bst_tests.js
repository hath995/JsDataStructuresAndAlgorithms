var BST = require('./bst');
var assert = require('assert');
//var mocha = require('mocha');

var test = new BST(15,1);
test.avlInsert(6,2);
test.avlInsert(18,3);
test.avlInsert(17,4);
test.avlInsert(20,5);
test.avlInsert(3,6);
test.avlInsert(7,7);
test.avlInsert(13,8);
test.avlInsert(9,9);
test.avlInsert(2,10);
test.avlInsert(4,11);

//describe("")
var test2 = new BST(15,1);
test2 = test2.avlInsert(6,2);
test2 = test2.avlInsert(18,3);
test2 = test2.avlInsert(17,4);
test2 = test2.avlInsert(20,5);
test2 = test2.avlInsert(3,6);
test2 = test2.avlInsert(7,7);
test2 = test2.avlInsert(13,8);
test2 = test2.avlInsert(9,9);
test2 = test2.avlInsert(2,10);
test2 = test2.avlInsert(4,11);
/*
var rotateTest = new BST(6,null);
rotateTest = rotateTest.avlInsert(4,null);
rotateTest = rotateTest.avlInsert(7,null);
rotateTest = rotateTest.avlInsert(5,null);
rotateTest = rotateTest.avlInsert(3,null);
rotateTest = rotateTest.avlInsert(2,null);

//console.log(rotateTest);

if(rotateTest.getBalance() !== 1)  {
  console.log("Error on avl insert");
}

//rotateTest = rotateTest.rotateRight();

if(rotateTest.getBalance() !== -1)  {
  console.log("Error on right rotate");
}
*/
//console.log(rotateTest);
var test3 = new BST(49,null);
test3.insert(6);
test3.insert(5);
test3.insert(4);
test3.insert(12);
test3.insert(7);
test3.insert(6);
test3.insert(24);
test3.insert(20);
test3.insert(13);
test3.insert(48);
test3.insert(47);
test3.deleteLessThan(48);
console.log(test3);
assert(test3.left.key == 48 && test3.left.left === null, true, "DeleteLessThan should do so");

function genArry(key) {
  var diameters = [];
  for(var i = 0; i < key; i++) {
    diameters.push(Math.floor(Math.random()*key));
  }
  return diameters;
}
