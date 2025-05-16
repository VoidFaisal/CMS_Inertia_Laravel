import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L1 7l11 5 9-4.09v7.12h2V7L12 2z" />
        <path d="M12 13L5 9.84v5.62c0 2.9 4.55 5.54 7 6.54 2.45-1 7-3.64 7-6.54V9.84L12 13z" />
      </svg>
    );
}
