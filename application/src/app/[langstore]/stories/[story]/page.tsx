import { headers } from 'next/headers';
import { getContext } from '~/use-cases/http/utils';
import dataFetcherForShapePage from '~/use-cases/dataFetcherForShapePage.server';
import AbstractStory from '~/ui/pages/AbstractStory';
import { CuratedStory as CuratedStoryType, Story as StoryType } from '~/use-cases/contracts/Story';

async function getData({
    params,
}: {
    params: {
        [x: string]: any;
        slug: string;
    };
}) {
    const requestContext = getContext({
        url: 'https://furniture.superfast.local/en',
        headers: headers(),
    });
    const path = `/stories/${params.story}`;

    const data = await dataFetcherForShapePage('abstract-story', path, requestContext, params, []);

    return data;
}

export default async ({ params }: { params: { slug: string } }) => {
    const data = await getData({ params });

    return <AbstractStory data={data as CuratedStoryType | StoryType} />;
};
