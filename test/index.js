const Should = require('chai').Should()
const Trees = require('./utils/trees')
const Clone = require('clone')
const Morph = require('..')

describe('Morph',()=>{
  it('should morph the tree simple',()=>{
    let tree = Clone(Trees.a)
    Morph(tree,Trees.b)

    tree.should.be.deep.equal(Trees.b)
    tree.should.be.not.equal(Trees.b)
  })

  it('should throw good path',()=>{
    let tree = Clone(Trees.a)
    const paths = [
      [],
      [0],
      [0,0],
      [0,1],
      [0,2],
      [1],
      [1,0],
      [1,1],
    ]

    let i = 0

    Morph(tree,Trees.b,{isSame:(oldEl,newEl,path)=>{
      paths[i++].should.be.deep.equal(path)
      return true
    }})
  })

  it('should skip',()=>{
    let tree = Clone(Trees.a)

    const skipNames = ['foo','super']

    const paths = [
      [],
      [0],
      [0,1],
      [0,2],
      [1],
      [1,1],
    ]

    let i = 0

    const opts = {
      isSame:(oldEl,newEl,path)=>{
        paths[i++].should.be.deep.equal(path)
        return true
      },
      skip:(oldEl,newEl,path)=>{
        if(!oldEl) return false
        return skipNames.some(name=>name==oldEl.name)
      }
    }

    Morph(tree,Trees.b,opts)
  })
})
