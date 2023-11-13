import { NextResponse } from 'next/server';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';

export async function POST(request: Request) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const body: any = await request.json();
    //authentication needs to be implemented
    return NextResponse.json({
        body,
        status: 200,
    });
}
