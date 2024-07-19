import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import receivePaymentEvent from '~/use-cases/payments/klarna/receivePaymentEvent';
import { NextResponse } from 'next/server';

export async function POST(request: Request, params: { cartId: string }) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const cartId = params.cartId as string;
    const body = await request.json();
    const data = await receivePaymentEvent(storefront.apiClient, cartId, body, storefront.config);
    return NextResponse.json(data);
}
