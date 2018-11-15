var Utils;(function(Utils){var Async=(function(){function Async(){}
Async.waitFor=function(test,successCallback,failureCallback,interval,maxTries,numTries){if(!interval)
interval=200;if(!maxTries)
maxTries=100;if(!numTries)
numTries=0;numTries+=1;if(numTries>maxTries){if(failureCallback)
failureCallback()}
else if(test()){successCallback()}
else{setTimeout(function(){Async.waitFor(test,successCallback,failureCallback,interval,maxTries,numTries)},interval)}};return Async})();Utils.Async=Async})(Utils||(Utils={}));var Utils;(function(Utils){var Bools=(function(){function Bools(){}
Bools.getBool=function(val,defaultVal){if(val===null||typeof(val)==='undefined'){return defaultVal}
return val};return Bools})();Utils.Bools=Bools})(Utils||(Utils={}));var Utils;(function(Utils){var Clipboard=(function(){function Clipboard(){}
Clipboard.copy=function(text){var $tempDiv=$("<div style='position:absolute;left:-9999px'>");var brRegex=/<br\s*[\/]?>/gi;text=text.replace(brRegex,"\n");$("body").append($tempDiv);$tempDiv.append(text);var $tempInput=$("<textarea>");$tempDiv.append($tempInput);$tempInput.val($tempDiv.text()).select();document.execCommand("copy");$tempDiv.remove()};Clipboard.supportsCopy=function(){return document.queryCommandSupported&&document.queryCommandSupported('copy')};return Clipboard})();Utils.Clipboard=Clipboard})(Utils||(Utils={}));var __extends=(this&&this.__extends)||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __())};var Utils;(function(Utils){var Collections;(function(Collections){var collections=Collections;var _hasOwnProperty=Object.prototype.hasOwnProperty;var has=function(obj,prop){return _hasOwnProperty.call(obj,prop)};function defaultCompare(a,b){if(a<b){return-1}
else if(a===b){return 0}
else{return 1}}
Collections.defaultCompare=defaultCompare;function defaultEquals(a,b){return a===b}
Collections.defaultEquals=defaultEquals;function defaultToString(item){if(item===null){return'COLLECTION_NULL'}
else if(collections.isUndefined(item)){return'COLLECTION_UNDEFINED'}
else if(collections.isString(item)){return'$s'+item}
else{return'$o'+item.toString()}}
Collections.defaultToString=defaultToString;function makeString(item,join){if(join===void 0){join=","}
if(item===null){return'COLLECTION_NULL'}
else if(collections.isUndefined(item)){return'COLLECTION_UNDEFINED'}
else if(collections.isString(item)){return item.toString()}
else{var toret="{";var first=!0;for(var prop in item){if(has(item,prop)){if(first)
first=!1;else toret=toret+join;toret=toret+prop+":"+item[prop]}}
return toret+"}"}}
Collections.makeString=makeString;function isFunction(func){return(typeof func)==='function'}
Collections.isFunction=isFunction;function isUndefined(obj){return(typeof obj)==='undefined'}
Collections.isUndefined=isUndefined;function isString(obj){return Object.prototype.toString.call(obj)==='[object String]'}
Collections.isString=isString;function reverseCompareFunction(compareFunction){if(!collections.isFunction(compareFunction)){return function(a,b){if(a<b){return 1}
else if(a===b){return 0}
else{return-1}}}
else{return function(d,v){return compareFunction(d,v)*-1}}}
Collections.reverseCompareFunction=reverseCompareFunction;function compareToEquals(compareFunction){return function(a,b){return compareFunction(a,b)===0}}
Collections.compareToEquals=compareToEquals;var arrays;(function(arrays){function indexOf(array,item,equalsFunction){var equals=equalsFunction||collections.defaultEquals;var length=array.length;for(var i=0;i<length;i++){if(equals(array[i],item)){return i}}
return-1}
arrays.indexOf=indexOf;function lastIndexOf(array,item,equalsFunction){var equals=equalsFunction||collections.defaultEquals;var length=array.length;for(var i=length-1;i>=0;i--){if(equals(array[i],item)){return i}}
return-1}
arrays.lastIndexOf=lastIndexOf;function contains(array,item,equalsFunction){return arrays.indexOf(array,item,equalsFunction)>=0}
arrays.contains=contains;function remove(array,item,equalsFunction){var index=arrays.indexOf(array,item,equalsFunction);if(index<0){return!1}
array.splice(index,1);return!0}
arrays.remove=remove;function frequency(array,item,equalsFunction){var equals=equalsFunction||collections.defaultEquals;var length=array.length;var freq=0;for(var i=0;i<length;i++){if(equals(array[i],item)){freq++}}
return freq}
arrays.frequency=frequency;function equals(array1,array2,equalsFunction){var equals=equalsFunction||collections.defaultEquals;if(array1.length!==array2.length){return!1}
var length=array1.length;for(var i=0;i<length;i++){if(!equals(array1[i],array2[i])){return!1}}
return!0}
arrays.equals=equals;function copy(array){return array.concat()}
arrays.copy=copy;function swap(array,i,j){if(i<0||i>=array.length||j<0||j>=array.length){return!1}
var temp=array[i];array[i]=array[j];array[j]=temp;return!0}
arrays.swap=swap;function toString(array){return'['+array.toString()+']'}
arrays.toString=toString;function forEach(array,callback){var lenght=array.length;for(var i=0;i<lenght;i++){if(callback(array[i])===!1){return}}}
arrays.forEach=forEach})(arrays=Collections.arrays||(Collections.arrays={}));var LinkedList=(function(){function LinkedList(){this.firstNode=null;this.lastNode=null;this.nElements=0}
LinkedList.prototype.add=function(item,index){if(collections.isUndefined(index)){index=this.nElements}
if(index<0||index>this.nElements||collections.isUndefined(item)){return!1}
var newNode=this.createNode(item);if(this.nElements===0){this.firstNode=newNode;this.lastNode=newNode}
else if(index===this.nElements){this.lastNode.next=newNode;this.lastNode=newNode}
else if(index===0){newNode.next=this.firstNode;this.firstNode=newNode}
else{var prev=this.nodeAtIndex(index-1);newNode.next=prev.next;prev.next=newNode}
this.nElements++;return!0};LinkedList.prototype.first=function(){if(this.firstNode!==null){return this.firstNode.element}
return undefined};LinkedList.prototype.last=function(){if(this.lastNode!==null){return this.lastNode.element}
return undefined};LinkedList.prototype.elementAtIndex=function(index){var node=this.nodeAtIndex(index);if(node===null){return undefined}
return node.element};LinkedList.prototype.indexOf=function(item,equalsFunction){var equalsF=equalsFunction||collections.defaultEquals;if(collections.isUndefined(item)){return-1}
var currentNode=this.firstNode;var index=0;while(currentNode!==null){if(equalsF(currentNode.element,item)){return index}
index++;currentNode=currentNode.next}
return-1};LinkedList.prototype.contains=function(item,equalsFunction){return(this.indexOf(item,equalsFunction)>=0)};LinkedList.prototype.remove=function(item,equalsFunction){var equalsF=equalsFunction||collections.defaultEquals;if(this.nElements<1||collections.isUndefined(item)){return!1}
var previous=null;var currentNode=this.firstNode;while(currentNode!==null){if(equalsF(currentNode.element,item)){if(currentNode===this.firstNode){this.firstNode=this.firstNode.next;if(currentNode===this.lastNode){this.lastNode=null}}
else if(currentNode===this.lastNode){this.lastNode=previous;previous.next=currentNode.next;currentNode.next=null}
else{previous.next=currentNode.next;currentNode.next=null}
this.nElements--;return!0}
previous=currentNode;currentNode=currentNode.next}
return!1};LinkedList.prototype.clear=function(){this.firstNode=null;this.lastNode=null;this.nElements=0};LinkedList.prototype.equals=function(other,equalsFunction){var eqF=equalsFunction||collections.defaultEquals;if(!(other instanceof collections.LinkedList)){return!1}
if(this.size()!==other.size()){return!1}
return this.equalsAux(this.firstNode,other.firstNode,eqF)};LinkedList.prototype.equalsAux=function(n1,n2,eqF){while(n1!==null){if(!eqF(n1.element,n2.element)){return!1}
n1=n1.next;n2=n2.next}
return!0};LinkedList.prototype.removeElementAtIndex=function(index){if(index<0||index>=this.nElements){return undefined}
var element;if(this.nElements===1){element=this.firstNode.element;this.firstNode=null;this.lastNode=null}
else{var previous=this.nodeAtIndex(index-1);if(previous===null){element=this.firstNode.element;this.firstNode=this.firstNode.next}
else if(previous.next===this.lastNode){element=this.lastNode.element;this.lastNode=previous}
if(previous!==null){element=previous.next.element;previous.next=previous.next.next}}
this.nElements--;return element};LinkedList.prototype.forEach=function(callback){var currentNode=this.firstNode;while(currentNode!==null){if(callback(currentNode.element)===!1){break}
currentNode=currentNode.next}};LinkedList.prototype.reverse=function(){var previous=null;var current=this.firstNode;var temp=null;while(current!==null){temp=current.next;current.next=previous;previous=current;current=temp}
temp=this.firstNode;this.firstNode=this.lastNode;this.lastNode=temp};LinkedList.prototype.toArray=function(){var array=[];var currentNode=this.firstNode;while(currentNode!==null){array.push(currentNode.element);currentNode=currentNode.next}
return array};LinkedList.prototype.size=function(){return this.nElements};LinkedList.prototype.isEmpty=function(){return this.nElements<=0};LinkedList.prototype.toString=function(){return collections.arrays.toString(this.toArray())};LinkedList.prototype.nodeAtIndex=function(index){if(index<0||index>=this.nElements){return null}
if(index===(this.nElements-1)){return this.lastNode}
var node=this.firstNode;for(var i=0;i<index;i++){node=node.next}
return node};LinkedList.prototype.createNode=function(item){return{element:item,next:null}};return LinkedList})();Collections.LinkedList=LinkedList;var Dictionary=(function(){function Dictionary(toStrFunction){this.table={};this.nElements=0;this.toStr=toStrFunction||collections.defaultToString}
Dictionary.prototype.getValue=function(key){var pair=this.table['$'+this.toStr(key)];if(collections.isUndefined(pair)){return undefined}
return pair.value};Dictionary.prototype.setValue=function(key,value){if(collections.isUndefined(key)||collections.isUndefined(value)){return undefined}
var ret;var k='$'+this.toStr(key);var previousElement=this.table[k];if(collections.isUndefined(previousElement)){this.nElements++;ret=undefined}
else{ret=previousElement.value}
this.table[k]={key:key,value:value};return ret};Dictionary.prototype.remove=function(key){var k='$'+this.toStr(key);var previousElement=this.table[k];if(!collections.isUndefined(previousElement)){delete this.table[k];this.nElements--;return previousElement.value}
return undefined};Dictionary.prototype.keys=function(){var array=[];for(var name in this.table){if(has(this.table,name)){var pair=this.table[name];array.push(pair.key)}}
return array};Dictionary.prototype.values=function(){var array=[];for(var name in this.table){if(has(this.table,name)){var pair=this.table[name];array.push(pair.value)}}
return array};Dictionary.prototype.forEach=function(callback){for(var name in this.table){if(has(this.table,name)){var pair=this.table[name];var ret=callback(pair.key,pair.value);if(ret===!1){return}}}};Dictionary.prototype.containsKey=function(key){return!collections.isUndefined(this.getValue(key))};Dictionary.prototype.clear=function(){this.table={};this.nElements=0};Dictionary.prototype.size=function(){return this.nElements};Dictionary.prototype.isEmpty=function(){return this.nElements<=0};Dictionary.prototype.toString=function(){var toret="{";this.forEach(function(k,v){toret=toret+"\n\t"+k.toString()+" : "+v.toString()});return toret+"\n}"};return Dictionary})();Collections.Dictionary=Dictionary;var LinkedDictionaryPair=(function(){function LinkedDictionaryPair(key,value){this.key=key;this.value=value}
LinkedDictionaryPair.prototype.unlink=function(){this.prev.next=this.next;this.next.prev=this.prev};return LinkedDictionaryPair})();var LinkedDictionary=(function(_super){__extends(LinkedDictionary,_super);function LinkedDictionary(toStrFunction){_super.call(this,toStrFunction);this.head=new LinkedDictionaryPair(null,null);this.tail=new LinkedDictionaryPair(null,null);this.head.next=this.tail;this.tail.prev=this.head}
LinkedDictionary.prototype.appendToTail=function(entry){var lastNode=this.tail.prev;lastNode.next=entry;entry.prev=lastNode;entry.next=this.tail;this.tail.prev=entry};LinkedDictionary.prototype.getLinkedDictionaryPair=function(key){if(collections.isUndefined(key)){return undefined}
var k='$'+this.toStr(key);var pair=(this.table[k]);return pair};LinkedDictionary.prototype.getValue=function(key){var pair=this.getLinkedDictionaryPair(key);if(!collections.isUndefined(pair)){return pair.value}
return undefined};LinkedDictionary.prototype.remove=function(key){var pair=this.getLinkedDictionaryPair(key);if(!collections.isUndefined(pair)){_super.prototype.remove.call(this,key);pair.unlink();return pair.value}
return undefined};LinkedDictionary.prototype.clear=function(){_super.prototype.clear.call(this);this.head.next=this.tail;this.tail.prev=this.head};LinkedDictionary.prototype.replace=function(oldPair,newPair){var k='$'+this.toStr(newPair.key);newPair.next=oldPair.next;newPair.prev=oldPair.prev;this.remove(oldPair.key);newPair.prev.next=newPair;newPair.next.prev=newPair;this.table[k]=newPair;++this.nElements};LinkedDictionary.prototype.setValue=function(key,value){if(collections.isUndefined(key)||collections.isUndefined(value)){return undefined}
var existingPair=this.getLinkedDictionaryPair(key);var newPair=new LinkedDictionaryPair(key,value);var k='$'+this.toStr(key);if(!collections.isUndefined(existingPair)){this.replace(existingPair,newPair);return existingPair.value}
else{this.appendToTail(newPair);this.table[k]=newPair;++this.nElements;return undefined}};LinkedDictionary.prototype.keys=function(){var array=[];this.forEach(function(key,value){array.push(key)});return array};LinkedDictionary.prototype.values=function(){var array=[];this.forEach(function(key,value){array.push(value)});return array};LinkedDictionary.prototype.forEach=function(callback){var crawlNode=this.head.next;while(crawlNode.next!=null){var ret=callback(crawlNode.key,crawlNode.value);if(ret===!1){return}
crawlNode=crawlNode.next}};return LinkedDictionary})(Dictionary);Collections.LinkedDictionary=LinkedDictionary;var MultiDictionary=(function(){function MultiDictionary(toStrFunction,valuesEqualsFunction,allowDuplicateValues){if(allowDuplicateValues===void 0){allowDuplicateValues=!1}
this.dict=new Dictionary(toStrFunction);this.equalsF=valuesEqualsFunction||collections.defaultEquals;this.allowDuplicate=allowDuplicateValues}
MultiDictionary.prototype.getValue=function(key){var values=this.dict.getValue(key);if(collections.isUndefined(values)){return[]}
return collections.arrays.copy(values)};MultiDictionary.prototype.setValue=function(key,value){if(collections.isUndefined(key)||collections.isUndefined(value)){return!1}
if(!this.containsKey(key)){this.dict.setValue(key,[value]);return!0}
var array=this.dict.getValue(key);if(!this.allowDuplicate){if(collections.arrays.contains(array,value,this.equalsF)){return!1}}
array.push(value);return!0};MultiDictionary.prototype.remove=function(key,value){if(collections.isUndefined(value)){var v=this.dict.remove(key);return!collections.isUndefined(v)}
var array=this.dict.getValue(key);if(collections.arrays.remove(array,value,this.equalsF)){if(array.length===0){this.dict.remove(key)}
return!0}
return!1};MultiDictionary.prototype.keys=function(){return this.dict.keys()};MultiDictionary.prototype.values=function(){var values=this.dict.values();var array=[];for(var i=0;i<values.length;i++){var v=values[i];for(var j=0;j<v.length;j++){array.push(v[j])}}
return array};MultiDictionary.prototype.containsKey=function(key){return this.dict.containsKey(key)};MultiDictionary.prototype.clear=function(){this.dict.clear()};MultiDictionary.prototype.size=function(){return this.dict.size()};MultiDictionary.prototype.isEmpty=function(){return this.dict.isEmpty()};return MultiDictionary})();Collections.MultiDictionary=MultiDictionary;var Heap=(function(){function Heap(compareFunction){this.data=[];this.compare=compareFunction||collections.defaultCompare}
Heap.prototype.leftChildIndex=function(nodeIndex){return(2*nodeIndex)+1};Heap.prototype.rightChildIndex=function(nodeIndex){return(2*nodeIndex)+2};Heap.prototype.parentIndex=function(nodeIndex){return Math.floor((nodeIndex-1)/2)};Heap.prototype.minIndex=function(leftChild,rightChild){if(rightChild>=this.data.length){if(leftChild>=this.data.length){return-1}
else{return leftChild}}
else{if(this.compare(this.data[leftChild],this.data[rightChild])<=0){return leftChild}
else{return rightChild}}};Heap.prototype.siftUp=function(index){var parent=this.parentIndex(index);while(index>0&&this.compare(this.data[parent],this.data[index])>0){collections.arrays.swap(this.data,parent,index);index=parent;parent=this.parentIndex(index)}};Heap.prototype.siftDown=function(nodeIndex){var min=this.minIndex(this.leftChildIndex(nodeIndex),this.rightChildIndex(nodeIndex));while(min>=0&&this.compare(this.data[nodeIndex],this.data[min])>0){collections.arrays.swap(this.data,min,nodeIndex);nodeIndex=min;min=this.minIndex(this.leftChildIndex(nodeIndex),this.rightChildIndex(nodeIndex))}};Heap.prototype.peek=function(){if(this.data.length>0){return this.data[0]}
else{return undefined}};Heap.prototype.add=function(element){if(collections.isUndefined(element)){return undefined}
this.data.push(element);this.siftUp(this.data.length-1);return!0};Heap.prototype.removeRoot=function(){if(this.data.length>0){var obj=this.data[0];this.data[0]=this.data[this.data.length-1];this.data.splice(this.data.length-1,1);if(this.data.length>0){this.siftDown(0)}
return obj}
return undefined};Heap.prototype.contains=function(element){var equF=collections.compareToEquals(this.compare);return collections.arrays.contains(this.data,element,equF)};Heap.prototype.size=function(){return this.data.length};Heap.prototype.isEmpty=function(){return this.data.length<=0};Heap.prototype.clear=function(){this.data.length=0};Heap.prototype.forEach=function(callback){collections.arrays.forEach(this.data,callback)};return Heap})();Collections.Heap=Heap;var Stack=(function(){function Stack(){this.list=new LinkedList()}
Stack.prototype.push=function(elem){return this.list.add(elem,0)};Stack.prototype.add=function(elem){return this.list.add(elem,0)};Stack.prototype.pop=function(){return this.list.removeElementAtIndex(0)};Stack.prototype.peek=function(){return this.list.first()};Stack.prototype.size=function(){return this.list.size()};Stack.prototype.contains=function(elem,equalsFunction){return this.list.contains(elem,equalsFunction)};Stack.prototype.isEmpty=function(){return this.list.isEmpty()};Stack.prototype.clear=function(){this.list.clear()};Stack.prototype.forEach=function(callback){this.list.forEach(callback)};return Stack})();Collections.Stack=Stack;var Queue=(function(){function Queue(){this.list=new LinkedList()}
Queue.prototype.enqueue=function(elem){return this.list.add(elem)};Queue.prototype.add=function(elem){return this.list.add(elem)};Queue.prototype.dequeue=function(){if(this.list.size()!==0){var el=this.list.first();this.list.removeElementAtIndex(0);return el}
return undefined};Queue.prototype.peek=function(){if(this.list.size()!==0){return this.list.first()}
return undefined};Queue.prototype.size=function(){return this.list.size()};Queue.prototype.contains=function(elem,equalsFunction){return this.list.contains(elem,equalsFunction)};Queue.prototype.isEmpty=function(){return this.list.size()<=0};Queue.prototype.clear=function(){this.list.clear()};Queue.prototype.forEach=function(callback){this.list.forEach(callback)};return Queue})();Collections.Queue=Queue;var PriorityQueue=(function(){function PriorityQueue(compareFunction){this.heap=new Heap(collections.reverseCompareFunction(compareFunction))}
PriorityQueue.prototype.enqueue=function(element){return this.heap.add(element)};PriorityQueue.prototype.add=function(element){return this.heap.add(element)};PriorityQueue.prototype.dequeue=function(){if(this.heap.size()!==0){var el=this.heap.peek();this.heap.removeRoot();return el}
return undefined};PriorityQueue.prototype.peek=function(){return this.heap.peek()};PriorityQueue.prototype.contains=function(element){return this.heap.contains(element)};PriorityQueue.prototype.isEmpty=function(){return this.heap.isEmpty()};PriorityQueue.prototype.size=function(){return this.heap.size()};PriorityQueue.prototype.clear=function(){this.heap.clear()};PriorityQueue.prototype.forEach=function(callback){this.heap.forEach(callback)};return PriorityQueue})();Collections.PriorityQueue=PriorityQueue;var Set=(function(){function Set(toStringFunction){this.dictionary=new Dictionary(toStringFunction)}
Set.prototype.contains=function(element){return this.dictionary.containsKey(element)};Set.prototype.add=function(element){if(this.contains(element)||collections.isUndefined(element)){return!1}
else{this.dictionary.setValue(element,element);return!0}};Set.prototype.intersection=function(otherSet){var set=this;this.forEach(function(element){if(!otherSet.contains(element)){set.remove(element)}
return!0})};Set.prototype.union=function(otherSet){var set=this;otherSet.forEach(function(element){set.add(element);return!0})};Set.prototype.difference=function(otherSet){var set=this;otherSet.forEach(function(element){set.remove(element);return!0})};Set.prototype.isSubsetOf=function(otherSet){if(this.size()>otherSet.size()){return!1}
var isSub=!0;this.forEach(function(element){if(!otherSet.contains(element)){isSub=!1;return!1}
return!0});return isSub};Set.prototype.remove=function(element){if(!this.contains(element)){return!1}
else{this.dictionary.remove(element);return!0}};Set.prototype.forEach=function(callback){this.dictionary.forEach(function(k,v){return callback(v)})};Set.prototype.toArray=function(){return this.dictionary.values()};Set.prototype.isEmpty=function(){return this.dictionary.isEmpty()};Set.prototype.size=function(){return this.dictionary.size()};Set.prototype.clear=function(){this.dictionary.clear()};Set.prototype.toString=function(){return collections.arrays.toString(this.toArray())};return Set})();Collections.Set=Set;var Bag=(function(){function Bag(toStrFunction){this.toStrF=toStrFunction||collections.defaultToString;this.dictionary=new Dictionary(this.toStrF);this.nElements=0}
Bag.prototype.add=function(element,nCopies){if(nCopies===void 0){nCopies=1}
if(collections.isUndefined(element)||nCopies<=0){return!1}
if(!this.contains(element)){var node={value:element,copies:nCopies};this.dictionary.setValue(element,node)}
else{this.dictionary.getValue(element).copies+=nCopies}
this.nElements+=nCopies;return!0};Bag.prototype.count=function(element){if(!this.contains(element)){return 0}
else{return this.dictionary.getValue(element).copies}};Bag.prototype.contains=function(element){return this.dictionary.containsKey(element)};Bag.prototype.remove=function(element,nCopies){if(nCopies===void 0){nCopies=1}
if(collections.isUndefined(element)||nCopies<=0){return!1}
if(!this.contains(element)){return!1}
else{var node=this.dictionary.getValue(element);if(nCopies>node.copies){this.nElements-=node.copies}
else{this.nElements-=nCopies}
node.copies-=nCopies;if(node.copies<=0){this.dictionary.remove(element)}
return!0}};Bag.prototype.toArray=function(){var a=[];var values=this.dictionary.values();var vl=values.length;for(var i=0;i<vl;i++){var node=values[i];var element=node.value;var copies=node.copies;for(var j=0;j<copies;j++){a.push(element)}}
return a};Bag.prototype.toSet=function(){var toret=new Set(this.toStrF);var elements=this.dictionary.values();var l=elements.length;for(var i=0;i<l;i++){var value=elements[i].value;toret.add(value)}
return toret};Bag.prototype.forEach=function(callback){this.dictionary.forEach(function(k,v){var value=v.value;var copies=v.copies;for(var i=0;i<copies;i++){if(callback(value)===!1){return!1}}
return!0})};Bag.prototype.size=function(){return this.nElements};Bag.prototype.isEmpty=function(){return this.nElements===0};Bag.prototype.clear=function(){this.nElements=0;this.dictionary.clear()};return Bag})();Collections.Bag=Bag;var BSTree=(function(){function BSTree(compareFunction){this.root=null;this.compare=compareFunction||collections.defaultCompare;this.nElements=0}
BSTree.prototype.add=function(element){if(collections.isUndefined(element)){return!1}
if(this.insertNode(this.createNode(element))!==null){this.nElements++;return!0}
return!1};BSTree.prototype.clear=function(){this.root=null;this.nElements=0};BSTree.prototype.isEmpty=function(){return this.nElements===0};BSTree.prototype.size=function(){return this.nElements};BSTree.prototype.contains=function(element){if(collections.isUndefined(element)){return!1}
return this.searchNode(this.root,element)!==null};BSTree.prototype.remove=function(element){var node=this.searchNode(this.root,element);if(node===null){return!1}
this.removeNode(node);this.nElements--;return!0};BSTree.prototype.inorderTraversal=function(callback){this.inorderTraversalAux(this.root,callback,{stop:!1})};BSTree.prototype.preorderTraversal=function(callback){this.preorderTraversalAux(this.root,callback,{stop:!1})};BSTree.prototype.postorderTraversal=function(callback){this.postorderTraversalAux(this.root,callback,{stop:!1})};BSTree.prototype.levelTraversal=function(callback){this.levelTraversalAux(this.root,callback)};BSTree.prototype.minimum=function(){if(this.isEmpty()){return undefined}
return this.minimumAux(this.root).element};BSTree.prototype.maximum=function(){if(this.isEmpty()){return undefined}
return this.maximumAux(this.root).element};BSTree.prototype.forEach=function(callback){this.inorderTraversal(callback)};BSTree.prototype.toArray=function(){var array=[];this.inorderTraversal(function(element){array.push(element);return!0});return array};BSTree.prototype.height=function(){return this.heightAux(this.root)};BSTree.prototype.searchNode=function(node,element){var cmp=null;while(node!==null&&cmp!==0){cmp=this.compare(element,node.element);if(cmp<0){node=node.leftCh}
else if(cmp>0){node=node.rightCh}}
return node};BSTree.prototype.transplant=function(n1,n2){if(n1.parent===null){this.root=n2}
else if(n1===n1.parent.leftCh){n1.parent.leftCh=n2}
else{n1.parent.rightCh=n2}
if(n2!==null){n2.parent=n1.parent}};BSTree.prototype.removeNode=function(node){if(node.leftCh===null){this.transplant(node,node.rightCh)}
else if(node.rightCh===null){this.transplant(node,node.leftCh)}
else{var y=this.minimumAux(node.rightCh);if(y.parent!==node){this.transplant(y,y.rightCh);y.rightCh=node.rightCh;y.rightCh.parent=y}
this.transplant(node,y);y.leftCh=node.leftCh;y.leftCh.parent=y}};BSTree.prototype.inorderTraversalAux=function(node,callback,signal){if(node===null||signal.stop){return}
this.inorderTraversalAux(node.leftCh,callback,signal);if(signal.stop){return}
signal.stop=callback(node.element)===!1;if(signal.stop){return}
this.inorderTraversalAux(node.rightCh,callback,signal)};BSTree.prototype.levelTraversalAux=function(node,callback){var queue=new Queue();if(node!==null){queue.enqueue(node)}
while(!queue.isEmpty()){node=queue.dequeue();if(callback(node.element)===!1){return}
if(node.leftCh!==null){queue.enqueue(node.leftCh)}
if(node.rightCh!==null){queue.enqueue(node.rightCh)}}};BSTree.prototype.preorderTraversalAux=function(node,callback,signal){if(node===null||signal.stop){return}
signal.stop=callback(node.element)===!1;if(signal.stop){return}
this.preorderTraversalAux(node.leftCh,callback,signal);if(signal.stop){return}
this.preorderTraversalAux(node.rightCh,callback,signal)};BSTree.prototype.postorderTraversalAux=function(node,callback,signal){if(node===null||signal.stop){return}
this.postorderTraversalAux(node.leftCh,callback,signal);if(signal.stop){return}
this.postorderTraversalAux(node.rightCh,callback,signal);if(signal.stop){return}
signal.stop=callback(node.element)===!1};BSTree.prototype.minimumAux=function(node){while(node.leftCh!==null){node=node.leftCh}
return node};BSTree.prototype.maximumAux=function(node){while(node.rightCh!==null){node=node.rightCh}
return node};BSTree.prototype.heightAux=function(node){if(node===null){return-1}
return Math.max(this.heightAux(node.leftCh),this.heightAux(node.rightCh))+1};BSTree.prototype.insertNode=function(node){var parent=null;var position=this.root;var cmp=null;while(position!==null){cmp=this.compare(node.element,position.element);if(cmp===0){return null}
else if(cmp<0){parent=position;position=position.leftCh}
else{parent=position;position=position.rightCh}}
node.parent=parent;if(parent===null){this.root=node}
else if(this.compare(node.element,parent.element)<0){parent.leftCh=node}
else{parent.rightCh=node}
return node};BSTree.prototype.createNode=function(element){return{element:element,leftCh:null,rightCh:null,parent:null}};return BSTree})();Collections.BSTree=BSTree})(Collections=Utils.Collections||(Utils.Collections={}))})(Utils||(Utils={}));var Utils;(function(Utils){var Colors=(function(){function Colors(){}
Colors.float32ColorToARGB=function(float32Color){var a=(float32Color&0xff000000)>>>24;var r=(float32Color&0xff0000)>>>16;var g=(float32Color&0xff00)>>>8;var b=float32Color&0xff;var result=[a,r,g,b];return result};Colors._componentToHex=function(c){var hex=c.toString(16);return hex.length==1?"0"+hex:hex};Colors.rgbToHexString=function(rgb){Colors.coalesce(rgb);return"#"+Colors._componentToHex(rgb[0])+Colors._componentToHex(rgb[1])+Colors._componentToHex(rgb[2])};Colors.argbToHexString=function(argb){return"#"+Colors._componentToHex(argb[0])+Colors._componentToHex(argb[1])+Colors._componentToHex(argb[2])+Colors._componentToHex(argb[3])};Colors.coalesce=function(arr){for(var i=1;i<arr.length;i++){if(typeof(arr[i])==='undefined')
arr[i]=arr[i-1]}};return Colors})();Utils.Colors=Colors})(Utils||(Utils={}));var Utils;(function(Utils){var Dates=(function(){function Dates(){}
Dates.getTimeStamp=function(){return new Date().getTime()};return Dates})();Utils.Dates=Dates})(Utils||(Utils={}));var Utils;(function(Utils){var Device=(function(){function Device(){}
Device.getPixelRatio=function(ctx){var dpr=window.devicePixelRatio||1;var bsr=ctx.webkitBackingStorePixelRatio||ctx.mozBackingStorePixelRatio||ctx.msBackingStorePixelRatio||ctx.oBackingStorePixelRatio||ctx.backingStorePixelRatio||1;return dpr/bsr};Device.isTouch=function(){return!!("ontouchstart" in window)||window.navigator.msMaxTouchPoints>0};return Device})();Utils.Device=Device})(Utils||(Utils={}));var Utils;(function(Utils){var Documents=(function(){function Documents(){}
Documents.isInIFrame=function(){try{return window.self!==window.top}
catch(e){return!0}};Documents.supportsFullscreen=function(){var doc=document.documentElement;var support=doc.requestFullscreen||doc.mozRequestFullScreen||doc.webkitRequestFullScreen||doc.msRequestFullscreen;return support!=undefined};Documents.isHidden=function(){var prop=Documents.getHiddenProp();if(!prop)
return!1;return document[prop]};Documents.getHiddenProp=function(){var prefixes=['webkit','moz','ms','o'];if('hidden' in document)
return'hidden';for(var i=0;i<prefixes.length;i++){if((prefixes[i]+'Hidden')in document)
return prefixes[i]+'Hidden'}
return null};return Documents})();Utils.Documents=Documents})(Utils||(Utils={}));var Utils;(function(Utils){var Events=(function(){function Events(){}
Events.debounce=function(fn,debounceDuration){debounceDuration=debounceDuration||100;return function(){if(!fn.debouncing){var args=Array.prototype.slice.apply(arguments);fn.lastReturnVal=fn.apply(window,args);fn.debouncing=!0}
clearTimeout(fn.debounceTimeout);fn.debounceTimeout=setTimeout(function(){fn.debouncing=!1},debounceDuration);return fn.lastReturnVal}};return Events})();Utils.Events=Events})(Utils||(Utils={}));var Utils;(function(Utils){var Files=(function(){function Files(){}
Files.simplifyMimeType=function(mime){switch(mime){case 'text/plain':return'txt';case 'image/jpeg':return'jpg';case 'application/msword':return'doc';case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':return'docx';default:var parts=mime.split('/');return parts[parts.length-1]}};return Files})();Utils.Files=Files})(Utils||(Utils={}));var Utils;(function(Utils){var Keyboard=(function(){function Keyboard(){}
Keyboard.getCharCode=function(e){var charCode=(typeof e.which=="number")?e.which:e.keyCode;return charCode};return Keyboard})();Utils.Keyboard=Keyboard})(Utils||(Utils={}));var Utils;(function(Utils){var Maths;(function(Maths){var Vector=(function(){function Vector(x,y){this.X=x;this.Y=y}
Vector.prototype.get=function(){return new Vector(this.X,this.Y)};Vector.prototype.set=function(x,y){this.X=x;this.Y=y};Vector.prototype.add=function(v){this.X+=v.X;this.Y+=v.Y};Vector.add=function(v1,v2){return new Vector(v1.X+v2.X,v1.Y+v2.Y)};Vector.prototype.sub=function(v){this.X-=v.X;this.Y-=v.Y};Vector.sub=function(v1,v2){return new Vector(v1.X-v2.X,v1.Y-v2.Y)};Vector.prototype.mult=function(n){this.X=this.X*n;this.Y=this.Y*n};Vector.mult=function(v1,v2){return new Vector(v1.X*v2.X,v1.Y*v2.Y)};Vector.multN=function(v1,n){return new Vector(v1.X*n,v1.Y*n)};Vector.prototype.Div=function(n){this.X=this.X/n;this.Y=this.Y/n};Vector.div=function(v1,v2){return new Vector(v1.X/v2.X,v1.Y/v2.Y)};Vector.divN=function(v1,n){return new Vector(v1.X/n,v1.Y/n)};Vector.prototype.mag=function(){return Math.sqrt(this.X*this.X+this.Y*this.Y)};Vector.prototype.magSq=function(){return(this.X*this.X+this.Y*this.Y)};Vector.prototype.normalise=function(){var m=this.mag();if(m!=0&&m!=1){this.Div(m)}};Vector.prototype.limit=function(max){if(this.magSq()>max*max){this.normalise();this.mult(max)}};Vector.prototype.equals=function(v){return(this.X==v.X&&this.Y==v.Y)};Vector.prototype.heading=function(){var angle=Math.atan2(-this.Y,this.X);return-1*angle};Vector.random2D=function(){return Vector.fromAngle((Math.random()*Math.TAU))};Vector.fromAngle=function(angle){return new Vector(Math.cos(angle),Math.sin(angle))};return Vector})();Maths.Vector=Vector})(Maths=Utils.Maths||(Utils.Maths={}))})(Utils||(Utils={}));var Utils;(function(Utils){var Measurements;(function(Measurements){var Size=(function(){function Size(width,height){this.width=width;this.height=height}
return Size})();Measurements.Size=Size;var Dimensions=(function(){function Dimensions(){}
Dimensions.fitRect=function(width1,height1,width2,height2){var ratio1=height1/width1;var ratio2=height2/width2;var width,height,scale;if(ratio1<ratio2){scale=width2/width1;width=width1*scale;height=height1*scale}
if(ratio2<ratio1){scale=height2/height1;width=width1*scale;height=height1*scale}
return new Size(Math.floor(width),Math.floor(height))};Dimensions.hitRect=function(x,y,w,h,mx,my){if(mx>x&&mx<(x+w)&&my>y&&my<(y+h)){return!0}
return!1};return Dimensions})();Measurements.Dimensions=Dimensions})(Measurements=Utils.Measurements||(Utils.Measurements={}))})(Utils||(Utils={}));var Utils;(function(Utils){var Numbers=(function(){function Numbers(){}
Numbers.numericalInput=function(event){if(event.keyCode==46||event.keyCode==8||event.keyCode==9||event.keyCode==27||(event.keyCode==65&&event.ctrlKey===!0)||(event.keyCode>=35&&event.keyCode<=39)){return!0}
else{if(event.shiftKey||(event.keyCode<48||event.keyCode>57)&&(event.keyCode<96||event.keyCode>105)){event.preventDefault();return!1}
return!0}};return Numbers})();Utils.Numbers=Numbers})(Utils||(Utils={}));var Utils;(function(Utils){var Storage=(function(){function Storage(){}
Storage.clear=function(storageType){if(storageType===void 0){storageType=Utils.StorageType.memory}
switch(storageType.value){case Utils.StorageType.memory.value:this._memoryStorage={};break;case Utils.StorageType.session.value:sessionStorage.clear();break;case Utils.StorageType.local.value:localStorage.clear();break}};Storage.clearExpired=function(storageType){if(storageType===void 0){storageType=Utils.StorageType.memory}
var items=this.getItems(storageType);for(var i=0;i<items.length;i++){var item=items[i];if(this._isExpired(item)){this.remove(item.key)}}};Storage.get=function(key,storageType){if(storageType===void 0){storageType=Utils.StorageType.memory}
var data;switch(storageType.value){case Utils.StorageType.memory.value:data=this._memoryStorage[key];break;case Utils.StorageType.session.value:data=sessionStorage.getItem(key);break;case Utils.StorageType.local.value:data=localStorage.getItem(key);break}
if(!data)
return null;var item=JSON.parse(data);if(this._isExpired(item))
return null;item.key=key;return item};Storage._isExpired=function(item){if(new Date().getTime()<item.expiresAt){return!1}
return!0};Storage.getItems=function(storageType){if(storageType===void 0){storageType=Utils.StorageType.memory}
var items=[];switch(storageType.value){case Utils.StorageType.memory.value:var keys=Object.keys(this._memoryStorage);for(var i=0;i<keys.length;i++){var item=this.get(keys[i],Utils.StorageType.memory);if(item){items.push(item)}}
break;case Utils.StorageType.session.value:for(var i=0;i<sessionStorage.length;i++){var key=sessionStorage.key(i);var item=this.get(key,Utils.StorageType.session);if(item){items.push(item)}}
break;case Utils.StorageType.local.value:for(var i=0;i<localStorage.length;i++){var key=localStorage.key(i);var item=this.get(key,Utils.StorageType.local);if(item){items.push(item)}}
break}
return items};Storage.remove=function(key,storageType){if(storageType===void 0){storageType=Utils.StorageType.memory}
switch(storageType.value){case Utils.StorageType.memory.value:delete this._memoryStorage[key];break;case Utils.StorageType.session.value:sessionStorage.removeItem(key);break;case Utils.StorageType.local.value:localStorage.removeItem(key);break}};Storage.set=function(key,value,expirationSecs,storageType){if(storageType===void 0){storageType=Utils.StorageType.memory}
var expirationMS=expirationSecs*1000;var record=new Utils.StorageItem();record.value=value;record.expiresAt=new Date().getTime()+expirationMS;switch(storageType.value){case Utils.StorageType.memory.value:this._memoryStorage[key]=JSON.stringify(record);break;case Utils.StorageType.session.value:sessionStorage.setItem(key,JSON.stringify(record));break;case Utils.StorageType.local.value:localStorage.setItem(key,JSON.stringify(record));break}
return record};Storage._memoryStorage={};return Storage})();Utils.Storage=Storage})(Utils||(Utils={}));var Utils;(function(Utils){var StorageItem=(function(){function StorageItem(){}
return StorageItem})();Utils.StorageItem=StorageItem})(Utils||(Utils={}));var Utils;(function(Utils){var StorageType=(function(){function StorageType(value){this.value=value}
StorageType.prototype.toString=function(){return this.value};StorageType.memory=new StorageType("memory");StorageType.session=new StorageType("session");StorageType.local=new StorageType("local");return StorageType})();Utils.StorageType=StorageType})(Utils||(Utils={}));var Utils;(function(Utils){var Strings=(function(){function Strings(){}
Strings.ellipsis=function(text,chars){if(text.length<=chars)
return text;var trimmedText=text.substr(0,chars);var lastSpaceIndex=trimmedText.lastIndexOf(" ");if(lastSpaceIndex!=-1){trimmedText=trimmedText.substr(0,Math.min(trimmedText.length,lastSpaceIndex))}
return trimmedText+"&hellip;"};Strings.htmlDecode=function(encoded){var div=document.createElement('div');div.innerHTML=encoded;return div.firstChild.nodeValue};return Strings})();Utils.Strings=Strings})(Utils||(Utils={}));var Utils;(function(Utils){var Urls=(function(){function Urls(){}
Urls.getHashParameter=function(key,doc){if(!doc)
doc=window.document;var regex=new RegExp("#.*[?&]"+key+"=([^&]+)(&|$)");var match=regex.exec(doc.location.hash);return(match?decodeURIComponent(match[1].replace(/\+/g," ")):null)};Urls.setHashParameter=function(key,value,doc){if(!doc)
doc=window.document;var kvp=this.updateURIKeyValuePair(doc.location.hash.replace('#?',''),key,value);var newHash="#?"+kvp;var url=doc.URL;var index=url.indexOf('#');if(index!=-1){url=url.substr(0,url.indexOf('#'))}
doc.location.replace(url+newHash)};Urls.getQuerystringParameter=function(key,w){if(!w)
w=window;return this.getQuerystringParameterFromString(key,w.location.search)};Urls.getQuerystringParameterFromString=function(key,querystring){key=key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regex=new RegExp("[\\?&]"+key+"=([^&#]*)");var match=regex.exec(querystring);return(match?decodeURIComponent(match[1].replace(/\+/g," ")):null)};Urls.setQuerystringParameter=function(key,value,doc){if(!doc)
doc=window.document;var kvp=this.updateURIKeyValuePair(doc.location.hash.replace('#?',''),key,value);window.location.search=kvp};Urls.updateURIKeyValuePair=function(uriSegment,key,value){key=encodeURIComponent(key);value=encodeURIComponent(value);var kvp=uriSegment.split('&');if(kvp[0]=="")
kvp.shift();var i=kvp.length;var x;while(i--){x=kvp[i].split('=');if(x[0]==key){x[1]=value;kvp[i]=x.join('=');break}}
if(i<0){kvp[kvp.length]=[key,value].join('=')}
return kvp.join('&')};Urls.getUrlParts=function(url){var a=document.createElement('a');a.href=url;return a};Urls.convertToRelativeUrl=function(url){var parts=this.getUrlParts(url);var relUri=parts.pathname+parts.searchWithin;if(!relUri.startsWith("/")){relUri="/"+relUri}
return relUri};return Urls})();Utils.Urls=Urls})(Utils||(Utils={}))