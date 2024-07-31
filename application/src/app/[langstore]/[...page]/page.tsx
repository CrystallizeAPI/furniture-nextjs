import { headers } from 'next/headers';
import { isValidLanguageMarket } from '~/use-cases/LanguageAndMarket';
import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import dataFetcherForShapePage from '~/use-cases/dataFetcherForShapePage.server';
import LandingPage from '~/ui/pages/LandingPage';
import { LandingPage as TLandingPage } from '~/use-cases/contracts/LandingPage';
import Product from '~/ui/pages/Product';
import Category from '~/ui/pages/Category';
import AbstractStory from '~/ui/pages/AbstractStory';
import Topic from '~/ui/pages/Topic';
import { ProductSlim, SearchByTopicsProductList } from '~/use-cases/contracts/Product';
import { Topic as TTopic } from '~/use-cases/contracts/Topic';
import { CuratedStory, Story } from '~/use-cases/contracts/Story';
import { Category as TCategory } from '~/use-cases/contracts/Category';
import type { Product as ProductType } from '~/use-cases/contracts/Product';

type TProduct = {
    product: ProductType;
    preSelectedSku: string;
};

async function getData({ params }: { params: { page: string[] } }) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en`,
        headers: headers(),
    });

    const { secret } = await getStoreFront(requestContext.host);
    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });

    const path = '/' + params.page.join('/');
    const crystallizePath = path.replace('.pdf', '');

    const shapeData = await api.fetchShapeIdentifier(path);
    const shapeIdentifier = shapeData?.shape?.identifier || '_topic';

    if (!shapeIdentifier) {
        throw new Response('Not Found', {
            status: 404,
        });
    }

    //Todo: get user from request
    //const user = await authenticatedUser(request);
    const user: [] = [];
    const data = await dataFetcherForShapePage(shapeIdentifier, path, requestContext, params, user);

    return {
        data,
        shapeIdentifier,
    };
}

export default async ({ params }: { params: { page: string[] } }) => {
    const { data, shapeIdentifier } = await getData({ params });

    switch (shapeIdentifier) {
        case 'product':
            return <Product data={data as TProduct} />;
        case 'category':
            return <Category data={data as TCategory & ProductSlim[] & any} />;
        case 'abstract-story':
            return <AbstractStory data={data as CuratedStory | Story} />;
        case '_topic':
            return <Topic data={data as SearchByTopicsProductList & { topic?: TTopic }} />;
        case 'landing-page':
            return <LandingPage data={data as TLandingPage} />;
        default:
            return <p>There is no renderer for that page</p>;
    }
};
