const connection = require('../configs/db')

const product = {
  getPagination: (page, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product LIMIT ${limit} OFFSET ${(page - 1) * limit}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product where id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductSortByIdCategory: (idCategory) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT product.nameProduct, product.price ,category.nameCategory, category.id FROM product INNER JOIN category ON product.idCategory=category.id WHERE category.id = ?', idCategory, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductSortByOrder: (nameProduct, order) => {
    console.log(nameProduct)
    console.log(order)
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product ORDER BY ?? desc', [nameProduct, order], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductSort: (nameProduct) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product ORDER BY ${nameProduct}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductBySearch: (search) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product where nameProduct LIKE ? ', `%${search}%`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllProduct: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT product.*, category.nameCategory FROM product INNER JOIN category ON product.idCategory = category.id', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteProduct: (id) => {
    console.log(id)
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertProduct: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = product