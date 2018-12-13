export default class CustomerServer {
  async customerList (ctx) {
    let params = {}
    if (ctx.params.keyword) {
      Object.assign(params, {
        where: {
          name: {[ctx.op.like]: `%${ctx.params.keyword}%`}
        }
      })
    }
    let customerList = await ctx.findAndCountAll('customer', ctx.params.offset, ctx.params.limit, params)
    return customerList
  }

  async customerAdd (ctx) {
    let customer = ctx.params.customer
    let customerModel = ctx.entity.customer
    let customerN = {}
    if (customer.id) {
      let supplierDB = await ctx.findOne(customerModel, {where: {id: customer.id}, raw: false})
      supplierDB.name = customer.name
      supplierDB.address = customer.address
      supplierDB.phone = customer.phone
      supplierDB.postalCode = customer.postalCode
      await supplierDB.save({fields: ['name', 'address', 'phone', 'postalCode']})
      customerN = supplierDB.toJSON()
    } else {
      customerN = await ctx.create(customerModel, customer)
    }
    return customerN
  }

  async customerDetail (ctx) {
    let customer = ctx.findOne('customer', {where: {id: ctx.params.id}})
    return customer
  }

  async customerDel (ctx) {
    let customer = await ctx.findOne('customer', {where: {id: ctx.params.id}, raw: false})
    if (customer) {
      customer.status = 0
      customer = await customer.save({fields: ['status']})
      return customer.toJSON()
    }
    return customer
  }
}
