import { verifySolution } from "altcha-lib"
import { type Payload } from "altcha-lib/types"
import { NextResponse } from "next/server"

// In production, this should be stored securely in environment variables
// Must match the key used in the challenge route
const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY || "oasa-default-secret-key-change-in-production-12345"

type RequestDataType = {
  payload: string | Payload
}

export async function POST(req: Request) {
  console.log("[ALTCHA] Verify endpoint called")
  try {
    const data = (await req.json()) as RequestDataType
    console.log("[ALTCHA] Verify request data:", JSON.stringify(data).substring(0, 200))

    if (!data.payload) {
      console.log("[ALTCHA] No payload provided")
      return NextResponse.json(
        { ok: false, error: "No payload provided" },
        { status: 400 }
      )
    }

    const ok = await verifySolution(data.payload, ALTCHA_HMAC_KEY)
    console.log("[ALTCHA] Verification result:", ok)

    return NextResponse.json({ ok })
  } catch (error) {
    console.error("[ALTCHA] Error verifying solution:", error)
    return NextResponse.json(
      { ok: false, error: "Verification failed" },
      { status: 500 }
    )
  }
}