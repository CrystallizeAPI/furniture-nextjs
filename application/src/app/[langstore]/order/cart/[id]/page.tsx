import { headers } from 'next/headers';
import OrderPlacedCart from '~/ui/pages/OrderPlacedCart';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';

async function getData({ params, searchParams }: { params: { id: string }; searchParams: { cartId: string } }) {
    const requestContext = getContext({
        url: `https://furniture.superfast.local/en/order/cart/${params.id}`,
        headers: headers(),
    });
    const { shared } = await getStoreFront(requestContext.host);

    return { cartId: params.id };
}

export default async function Page({ params }: { params: { id: string } }, searchParams: { cartId: string }) {
    const { cartId } = await getData({ params, searchParams });
    return <OrderPlacedCart cartId={cartId} />;
}
