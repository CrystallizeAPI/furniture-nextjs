import { createOrderFetcher } from '@crystallize/js-api-client';
import { CartWrapper, handleOrderRequestPayload } from '@crystallize/node-service-api-request-handlers';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import { cartWrapperRepository } from '~/use-cases/services.server';
import { NextResponse } from 'next/server';

export async function GET(request: Request, params: { id: string }) {
    //@ts-expect-error
    let orderId = params.params.id;
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const auth: any = {};
    let cartId = requestContext.url.searchParams.get('cartId');

    let cartWrapper: CartWrapper | null | undefined = cartId ? await cartWrapperRepository.find(cartId) : null;

    try {
        const order = await handleOrderRequestPayload(null, {
            fetcherById: createOrderFetcher(storefront.apiClient).byId,
            user: auth.email,
            orderId,
            checkIfOrderBelongsToUser: () => {
                return false;
            },
        });
        return NextResponse.json(order);
    } catch (exception: any) {
        if (exception?.status === 403) {
            throw new Response(exception.message, {
                status: 403,
                statusText: exception.message,
            });
        }
        console.log('exception', exception);
    }

    throw new Response('Order Not Found', {
        status: 404,
        statusText: 'Order Not Found',
    });
}
