Mooorph
=========

**An agnostic tree morphing**

Basic Usage
------

```js
const Morph = require('mooorph')

const a = {
  name:'world',
  children:[
    {name:'hero',x:100,y:100,},
    {name:'coin',x:20,y:30,},
  ]
}

const b = {
  name:'world',
  children:[
    {name:'hero',x:100,y:100,},
    {name:'coin',x:20,y:30,},
    {name:'coin',x:20,y:30,},
    {name:'dog',x:20,y:50,},
  ]
}

Morph(a,b) // a deep equal b && a === Morph(a,b)
```

API
------

### Morph :: (oldTree, newTree, options={}) => oldTree:Tree

options.childrenKey = 'children'
options.isSame = (oldNode, newNode)=>boolean
options.morph = (oldNode, newNode, oldParent, path)=>undefined
options.remove = (oldNode, newNode, oldParent, path)=>undefined
options.create = (oldNode, newNode, oldParent, path)=>undefined
