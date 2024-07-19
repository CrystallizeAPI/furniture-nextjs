import { NextResponse } from 'next/server';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import initiateBuyNowPayment from '~/use-cases/payments/vipps/initiateBuyNowPayment';
import { v4 as uuidv4 } from 'uuid';
import handlePlaceCart from '~/use-cases/checkout/handlePlaceCart';
import { fetchOrderIntent } from '~/use-cases/crystallize/read/fetchOrderIntent';
import orderIntentToPaymentCart from '~/use-cases/mapper/API/orderIntentToPaymentCart';

export async function POST(request: Request, params: { provider: string }) {
    //@ts-expect-error
    if (params.params.provider !== 'vipps') {
        return NextResponse.json({ error: 'Provider not supported' }, { status: 400 });
    }
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const body = await request.json();
    const cart = await handlePlaceCart(body, body.customer, {
        apiClient: storefront.apiClient,
    });

    if (!cart) {
        return NextResponse.json({ error: 'Failed to handle cart' }, { status: 500 });
    }

    const orderIntent = await fetchOrderIntent(cart.id, {
        apiClient: storefront.apiClient,
    });
    if (!orderIntent) {
        throw {
            message: `Order intent for cart ${cart.id} not found`,
            status: 404,
        };
    }

    const paymentCart = await orderIntentToPaymentCart(orderIntent);
    const data = await initiateBuyNowPayment(paymentCart, requestContext, {
        storeFrontConfig: storefront.config,
        apiClient: storefront.apiClient,
    });

    return NextResponse.json(data);
}
