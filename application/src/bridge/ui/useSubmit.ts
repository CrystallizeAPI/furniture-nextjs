import { FormEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default (event: FormEvent<HTMLFormElement>) => {
    const router = useRouter();
    const pathname = usePathname();
    event.preventDefault();
    //get form values
    let path = event.currentTarget.getAttribute('action');
    console.log(path);
    // router.push(pathname, replace);
};
