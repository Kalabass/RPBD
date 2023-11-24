import * as pg from "pg"

// const pool = new pg.Pool({
//     user: 'students_2221_11',
//     password: 'kalabass22',
//     host: 'pgdb.uni-dubna.ru',
//     database: 'students_2221_11',
//     port: 5432
// })

const pool = new pg.Pool({
    user: 'postgres',
    password: 'kalabass2299657',
    host: 'localhost',
    database: 'ZAVOD',
    port: 3000
})

export default pool;