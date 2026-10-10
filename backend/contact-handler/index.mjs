import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ses = new SESClient({});
const ssm = new SSMClient({});

const { TURNSTILE_SECRET_PARAM, TO_EMAIL, FROM_EMAIL } = process.env;

// Re-read the secret every 5 minutes so rotations in SSM take effect without a redeploy.
const SECRET_TTL_MS = 5 * 60 * 1000;
let cachedSecret = null;
let cachedAt = 0;
async function getTurnstileSecret() {
  if (cachedSecret && Date.now() - cachedAt < SECRET_TTL_MS) return cachedSecret;
  const res = await ssm.send(
    new GetParameterCommand({ Name: TURNSTILE_SECRET_PARAM, WithDecryption: true })
  );
  cachedSecret = res.Parameter?.Value ?? "";
  cachedAt = Date.now();
  return cachedSecret;
}

function response(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, company: 160, email: 254, phone: 40, message: 5000 };

function clean(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

export async function handler(event) {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return response(204, {});
  }

  let body;
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return response(400, { message: "Invalid request body." });
  }

  const name = clean(body.name, MAX.name);
  const company = clean(body.company, MAX.company);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const message = clean(body.message, MAX.message);
  const turnstileToken = body.turnstileToken;

  if (!name) return response(400, { message: "Name is required." });
  if (!email || !EMAIL_RE.test(email)) return response(400, { message: "A valid email address is required." });
  if (!message) return response(400, { message: "Please describe what you need done." });
  if (!turnstileToken) return response(400, { message: "CAPTCHA token missing." });

  // Verify Turnstile token
  let turnstileOk = false;
  try {
    const secret = await getTurnstileSecret();
    const formData = new URLSearchParams({ secret, response: turnstileToken });
    const ip = event.requestContext?.http?.sourceIp;
    if (ip) formData.set("remoteip", ip);
    const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const tsData = await tsRes.json();
    turnstileOk = tsData.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return response(502, { message: "CAPTCHA verification failed. Please try again." });
  }

  if (!turnstileOk) {
    return response(400, { message: "CAPTCHA verification failed. Please refresh and try again." });
  }

  const lines = [
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    message,
    "",
    "--",
    "Sent from the mauitechservice.com contact form",
  ].filter((l) => l !== null);

  try {
    await ses.send(
      new SendEmailCommand({
        Destination: { ToAddresses: [TO_EMAIL] },
        Source: `Maui Tech Service Website <${FROM_EMAIL}>`,
        ReplyToAddresses: [email],
        Message: {
          Subject: { Data: `Service request: ${name}${company ? ` (${company})` : ""}` },
          Body: { Text: { Data: lines.join("\n") } },
        },
      })
    );
  } catch (err) {
    console.error("SES send error:", err);
    return response(502, { message: "Failed to send your request. Please call or email us directly." });
  }

  return response(200, { message: "Request sent successfully." });
}
