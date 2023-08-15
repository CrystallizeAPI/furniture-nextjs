import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import handleCart from '~/use-cases/checkout/handleSaveCart';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const body = await request.json();

    //TODO: Add authentication
    const user = {};

    return NextResponse.json(
        await handleCart(storefront.config, storefront.apiClient, requestContext, { ...body, user }),
    );
}
