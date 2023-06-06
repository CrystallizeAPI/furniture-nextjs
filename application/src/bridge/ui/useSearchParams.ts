import { useSearchParams } from 'next/navigation';
export default () => {
    return [useSearchParams(), null]; // we mimic remix return value
};
