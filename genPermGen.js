var perm = require('./permutations');

function SimsPerm(xs, sims, bannedSuffix) {
  if(!xs || !xs.length) {
    throw new Error("Array of items required");
  }
  this.items = xs;
  this.sims = sims; 
  this.control = new Array(xs.length);
  this.bannedSuffix = bannedSuffix;
  for(var i = 0; i< this.control.length; i++) {
    this.control[i] = 0;
  }
}
function isAcceptableSuffix(elements, suffix) {
  var accept = true;
  for(var i = 0; i < suffix.length; i++) {
    accept = accept && suffix[i] === elements[elements.length-suffix.length+i];
  }
  return !accept;
}
SimsPerm.prototype.next = function next() {
  //console.log(this.items+"");
  var k = this.items.length;
  while(k > 0) {
    if(isAcceptableSuffix(this.items, this.bannedSuffix)) {
      k=k-this.bannedSuffix.length;
    }else{
      while(this.control[k-1] === k) {
        this.items = perm.multiplyPerm(perm.inversePerm(this.sims[k-1][k-1]),this.items);
        this.control[k-1] = 0;
        k++
        if(k === this.items.length) {
          return null;
        }
      }
      this.control[k-1]++;
      this.items = perm.multiplyPerm(this.tau(k,this.control[k-1]),this.items);
    }
  } 
  k = 1;
  while(this.control[k-1] === k) {
    this.control[k-1] = 0;
    k++
    if(k === this.items.length) {
      return null;
    }
  }
  this.control[k-1]++;
  //console.log("k="+k+" Ck="+this.control[k-1]);
  //console.log(" "+this.control+ " k="+k+" Ck="+this.control[k-1]);
  //var holycow = this.brute();
  var holycow =perm.multiplyPerm(this.tau(k,this.control[k-1]), this.omega(k-1 ,this.items));
  this.items = holycow;
  return this.items;
}

SimsPerm.prototype.brute = function() {
  var result = [1,2,3,4];
  for(var i = 0; i <3; i++) {
    result = perm.multiplyPerm(this.sims[i][this.control[i]],result);
  }
  return result;
}

SimsPerm.prototype.tau = function tau(k,j) {
  return perm.multiplyPerm(this.sims[k-1][j], perm.inversePerm(this.sims[k-1][j-1]));
}

SimsPerm.prototype.omega = function omega(k, things) {
  var result = things;
  for(var i = 0; i<k; i++) {
    result = perm.multiplyPerm(perm.inversePerm(this.sims[i][i+1]),result);  
  }
  return result;
}
var testSims = [
  [[1,2,3,4],[2,1,3,4]],
  [[1,2,3,4],[3,2,1,4],[1,3,2,4]],
  [[1,2,3,4],[4,2,3,1],[1,4,3,2],[1,2,4,3]]
];

var otherSims = [
  [[1,2,3,4],[2,1,3,4]],
  [[1,2,3,4],[3,1,2,4],[2,3,1,4]],
  [[1,2,3,4],[4,1,2,3],[3,4,1,2],[2,3,4,1]]
];
var test = new SimsPerm([1,2,3,4],otherSims, [1,5]);
var permutation
while((permutation = test.next())!==null) {
console.log(permutation);
}

