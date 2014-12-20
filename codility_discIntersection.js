var BST = require('./bst.js');

function solution(A) {
    // write your code in JavaScript (ECMA-262, 5th edition)
    var intervals = A.map(function(elem, index) {
        return {
            left: index - elem,
            right: index + elem
        }    
    });
    intervals.sort(function(a, b) {
       return a.left - b.left; 
    });
    var total_intersections = 0;
    var bst;
    for(var i = 0; i < intervals.length; i++) {
           if(!bst)  {
             bst = new BST(intervals[i].right, intervals[i], null);  
           }else{
               bst = bst.deleteLessThan(intervals[i].left);
               if(bst) {
                  consol.elog(bst);
                  assert.equal(isNaN(bst.size), false);
                  total_intersections += bst.size;
                   //console.log("ti size", total_intersections, bst.size);
                  bst = bst.avlInsert(intervals[i].right, intervals[i]);
                   //console.log(bst.inorder_walk())
               }else{
                   bst = new BST(intervals[i].right, intervals[i], null);
               }
           }
    }
    return total_intersections
}
var A = [1,1,2,5,8,3,4,4,10,3];
console.log(solution(A));

var B = [1,5,2,1,4,0];
console.log(solution(B));