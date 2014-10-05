function QuickUnion(length)
{
	this.length = length;
	this.size = new Array(length);
	this.set = new Array(length);
	
	for(var i=0; i< length; i++)
	{
		this.size[i] =1;
		this.set[i] = i;
	}
}

QuickUnion.prototype.join = function(p,q) {
	var proot = this.find(p);
	var qroot = this.find(q);
	if(proot == qroot)
		return;
	
	if(this.size[proot] < this.size[qroot])
	{
		this.set[proot] = qroot;
		this.size[qroot] += this.size[proot];		
	}else{
		this.set[qroot] = proot;
		this.size[proot] += this.size[qroot];
	}
		
}

QuickUnion.prototype.connected = function(p,q) {
	var proot = this.find(p);
	var qroot = this.find(q);
	if(proot == qroot)
	{
		return true;
	}else{
		return false;	
	}
}

QuickUnion.prototype.find = function(index) {
	var root = this.set[index];
		
	while(root != this.set[root])
	{
		root = this.set[root];
	}
	this.set[index] = root;
	return root;
}


