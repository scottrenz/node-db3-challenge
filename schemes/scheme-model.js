const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
};

function find() {
  return db('schemes') // remember to return the call to db()
    .then(schemes => {
      return schemes;
    });
}

function findById(id) {
    return db('schemes') // remember to return the call to db()
      .where({ id: id })
      .then(schemes => {
        if (schemes.length === 0)
        return null
        else
        return schemes
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
    return db('schemes') // remember to return the call to db()
    .insert(scheme)
    .then(ids => {
     return findById(ids[0])
  })
  }

function getmax(idn) {
    return db.select('mstep').from('stepmax').where({scheme_id: idn})
    .then(result => {
    return result
}
 )
}

  function addStep(scheme,idn) {
    scheme.scheme_id = idn
    return getmax(idn)
    .then( result => {
        scheme.step_number = result[0].mstep + 1
        return db('steps') // remember to return the call to db()
     .insert(scheme)
    .then(ids => {
     return scheme
  })
})
}

  function update(changes,id) {
       return db('schemes') // remember to return the call to db()
       .where({ id: id })
       .update(changes)
       .then(schemes => {
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
