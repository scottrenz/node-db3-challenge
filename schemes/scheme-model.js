const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
  return db('schemes') // remember to return the call to db()
    .then(schemes => {
      return schemes;
    });
}

function findById(id) {
    console.log('findbyid',id)
    return db('schemes') // remember to return the call to db()
      .where({ id: id })
      .then(schemes => {
        console.log('findbyid return schemes',schemes)
        return schemes;
      });
  }
  
  function findSteps(id) {
    return db('schemesteps') // remember to return the call to db()
      .where({ scheme_id: id })
      .then(schemes => {
        const newSchemes = []
        function makeNew (item,ix,arr) {
            newSchemes.push({scheme_name: item.scheme_name, step_number: item.step_number, instructions: item.instructions})
          }
          schemes.map(makeNew)
        return newSchemes;
      });
  }
  
  function add(scheme) {
      console.log('add',scheme)
    return db('schemes') // remember to return the call to db()
    .insert(scheme)
    .then(ids => {
        console.log('ids',ids)
        if (ids[0])
     return findById(ids[0])
     else
     return null
  })
  }

  function update(changes,id) {
    console.log('changes',changes)
       return db('schemes') // remember to return the call to db()
       .where({ id: id })
       .update(changes)
       .then(schemes => {
           console.log('scheme',schemes)
           return schemes;
         });
     }

     function remove(id) {
        const oldScheme = findById(id)
           return db('schemes') // remember to return the call to db()
           .where({ id: id })
           .del(id)
           .then(ids => {
               if (ids)
               return oldScheme;
               else
               return null
             });
         }
