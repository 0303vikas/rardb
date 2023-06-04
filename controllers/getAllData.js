

// Create connection to SQLite database
// @ts-ignore
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './db/rarbg_db.sqlite',
    },
  });

// @ts-ignore
const getAll = async () => {
    try{
       console.log( knex
        .select('*')
        .from('items')
        )

    } catch (e) {
        console.log(e)
    }
    

}

module.exports = getAll


module.exports = getAll