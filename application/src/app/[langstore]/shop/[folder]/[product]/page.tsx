import { headers } from 'next/headers';
import Product from '~/ui/pages/Product';
import { Product as TProduct } from '~/use-cases/contracts/Product';
import dataFetcherForShapePage from '~/use-cases/dataFetcherForShapePage.server';
import { getContext } from '~/use-cases/http/utils';

type ProductData = {
    product: TProduct;
    preSelectedSku: string;
};

async function getData({
    params,
}: {
    params: {
        [x: string]: any;
        slug: string;
    };
}) {
    const requestContext = getContext({
        url: `https://furniture.superfast.local/en/shop/${params.folder}/${params.product}`,
        headers: headers(),
    });
    const path = `/shop/${params.folder}/${params.product}`;
    const data = await dataFetcherForShapePage('product', path, requestContext, params, []);
    return data;
}

export default async ({ params }: { params: { slug: string } }) => {
    const data = await getData({ params });

    return <Product data={data as ProductData} />;
};
