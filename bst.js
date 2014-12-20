function BST(key, val, parent) {
  this.key   = key;
  this.value = val;
  this.parent = parent || null;
  this.left  = null;
  this.right = null;
  this.height = 1;
  this.size = 1;
}

BST.prototype = {
  findHeight: function() {
    var lh = 0;
    var rh = 0;
    if(this.left) {
      lh = this.left.findHeight();  
    }
    if(this.right) {
      rh = this.right.findHeight();  
    }
    this.height = Math.max(lh, rh) + 1;
    return this.height;
  },
  avlInsert: function(key, val) {
    if(key < this.key) {
      if(this.left !== null) {
        this.left.avlInsert(key, val);
      }else{
        this.left = new BST(key, val, this);
      }
    }else{
      if(this.right !== null) {
        this.right.avlInsert(key, val);
      }else{
        this.right = new BST(key, val, this);
      }
    }
    this.size++;
    this.findHeight();
    var balance = this.getBalance();
    if(balance > 1 && key < this.left.key) {
      return this.rotateRight();
    }
    if(balance < -1 && key > this.right.key) {
      return this.rotateLeft();
    }
    if(balance > 1 && key > this.left.key) {
      this.left = this.left.rotateLeft();
      return this.rotateRight();
    }
    if(balance < -1 && key < this.right.key) {
      this.right = this.right.rotateRight();
      return this.rotateLeft();
    }
    return this;
  },
  insert: function(key, val) {
    if(key < this.key) {
      if(this.left !== null) {
        this.left.insert(key, val);
      }else{
        this.left = new BST(key, val, this);
      }
    }else{
      if(this.right !== null) {
        this.right.insert(key, val);
      }else{
        this.right = new BST(key, val, this);
      }
    }
  },
  find: function(key) {
    if(this.key == key) {
      return this;
    }
    if(key < this.key) {
      if(this.left !== null) {
        return this.left.find(key);
      }
    }else{
      if(this.right !== null) {
        return this.right.find(key);
      }
    }
    return null;
  },
  minimum: function() {
    var cur = this;
    while(cur.left !== null) {
     cur = cur.left; 
    }
    return cur;
  },
  maximum: function() {
    var cur = this;
    while(cur.right !== null) {
      cur = cur.right;
    }
    return cur;
  },
  successor: function() {
    if(this.right !== null) {
      return this.right.minimum();
    }
    var cur = this.parent;
    var prev = this;
    while(cur !== null && prev === cur.right) {
      prev = cur;
      cur = cur.parent;
    }
    return cur;
  },
  inorder_walk: function() {
    var res = "";
    if(this.left !== null) {
      res += this.left.inorder_walk();
    }
    res += this.key+" ";
    if(this.right !== null) {
      res += this.right.inorder_walk();
    }
    return res;
  },
  preorder_walk: function() {
    console.log(this.key);
    if(this.left !== null) {
      this.left.preorder_walk();
    }
    if(this.right !== null) {
      this.right.preorder_walk();
    }
  },
  postorder_walk: function() {
    if(this.left !== null) {
      this.left.postorder_walk();
    }
    if(this.right !== null) {
      this.right.postorder_walk();
    }
    console.log(this.key);
  },
  transplant: function(sub) {
    if(this.parent === null) {
      this.key = sub.key;
      this.value = sub.value;
      this.left = sub.left;
      this.right = sub.right;
    }else if(this == this.parent.left) {
      this.parent.left = sub;
    }else{
      this.parent.right = sub;
    }
    if(sub !== null) {
      sub.parent = this.parent;
    }
  },
  remove: function() 
  {
    if(this.left === null) {
      this.transplant(this.right);
    }else if(this.right === null) {
      this.transplant(this.left);
    }else{
      var cur = this.right.minimum();
      if(cur.parent != this) {
        cur.transplant(cur.right);
        cur.right = this.right;
        cur.right.parent = cur;
      }
      var oldleft = this.left;
      this.transplant(cur);
      cur.left = oldleft;
      cur.left.parent = cur;
    }
  },
  deleteLessThan: function(key) {
    if(this.left) {
      this.left = this.left.deleteLessThan(key);  
      if(this.left) {
        this.left.parent = this;  
      }
    }
    if(this.right) {
      this.right = this.right.deleteLessThan(key);
      if(this.right) {
        this.right.parent =  this;  
      }
    }
    this.updateSize();
    this.findHeight();
    var balance = this.getBalance();
    
    if(this.key < key) {
      return this.right;
    }
    if(balance > 1) {
      return this.rotateRight();
    }
    if(balance < -1) {
      return this.rotateLeft();
    }
 
    return this;
  },
  deleteAVL: function(key) {
    if(key < this.key) {
      if(this.left) {
        this.left = this.left.deleteAVL(key);
      }
    } else if(key > this.key) {
      if(this.right) {
        this.right = this.right.deleteAVL(key);
      }
    } else {
      if(!this.left || !this.right) {
        if(!this.left && !this.right) {
          return null;
        }
        return this.left ? this.left : this.right;
      }else{
        var temp = this.right ? this.right.minimum() : null;
        this.key = temp.key;
        this.val = temp.val;
        this.right = this.temp.deleteAVL();
      }

    }
    this.updateSize();
    this.findHeight();
    var balance = this.getBalance();
    var rightBalance = 0;
    var leftBalance = 0;
    if(this.right) {
      rightBalance = this.right.getBalance();
    }
    if(this.left) {
      leftBalance = this.left.getBalance();
    }
    if(balance > 1 && leftBalance >= 0) {
      return this.rotateRight();
    }
    if(balance > 1 && leftBalance < 0) {
      this.left = this.left.rotateLeft();
      return this.rotateRight();
    } 
    if(balance < -1 && rightBalance <= 0) {
      return this.rotateLeft();
    }
    if(balance < -1 && rightBalance > 0) {
      this.right = this.left.rotateRight();
      return this.rotateLeft();
    }
    return this;

  },
  fmap: function(fn) {
    var result = new BST(this.key,fn(this.value),this.parent);
    if(this.left) {
      result.left = this.left.fmap(fn);
    }
    if(this.right) {
      result.right = this.right.fmap(fn);
    }
    return result;
  },
  rotateRight: function() {
    var x = this.left;
    var t2 = x.right;
    x.right = this;
    x.parent = this.parent;

    this.left = t2;
    if(t2) {
      t2.parent = this;
    }
    this.parent = x;
    this.findHeight();
    x.findHeight();
    this.updateSize();
    x.updateSize(); 
    return x;
  },
  rotateLeft: function() {
    var y = this.right;
    var t2 = y.left;

    y.left = this;
    y.parent = this.parent;

    this.right = t2;
    if(t2) {
      t2.parent = this;
    }
    this.parent = y;

    this.findHeight();
    y.findHeight();
    this.updateSize();
    y.updateSize();
    return y;
  },
  getBalance: function() {
    var left = 0;
    var right = 0;
    if(this.left) {
      left = this.left.height;
    }
    if(this.right) {
      right = this.right.height;
    }
    return left - right;
  },
  updateSize: function() {
    var left = 0;
    var right = 0;
    if(this.left) {
      left = this.left.updateSize();
    }
    if(this.right) {
      right = this.right.updateSize();
    }
    this.size = left + right + 1;
    return this.size
  }

};

module.exports = BST;
