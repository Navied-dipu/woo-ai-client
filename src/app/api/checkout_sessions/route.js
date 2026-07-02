import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import { PLAN_PRICE_ID } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await request.formData();
    const planId = formData.get("id");
    const priceId = PLAN_PRICE_ID[planId];

    // Validation Check: Prevent passing an undefined ID to Stripe
    if (!priceId) {
      return NextResponse.json(
        {
          error: `Invalid plan selected or missing Price ID for plan: "${planId}"`,
        },
        { status: 400 },
      );
    }

    const user = await getUserSession();

    if (!user) {
      return NextResponse.redirect(
        `${origin}/auth/signin?redirect=/plans`,
        303,
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: { planId },
      success_url: `${origin}/plan/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plan`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
