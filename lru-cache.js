// using QUEUE (doubly linked list) & Hash (Object in javascript)
{
class Node{
    constructor(val){
    this.val = val;
    this.next = null;
    this.prev = null;
    }
}

class Queue {
    constructor(){
        this.first= null;
        this.last = null;
        this.size = 0;
    }
    // push
    enQueue(val){
        let newNode = new Node(val);
        if(!this.first){
            this.first = this.last = newNode;
        } else {
            this.last.next = newNode;
            newNode.prev = this.last;
            this.last = newNode;
        }
        this.size++;
        return newNode;
                
    }
    // shift
    deQueue(){
        if(!this.first) return null;
        let temp = this.first;
        this.first = this.first.next;
        this.first.prev = null;
        temp.next = null;
        this.size--;
        if(this.size == 0){
            this.last = null;
        }
        return temp.val;
    }

    // remove Node
    // special function for LRU
    remove(node){
        if(!node) return undefined;
        // if queue size is 1
        if(node === this.first && node === this.last){
            this.first = this.last = null;
        }
        // if node to remove is top node 
        else if(this.first === node){
            this.first = this.first.next;
            this.first.prev = null;
        }
        // if node to remove is last node 
         else if(this.last === node){
            this.last = node.prev;
            this.last.next = node.prev = null;
        }
        // if node to remove is in middle  
        else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            node.next = node.prev = null;
        }
        this.size--;
    }
}

// LRU Cache class
class LRUCache {
    constructor(size){
        this.q = new Queue();
        this.size = size;
        this.hash = {};
    }
    // assuming obj has a key 'id' as a unique identifier
    insert(obj){
        // if its a hit (obj is already present in cache(queue))
        if(this.hash.hasOwnProperty(obj.id)){
            const node = this.hash[obj.id];
            // detach node from queue
            this.q.remove(node);
             // enqueue it and update hash
            const newNode = this.q.enQueue(obj);
            this.hash[obj.id] = newNode;
        } else {
            // remove top from queue & hash if overflow
            if(this.q.size >= this.size){
                const removedNode = this.q.deQueue();
                delete this.hash[removedNode.id];
            }
            // insert into queue and save key in hash
            const newNode = this.q.enQueue(obj);
            this.hash[obj.id] = newNode;
        }
        return this.q.size;
    }
    // get object by id
    get(id){
        return this.hash[id] ? this.hash[id].val : undefined;
    }
}

let lru = new LRUCache(4);

lru.insert({id : 1, name:'Tom'})
lru.insert({id : 2, name:'Jack'})
lru.insert({id : 3, name:'John'})
lru.insert({id : 4, name:'Steve'})
lru.insert({id : 5, name:'Steve'})
lru.get(5);
// console.log(lru)
}
