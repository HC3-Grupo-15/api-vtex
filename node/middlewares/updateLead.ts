// import { UserInputError } from '@vtex/api';
import { json } from 'co-body'

export async function updateLead(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { oms: omsClient }
  } = ctx

  const body = (await json(ctx.req))
  const orderId = body.OrderId
  // const orderId = "1157842713861-01"

  const orderData = (await omsClient.order(orderId))

  ctx.set('Cache-Control','no-cache, no-store');
  ctx.set('X-VTEX-Use-Https','true')
  ctx.set('Proxy-Authorization','ctx.authToken')
  // ctx.status = 200

  ctx.body = orderData

  await next()
}
