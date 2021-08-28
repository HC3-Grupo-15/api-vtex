export async function leads(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { leads: leadsClient }
  } = ctx

  ctx.set('Cache-Control','no-cache no-store');
  ctx.set('X-VTEX-Use-Https','true')
  ctx.set('Proxy-Authorization','ctx.authToken')

  const res = await leadsClient.getLeads().catch((reason)=>{ return reason?.response?.data })

  ctx.body = res

  await next()
}
