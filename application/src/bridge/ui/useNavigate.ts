import { useRouter } from 'next/navigation';

export default () => {
    const router = useRouter();
    return (path?: string, options?: any) => {
        router.push(path!);
    };
};
