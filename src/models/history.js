const connection = require('../configs/db')

const history = {
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM history WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getHistoryByAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM history', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getHistoryInsert: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO history SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getHistoryUpdate: (data, id) => {
    console.log(data, id)
    return new Promise((resolve, reject) => {
      connection.query('UPDATE history SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getHistoryDelete: (id) => {
    console.log(id)
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM history WHERE id = ? ', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = history
