import { createOrderFetcher } from '@crystallize/js-api-client';
import { handleOrdersRequestPayload } from '@crystallize/node-service-api-request-handlers';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import { NextResponse } from 'next/server';
import { authenticate } from '~/core/authentication.server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const requestContext = getContext(request);
    const authCookie = cookies().get('authentication');
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const auth: any = await authenticate(authCookie);
    const order = await handleOrdersRequestPayload(null, {
        fetcherByCustomerIdentifier: createOrderFetcher(storefront.apiClient).byCustomerIdentifier,
        user: auth.user.aud,
    });

    try {
        return NextResponse.json(
            await handleOrdersRequestPayload(null, {
                fetcherByCustomerIdentifier: createOrderFetcher(storefront.apiClient).byCustomerIdentifier,
                user: auth.user.aud,
            }),
        );
    } catch (exception: any) {
        return NextResponse.json({ message: exception.message });
    }
}
