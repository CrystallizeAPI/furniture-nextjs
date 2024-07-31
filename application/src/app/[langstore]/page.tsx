import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import { getContext } from '~/use-cases/http/utils';
import { isValidLanguageMarket } from '~/use-cases/LanguageAndMarket';
import { getStoreFront } from '~/use-cases/storefront.server';
import { headers } from 'next/headers';
import dataFetcherForShapePage from '~/use-cases/dataFetcherForShapePage.server';
import LandingPage from '~/ui/pages/LandingPage';
import { LandingPage as TLandingPage } from '~/use-cases/contracts/LandingPage';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

async function getData() {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en`,
        headers: headers(),
    });
    if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
        // HOW?
    }

    const { secret } = await getStoreFront(requestContext.host);
    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });
    const path = '/frontpage';

    //Todo: get user from request
    //const user = await authenticatedUser(request);
    const user: [] = [];
    const data = await dataFetcherForShapePage('landing-page', path, requestContext, {}, user);
    return {
        data,
    };
}

export default async () => {
    const { data } = await getData();

    return <LandingPage data={data as TLandingPage} />;
};
