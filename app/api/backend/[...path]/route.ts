const API_ORIGIN = "https://www.api.oasamexico.com"

async function proxy(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const target = new URL(`/api/${path.join("/")}`, API_ORIGIN)
  target.search = new URL(request.url).search

  const headers = new Headers()
  for (const name of ["accept", "authorization", "content-type", "cookie"]) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }

  const init: RequestInit = { method: request.method, headers, cache: "no-store" }
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer()
  }

  const response = await fetch(target, init)
  const responseHeaders = new Headers()
  const contentType = response.headers.get("content-type")
  if (contentType) responseHeaders.set("content-type", contentType)
  const setCookie = response.headers.get("set-cookie")
  if (setCookie) responseHeaders.set("set-cookie", setCookie)

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  })
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const DELETE = proxy
export const PATCH = proxy
