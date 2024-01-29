import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    if (!session?.metadata?.userId) {
      return new NextResponse("Internal error", { status: 500 });
    }
    const user = await prisma.user.findUnique({
      where: { id: session?.metadata?.userId },
      include: { user_profile: true }
    });
    if (!user) {
      return new NextResponse("Internal error", { status: 500 });
    }
    const createSubstription = prisma.userSubscription.create({
      data: {
        userId: user.id,
        userProfileId: user.user_profile?.id as string,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        )
      }
    });
    const updateProfile = prisma.userProfile.update({
      where: { user_id: user.id },
      data: {
        role: "PREMIUM"
      }
    });
    await Promise.all([createSubstription, updateProfile]);
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await prisma.userSubscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        )
      }
    });
  }
  return new NextResponse(null, { status: 200 });
};