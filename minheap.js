function Heap(stuff) {
  this.items = stuff || [];
  this.buildheap();
}

Heap.prototype.minheapify = function(index) {
  var left = 2*index;
  var right = 2*index+1;
  var smallest = index;
  if(left <= this.items.length && this.items[left-1] < this.items[smallest-1]) {
    smallest = left;
  }
  if(right <= this.items.length && this.items[right-1] < this.items[smallest-1]) {
    smallest = right;
  }
  if(smallest != index) {
    var temp = this.items[smallest-1];
    this.items[smallest-1] = this.items[index-1];
    this.items[index-1] = temp;
    this.minheapify(smallest);
  }
}

Heap.prototype.buildheap = function() {
  for(var i = Math.floor(this.items.length/2); i >= 1; i--) {
    this.minheapify(i);
  }
}

Heap.prototype.top = function() {
  var top = this.items[0];
  this.items[0] = this.items[this.items.length-1];
  this.minheapify(1);
  this.items.length = this.items.length-1;
  return top;
}

Heap.prototype.insert = function(num) {
  this.items[this.items.length] = num;
  var current = this.items.length;
  var parent = Math.floor((current-1)/2);
  while(this.items[current - 1] < this.items[parent - 1]) {
    var temp = this.items[current - 1];
    this.items[current - 1] = this.items[parent - 1];
    this.items[parent - 1] = temp;
    current = parent;
    parent = Math.floor((current-1)/2);
  }
}

var stuff = new Heap([100,10,11,12,23,1,2,3,4,7,8,92]);
stuff.insert(-1);
stuff.insert(-3);
stuff.insert(-4);
stuff.insert(-10);
