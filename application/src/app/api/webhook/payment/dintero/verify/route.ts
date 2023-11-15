import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import receivePayment from '~/use-cases/payments/dintero/receivePayment';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const body = await request.json();

    const data = await receivePayment(storefront.apiClient, body, storefront.config);

    return NextResponse.json(data);
}
