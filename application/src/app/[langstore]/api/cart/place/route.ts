import { NextResponse } from 'next/server';
import handlePlaceCart from '~/use-cases/checkout/handlePlaceCart';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';

export async function POST(request: Request) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);

    // TODO: this is a temporary fix, we need to find a better way to handle this
    const user = {
        aud: '',
        firstname: '',
        lastname: '',
    };
    // const isAuthenticated = await isServerSideAuthenticated(request);
    // const user = isAuthenticated ? (await authenticate(request))?.user : null;
    const body = await request.json();

    const customerIdentifier = user?.aud || body.customer?.email || 'unknown@unknown.com';
    const customer = {
        ...body.customer,
        // we enforce those 3 values from the Authentication, it might not be overridden in the Form
        email: body.customer?.email || user?.aud || 'unknown@unknown.com',
        firstname: body.customer?.firstname || user.firstname,
        lastname: body.customer?.lastname || user.lastname,
        // then we decide of and customerIdentifier
        customerIdentifier,
        isGuest: true,
    };

    return NextResponse.json(
        await handlePlaceCart({ ...body, user }, customer, {
            apiClient: storefront.apiClient,
        }),
    );
}
