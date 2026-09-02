import { NextRequest } from 'next/server'

const API_ORIGIN = 'https://www.api.oasamexico.com'

export async function GET(request: NextRequest) {
  const target = new URL('/api/captcha/challenge', API_ORIGIN)
  target.search = new URL(request.url).search

  const headers = new Headers()
  for (const name of ['accept', 'authorization', 'content-type', 'cookie']) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }

  const response = await fetch(target, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  const responseHeaders = new Headers()
  const contentType = response.headers.get('content-type')
  if (contentType) responseHeaders.set('content-type', contentType)
  const setCookie = response.headers.get('set-cookie')
  if (setCookie) responseHeaders.set('set-cookie', setCookie)

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  })
}
