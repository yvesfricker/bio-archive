



// Supabase client is used to connect to the database


// import pg from 'pg'

// const { Client, Pool } = pg

// let options = {

//     user: 'postgres',
//     password: import.meta.env.VITE_PG_PASSWORD,
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres',

// }


// if (import.meta.env.MODE === "production" || import.meta.env.MODE === "staging") {
//     if (import.meta.env.PROD) {
//         options.host = "postgres-db"
//     } else {
//         options.host = "postgres-db"
//     }
// } else {

// }


// let pool: pg.Pool


// export async function initPgPool(url = "", data = {}) {
//     console.log("in INIT pg client with password")

//     if (!pool) {

//         pool = new Pool(options)

//         pool.on('error', (err: Error, client) => {
//             console.error('Unexpected error on idle client', err) // your callback here
//             // process.exit(-1)
//         })


//         try {
//             await pool.connect()
//         } catch (err) {
//             console.log(err)
//         }

//         try {
//             const res = await pool.query('SELECT $1::text as message', ['Hello world! from initPgPool'])
//             console.log(res.rows[0].message) // Hello world!
//         } catch (err) {
//             console.error(err);
//         }
//     }

// }

// export async function testPgPool(url = "", data = {}) {
//     console.log("in TEST pg client")
//     if (pool) {
//         try {
//             const res = await pool.query('SELECT $1::text as message', ['Hello world! from testPgPool'])
//             console.log(res.rows[0].message) // Hello world!
//         } catch (err) {
//             console.error(err);
//         }
//     } else {
//         initPgPool()
//     }
// }

// export async function getPool() {
//     if (pool) {
//         return pool
//     } else {
//         initPgPool()
//         return pool
//     }
// }


//  Example
// // export async function selectData(url = ", data = {}) {
// //         try {
// //             const res = await pool.query('SELECT $1::text as message', ['Hello world! from testPgPool'])
// //             console.log(res.rows[0].message) // Hello world!
// //         } catch (err) {
// //             console.error(err);
// //         }
// // }

