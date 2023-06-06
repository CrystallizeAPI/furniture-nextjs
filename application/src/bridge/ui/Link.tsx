import Link from 'next/link';

export default (props: any & { children: React.ReactNode }) => {
    const { prefetch, to, ...rest } = props;
    return (
        <Link {...rest} href={to}>
            {props.children}
        </Link>
    );
};
