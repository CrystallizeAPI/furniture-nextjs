import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import receivePaymentEvent from '~/use-cases/payments/quickpay/receivePaymentEvent';
import { cartWrapperRepository } from '~/use-cases/services.server';
import { NextResponse } from 'next/server';

export async function POST(request: Request, params: { provider: string }) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const body = await request.json();
    const data = await receivePaymentEvent(
        cartWrapperRepository,
        storefront.apiClient,
        request.headers.get('Quickpay-Checksum-Sha256') as string,
        body,
        storefront.config,
    );
    return NextResponse.json(data);
}
