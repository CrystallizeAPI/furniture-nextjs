import { headers } from 'next/headers';
import { isValidLanguageMarket } from '~/use-cases/LanguageAndMarket';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import Category from '~/ui/pages/Category';
import { Category as TCategory } from '~/use-cases/contracts/Category';
import { ProductSlim } from '~/use-cases/contracts/Product';
import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import 'rc-slider/assets/index.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

type Data = {
    category: TCategory;
    products: ProductSlim[];
    priceRangeAndAttributes: any;
};

async function getData({
    params,
    searchParams,
}: {
    params: {
        [x: string]: any;
    };
    searchParams?: any;
}) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en/shop/${params.folder}`,
        headers: headers(),
    });

    const path = `/shop/${params.folder}`;
    const { secret } = await getStoreFront(requestContext.host);

    //TODO: implement authenticatedUser

    //const user = await authenticatedUser(request);

    let attributes = Array.isArray(searchParams?.attr) ? searchParams?.attr : [searchParams?.attr];

    const queryParams = {
        orderBy: searchParams?.orderBy,
        filters: {
            price: {
                min: searchParams?.min,
                max: searchParams?.max,
            },
        },
        attributes: attributes.filter(Boolean),
    };

    const user: [] = [];

    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });

    const [category, products, priceRangeAndAttributes] = await Promise.all([
        api.fetchFolderWithChildren(path, []),
        api.searchOrderBy(path, queryParams?.orderBy, queryParams?.filters, queryParams?.attributes),
        api.fetchPriceRangeAndAttributes(path),
    ]);

    return {
        category,
        products,
        priceRangeAndAttributes,
    };
}

export async function generateMetadata({ params }: { params: { folder: string } }) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en`,
        headers: headers(),
    });

    const path = `/shop/${params.folder}`;
    const { secret } = await getStoreFront(requestContext.host);
    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });
    const metadata = await api.fetchMetadata(path);
    return {
        title: metadata?.title,
        openGraph: {
            title: metadata?.title,
            description: metadata?.description,
            images: [metadata?.image],
        },
    };
}

export default async function Page({ params, searchParams }: { params: { slug: string }; searchParams?: any }) {
    const data = await getData({ params, searchParams });
    return <Category data={data as Data} />;
}
