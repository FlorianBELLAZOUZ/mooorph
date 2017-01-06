// morph one tree into another tree
// (obj, obj) -> obj
// no parent
//   -> same: diff and walk children
//   -> not same: replace and return
// old node doesn't exist
//   -> insert new node
// new node doesn't exist
//   -> delete old node
// nodes are not the same
//   -> diff nodes and apply patch to old node
// nodes are the same
//   -> walk all child nodes and append to old node
const morph = (oldTree,newTree,options={})=>{
  options = Object.assign(defaultOptions, options)
  debugger
  var tree = walk(newTree,oldTree,options)
  return tree
}

const defaultOptions = {
  childrenKey:'children',
  isSame:(oldNode,newNode)=>oldNode.name===newNode.name,
  remove:(oldNode,newNode,parent,index)=>parent.children.splice(index,1),
  create:(oldNode,newNode,parent,index)=>parent.children.push(newNode),
  replace:(oldNode,newNode,parent,index)=>parent.children[index]=newNode,
  morph:(oldNode,newNode,parent,index)=>{
    newNode = Object.assign({},newNode)
    delete newNode['children']
    Object.assign(oldNode,newNode)
  }
}

// walk and morph a dom tree
// (obj, obj) -> obj
function walk (newNode,oldNode,options) {
  if (!oldNode) {
    return newNode
  } else if (!newNode) {
    return null
  } else if (newNode !== oldNode) {
    if (!options.isSame(oldNode,newNode)) {
      return newNode
    } else {
      console.log('morph')
      options.morph(oldNode,newNode)
      updateChildren(newNode,oldNode,options)
      return oldNode
    }
  } else {
    updateChildren(newNode,oldNode,options)
    return oldNode
  }
}

// update the children of elements
// (obj, obj) -> null
function updateChildren (newNode,oldNode,options) {
  if (!newNode[options.childrenKey] || !oldNode[options.childrenKey]) return

  var newLength = newNode[options.childrenKey].length
  var oldLength = oldNode[options.childrenKey].length
  var length = Math.max(oldLength, newLength)

  var toRemove = []

  for (var i = 0; i < length; i++) {
    var newChildNode = newNode[options.childrenKey][i]
    var oldChildNode = oldNode[options.childrenKey][i]
    var retChildNode = walk(newChildNode,oldChildNode,options)
    if (!retChildNode) {
      if (oldChildNode) {
        console.log('remove')
        toRemove.push([oldChildNode,newChildNode,oldNode,i])
      }
    } else if (!oldChildNode) {
      if (retChildNode) {
        console.log('create')
        options.create(oldChildNode,newChildNode,oldNode,i)
      }
    } else if (retChildNode !== oldChildNode) {
      console.log('replace')
      options.replace(oldChildNode,newChildNode,oldNode,i)
    }
  }

  for(var y=0;y<toRemove.length;y++)options.remove.apply(0,toRemove[y])
}

module.exports = morph
