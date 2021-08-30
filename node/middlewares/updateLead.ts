import { json } from 'co-body'

export async function updateLead(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { order: orderClient, leads: leadsClient },
  } = ctx

  const body = await json(ctx.req)
  const orderId = body.OrderId
  const orderData = await orderClient.getOrder(ctx, orderId)

  ctx.status = 200
  const userId = orderData.clientProfileData.userProfileId

  const userEmail = await orderClient.getEmail(ctx, userId)
  const { email } = userEmail[0]

  const response = await leadsClient.getLeads().catch((reason) => {
    return reason?.response?.data
  })

  const allLeads = response.Items

  const user = allLeads.find((item: any) => {
    return item.email === email
  })

  if (!user) {
    ctx.body = { msg: 'cliente não era lead' }
  } else {
    await leadsClient.putLead(user.id).catch((reason) => {
      return reason?.response?.data
    })
  }

  await next()
}
