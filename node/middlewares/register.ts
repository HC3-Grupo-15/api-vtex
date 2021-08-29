import { UserInputError } from '@vtex/api';
import { json } from 'co-body'

export async function register(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { leads: leadsClient }
  } = ctx
  const leadData = (await json(ctx.req))

  if (!leadData) {
    throw new UserInputError('Please suply de lead data')
  }

  ctx.set('Cache-Control','no-cache no-store');
  ctx.set('X-VTEX-Use-Https','true')
  ctx.set('Proxy-Authorization','ctx.authToken')

  const res = await leadsClient.postLead(leadData).catch((reason)=>{ return reason?.response?.data })

  ctx.body = res

  await next()
}
