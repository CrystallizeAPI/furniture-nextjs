import { useRouter as useLocation, usePathname } from 'next/navigation';

export default () => {
    return {
        pathname: usePathname(),
        useLocation,
    };
};
