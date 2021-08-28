export async function status(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control','no-cache no-store');
  ctx.set('X-VTEX-Use-Https','true')
  // ctx.set('Proxy-Authorization','ctx.authToken')

  const res = await ctx.clients.status.getStatus('').catch((reason)=>{ return reason?.response?.data })

  ctx.body = JSON.parse(res)

  await next()
}
