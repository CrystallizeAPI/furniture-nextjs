import { createOrderFetcher } from '@crystallize/js-api-client';
import { handleOrdersRequestPayload } from '@crystallize/node-service-api-request-handlers';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import { NextResponse } from 'next/server';

export async function GET(request: Request, response: Response) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    try {
        //TODO: Add authentication
        const auth: any = {};
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
