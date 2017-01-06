const a = {
  name:'world',
  children:[
    {
      name:'friends',
      children:[
        {name:'foo'},
        {name:'nice'},
        {name:'hi'},
      ],
    },
    {
      name:'hereos',
      children:[
        {name:'super'},
        {name:'awesome'},
      ]
    }
  ]
}

const b = {
  name:'world',
  children:[
    {
      name:'friends',
      children:[
        {name:'paf'},
        {name:'pif'},
        {name:'hi'},
      ],
    },
    {
      name:'hereos',
      children:[
        {name:'super'},
        {name:'awesome'},
        {name:'oooOOYEAH'},
      ]
    },
    {
      name:'newOne',
      children:[
        {name:'dat'},
        {name:'dam'},
      ]
    }
  ]
}

module.exports = {a,b}
