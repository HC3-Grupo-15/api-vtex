import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Status extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://cbrdqaqq92.execute-api.sa-east-1.amazonaws.com/leads', context, options)
  }

  public async getStatus(status: string): Promise<string> {
    return this.http.get(status, {
      metric: 'status-get',
    })
  }

  public async getStatusWithHeaders(
    status: string
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(status, {
      metric: 'status-get-raw',
    })
  }
}
