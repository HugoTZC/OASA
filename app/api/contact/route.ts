import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { verifySolution } from "altcha-lib"

export const runtime = "nodejs"

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  captcha?: string
}

function requiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const name = body.name?.trim()
    const email = body.email?.trim()
    const subject = body.subject?.trim()
    const message = body.message?.trim()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Completa los campos obligatorios." }, { status: 400 })
    }

    const captchaKey = requiredEnv("ALTCHA_HMAC_KEY")
    if (!body.captcha || !(await verifySolution(body.captcha, captchaKey))) {
      return NextResponse.json({ error: "La validación anti-spam no es válida." }, { status: 400 })
    }

    const smtpUser = requiredEnv("SMTP_USER")
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.dreamhost.com",
      port: Number(process.env.SMTP_PORT || "587"),
      secure: false,
      requireTLS: true,
      auth: {
        user: smtpUser,
        pass: requiredEnv("SMTP_PASSWORD"),
      },
    })

    await transporter.sendMail({
      from: process.env.MAIL_FROM || smtpUser,
      to: process.env.MAIL_TO || "info@oasamexico.com",
      replyTo: email,
      subject: `Contacto web: ${subject}`,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Teléfono: ${body.phone?.trim() || "No proporcionado"}`,
        `Asunto: ${subject}`,
        "",
        message,
      ].join("\n"),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact form error", error)
    return NextResponse.json({ error: "No fue posible enviar el mensaje." }, { status: 500 })
  }
}

