// import IDB from 'idb'

let idb = { }
if (process.browser) {
  idb = {
    get(key) {
      const data = window.localStorage.getItem(key)
      return JSON.parse(data)
    },
    set(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value))
    },
    delete(key) {
      window.localStorage.removeItem(key)
    }
  }
}

export default idb
// const dbPromise = idb.open('surgas', 3, (upgradeDB) => {
//   upgradeDB.createObjectStore('surgasIdbx')
// })

// export default {
//   get(key) {
//     return dbPromise.then(db => {
//       return db.transaction('surgasIdbx')
//         .objectStore('surgasIdbx').get(key)
//     })
//   },
//   set(key, val) {
//     return dbPromise.then(db => {
//       const tx = db.transaction('surgasIdbx', 'readwrite')
//       tx.objectStore('surgasIdbx').put(val, key)
//       return tx.complete
//     })
//   },
//   delete(key) {
//     return dbPromise.then(db => {
//       const tx = db.transaction('surgasIdbx', 'readwrite')
//       tx.objectStore('surgasIdbx').delete(key)
//       return tx.complete
//     })
//   },
//   clear() {
//     return dbPromise.then(db => {
//       const tx = db.transaction('surgasIdbx', 'readwrite')
//       tx.objectStore('surgasIdbx').clear()
//       return tx.complete
//     })
//   },
//   keys() {
//     return dbPromise.then(db => {
//       const tx = db.transaction('surgasIdbx')
//       const keys = []
//       const store = tx.objectStore('surgasIdbx')
//         ; (store.iterateKeyCursor || store.iterateCursor).call(store, (cursor) => {
//           if (!cursor) return
//           keys.push(cursor.key)
//           cursor.continue()
//         })
//       return tx.complete.then(() => keys)
//     })
//   }
// }