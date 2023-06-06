import { NextResponse } from 'next/server';
import fetchAvailableBanks from '~/use-cases/payments/montonio/fetchAvailableBanks';
import { storage } from '~/use-cases/services.server';

export async function GET(request: Request, params: { provider: string }) {
    console.log('params', params);
    //@ts-expect-error
    if (params.params.provider !== 'montonio') {
        return NextResponse.json({ error: 'Provider not supported' }, { status: 400 });
    }
    const cached = await storage.get('montonio-banks');
    if (cached) {
        return NextResponse.json(JSON.parse(cached));
    }
    const points = await fetchAvailableBanks();
    // AS per documentation we are going to cache this for 24 hours
    storage.set('montonio-banks', JSON.stringify(points), 86400);
    return NextResponse.json(points);
}
