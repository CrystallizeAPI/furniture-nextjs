import { NextResponse } from 'next/server';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';

export async function GET(request: Request, response: Response) {
    NextResponse.json({ message: 'Service API is working' });
}
