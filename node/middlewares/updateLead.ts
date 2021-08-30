import { json } from 'co-body'

export async function updateLead(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { order: ordeClient, leads: leadsClient }
  } = ctx

  const body = (await json(ctx.req))
  const orderId = body.OrderId
  const orderData = (await ordeClient.getOrder(ctx, orderId))
  ctx.status = 200

  const userId = orderData.clientProfileData.userProfileId
  const userEmail = (await ordeClient.getEmail(ctx, userId))

  const response = await leadsClient.getLeads().catch((reason) => { return reason?.response?.data })
  const allLeads = response.Items

  const user = allLeads.find((item: any) => item.email === userEmail[0].email)
  console.log(user)

  await next()
}
