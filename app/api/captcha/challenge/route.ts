import { createChallenge } from "altcha-lib"
import { NextResponse } from "next/server"

// In production, this should be stored securely in environment variables
// Generate a random HMAC key for production use
const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY || "oasa-default-secret-key-change-in-production-12345"

export async function GET() {
  console.log("[ALTCHA] Challenge endpoint called")
  try {
    const { challenge, salt, algorithm, signature } = await createChallenge({
      hmacKey: ALTCHA_HMAC_KEY,
      algorithm: "SHA-256",
      maxnumber: 50000,
      saltLength: 20,
    })

    console.log("[ALTCHA] Challenge created successfully", { challenge: challenge?.substring(0, 20) + '...', salt, algorithm })
    
    return NextResponse.json({
      challenge,
      salt,
      algorithm,
      signature,
    })
  } catch (error) {
    console.error("[ALTCHA] Error creating challenge:", error)
    return NextResponse.json(
      { error: "Failed to create challenge" },
      { status: 500 }
    )
  }
}