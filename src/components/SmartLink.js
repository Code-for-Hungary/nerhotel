import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import isEmail from '../utils/is-email';
import isUrl from '../utils/is-url';

export const SmartLink = ({ children, to, ...props }) => {
    const { search } = useLocation();
    const isToAnEmail = isEmail(to);

    if(isUrl(to) || isToAnEmail) {
        const href = isToAnEmail ? `mailto:${to}` : to;

        return (
            <a 
                href={href}
                rel={!isToAnEmail ? 'noopener noreferrer' : undefined}
                target={!isToAnEmail ? '_blank' : undefined}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <Link to={to + search} {...props}>
            {children}
        </Link>
    );
};