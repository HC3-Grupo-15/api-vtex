import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Leads extends ExternalClient {
  private routes = {
    leads: '/leads',
  }

  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://cbrdqaqq92.execute-api.sa-east-1.amazonaws.com', context, options)
  }

  public async getLeads(): Promise<string> {
    return this.http.get(this.routes.leads, {
      metric: 'leads-get',
    })
  }

  public async getLeadsWithHeaders(): Promise<IOResponse<string>> {
    return this.http.getRaw(this.routes.leads, {
      metric: 'leads-get-raw',
    })
  }
}
