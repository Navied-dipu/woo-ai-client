import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const PLAN_PRICE_ID = {
  'user_pro': "price_1ToUwM59VN2lY2OXr6Q7VE6w",
  'creator_pro': "price_1ToUp159VN2lY2OX7N0375A1",
};
