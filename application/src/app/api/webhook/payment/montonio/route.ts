import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import receivePaymentEvent from '~/use-cases/payments/montonio/receivePaymentEvent';
import { NextResponse } from 'next/server';

export async function POST(request: Request, params: { provider: string }) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const url = new URL(request.url);
    const token = url.searchParams.get('payment_token') || '';
    const data = await receivePaymentEvent(storefront.apiClient, token, storefront.config);
    return NextResponse.json(data);
}
