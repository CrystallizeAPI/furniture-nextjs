import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import receivePaymentEvent from '~/use-cases/payments/quickpay/receivePaymentEvent';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const body = await request.json();
    const data = await receivePaymentEvent(
        storefront.apiClient,
        request.headers.get('Quickpay-Checksum-Sha256') as string,
        body,
        storefront.config,
    );
    return NextResponse.json(data);
}
