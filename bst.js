
function BST(key, val, parent) {
	this.key   = key;
	this.value = val;
  this.parent = parent || null;
	this.left  = null;
	this.right = null;
}

BST.prototype = {
	insert: function(key, val) {
    if(key < this.key) {
      if(this.left != null) {
        this.left.insert(key,val);
      }else{
        this.left = new BST(key, val, this);
      }
    }else{
      if(this.right != null) {
        this.right.insert(key,val);
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
      if(this.left != null) {
        return this.left.find(key);
      }
    }else{
      if(this.right != null) {
        return this.right.find(key);
      }
    }
    return null;
  },
  minimum: function() {
    var cur = this;
    while(cur.left != null) {
     cur = cur.left; 
    }
    return cur;
  },
  maximum: function() {
    var cur = this;
    while(cur.right != null) {
      cur = cur.right;
    }
    return cur;
  },
  successor: function() {
    if(this.right != null) {
      return this.right.minimum();
    }
    var cur = this.parent;
    var prev = this;
    while(cur != null && prev == cur.right) {
      prev = cur;
      cur = cur.parent;
    }
    return cur;
  },
  inorder_walk: function() {
    if(this.left != null) {
      this.left.inorder_walk();
    }
    console.log(this.key);
    if(this.right != null) {
      this.right.inorder_walk();
    }
  },
  preorder_walk: function() {
    console.log(this.key);
    if(this.left != null) {
      this.left.preorder_walk();
    }
    if(this.right != null) {
      this.right.preorder_walk();
    }
  },
  postorder_walk: function() {
    if(this.left != null) {
      this.left.postorder_walk();
    }
    if(this.right != null) {
      this.right.postorder_walk();
    }
    console.log(this.key);
  },
  transplant: function(sub) {
    if(this.parent == null) {
      this.key = sub.key;
      this.value = sub.value;
      this.left = sub.left;
      this.right = sub.right;
    }else if(this == this.parent.left) {
      this.parent.left = sub;
    }else{
      this.parent.right = sub;
    }
    if(sub != null) {
      sub.parent = this.parent;
    }
  },
	remove: function() 
  {
    if(this.left == null) {
      this.transplant(this.right);
    }else if(this.right == null) {
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
  fmap: function(fn) {
    var result = new BST(this.key,fn(this.value),this.parent);
    if(this.left) {
      result.left = this.left.fmap(fn);
    }
    if(this.right) {
      result.right = this.right.fmap(fn);
    }
    return result;
  }
}

module.exports = BST;
