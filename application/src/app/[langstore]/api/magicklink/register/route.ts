import { NextResponse } from 'next/server';
import { getContext } from '~/use-cases/http/utils';
import { createMailer } from '~/use-cases/services.server';
import { getStoreFront } from '~/use-cases/storefront.server';
import sendMagickLink from '~/use-cases/user/sendMagickLink';

export async function POST(request: Request) {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const mailer = createMailer(`${process.env.MAILER_DSN}`);
    const body: any = await request.json();
    const data = await sendMagickLink(requestContext, storefront.config, body, mailer);
    return NextResponse.json(data);
}
