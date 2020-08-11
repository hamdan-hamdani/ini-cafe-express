const productModels = require('../models/product')
const helper = require('../helpers/helpers')

const product = {
  getProductById: (req, res) => {
    const id = req.params.id
    productModels.getProductById(id)
      .then((result) => {
        const resultProduct = result
        if (result.length === 0) {
          const message = {
            message: 'id not valid'
          }
          res.json(message)
        } else {
          helper.responseGetAll(res, resultProduct, 200)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllProduct: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const order = req.query.order
    const idCategories = req.query.idCategories
    const page = req.query.page
    const limit = req.query.limit

    if (page) {
      productModels.getPagination(page, limit)
        .then(result => {
          const resultProduct = result
          productModels.getAllProduct()
            .then(async (result) => {
              const resultLength = await result.length
              helper.responsePagination(res, resultProduct, 200, null, page, limit, resultLength)
            })
        })
        .catch(err => console.log(err))
    } else if (idCategories) {
      productModels.getProductSortByIdCategory(idCategories)
        .then(result => {
          const resultProduct = result
          if (resultProduct.length !== 0) {
            helper.responseGetAll(res, resultProduct, 200)
          } else {
            const massage = {
              message: 'Data not found'
            }
            res.json(massage)
          }
        })
        .catch(err => console.log(err))
    } else if (sort && order) {
      productModels.getProductSortByOrder(sort, order)
        .then(result => {
          const resultProduct = result
          if (resultProduct.length !== 0) {
            helper.responseGetAll(res, resultProduct, 200)
          } else {
            const massage = {
              message: 'Data not found'
            }
            res.json(massage)
          }
        })
        .catch((err) => {
          const massage = {
            message: `Column ${sort} not found`
          }
          res.json(massage)
          console.log(err)
        })
    } else if (sort) {
      productModels.getProductSort(sort)
        .then(result => {
          const resultProduct = result
          if (resultProduct.length !== 0) {
            helper.responseGetAll(res, resultProduct, 200)
          } else {
            const massage = {
              message: 'Data not found'
            }
            res.json(massage)
          }
        })
        .catch(err => {
          const massage = {
            massage: `Column ${sort} not found`
          }
          res.json(massage)
          console.log(err)
        })
    } else if (search) {
      productModels.getProductBySearch(search)
        .then((result) => {
          const resultProduct = result
          if (resultProduct.length !== 0) {
            helper.responseGetAll(res, resultProduct, 200)
          } else {
            const message = {
              message: 'Data not found'
            }
            res.json(message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      productModels.getAllProduct()
        .then((result) => {
          const resultProduct = result
          helper.responseGetAll(res, resultProduct, 200)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  updateProduct: (req, res) => {
    const id = req.params.id
    const {
      idCategory,
      nameProduct,
      price,
      image,
      qty
    } = req.body
    const data = {
      idCategory,
      nameProduct,
      price,
      image,
      qty,
      updatedAt: new Date()
    }
    productModels.updateProduct(id, data)
      .then(() => {
        // const resultProduct = result.affectedRows
        helper.responseGetAll(res, data, 200)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteProduct: (req, res) => {
    const id = req.params.id
    productModels.deleteProduct(id)
      .then(() => {
        const resultProduct = {
          message: `Delete Data success `
        }
        helper.responseGetAll(res, resultProduct, 200)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertProduct: (req, res) => {
    const {
      nameProduct,
      price,
      image,
      qty,
      idCategory
    } = req.body
    const data = {
      idCategory,
      nameProduct,
      price,
      image,
      qty
    }
    productModels.insertProduct(data)
      .then(() => {
        // const resultProduct = result.affectedRows
        helper.responseGetAll(res, data, 200)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = product