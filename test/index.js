const Should = require('chai').Should()
const Trees = require('./trees')
const Clone = require('clone')
const Morph = require('..')

describe('Morph',()=>{
  it('should morph the tree simple',()=>{
    let tree = Clone(Trees.a)
    Morph(tree,Trees.b)

    tree.should.be.deep.equal(Trees.b)
  })
})
