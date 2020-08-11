module.exports = {
  responsePagination: (res, result, status, err, page, limit, resultLength) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.status_code = status
    resultPrint.pagination = {
      total: resultLength,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(resultLength / limit),
      next_page: parseInt(page) + 1,
      prev_page: parseInt(page) - 1
    }
    resultPrint.result = result
    resultPrint.err = err || null
    return res.status(resultPrint.status_code).json(resultPrint)
  },
  responseGetAll: (res, result, status, err) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.status_code = status
    resultPrint.result = result
    resultPrint.err = err || null
    return res.status(resultPrint.status_code).json(resultPrint)
  },
  // responseInsert: (res, res)
}