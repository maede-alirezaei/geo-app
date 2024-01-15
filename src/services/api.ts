import axios from 'axios'

export async function Api<T>(
  method: string,
  url: string,
  params: object | null,
  body: object | null
) {
  return await axios.request<T>({
    method,
    url: url,
    baseURL: 'https://geofon.gfz-potsdam.de/fdsnws/station/1/query',
    params: { level: 'station',format:"text", ...params },
    data: body,
  })
}
