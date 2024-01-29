import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";
import { getCookie } from "cookies-next";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const appUrl = getAbsoluteUrl("/painel");

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  try {
    const token = getCookie("promogate.token", { res, req });
    const { id } = verify(token as string, process.env.TOKEN_SECRET as string) as unknown as { id: string, role: string };
    if (!id) {
      return new NextResponse("Internal error", { status: 500 });
    }
    const user = await prisma.user.findUnique({
      where: { id: id }
    });
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userSubscription = await prisma.userSubscription.findUnique({
      where: { userId: id }
    });
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: appUrl
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: appUrl,
      cancel_url: appUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "BRL",
            product_data: {
              name: "Promogate PRO",
              description: "Versão sem restrições do painel Promogate!"
            },
            unit_amount: 2990,
            recurring: {
              interval: "month"
            }
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: user.id
      }
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error: any) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}