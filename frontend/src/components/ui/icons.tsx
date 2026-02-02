/**
 * Shared Icon Components
 *
 * Centralized SVG icons for consistent usage across the application.
 */

import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export function IconArrowRight(props: IconProps) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function IconArrowRightSmall(props: IconProps) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                d="M4.22 11.78a.75.75 0 0 1 0-1.06L7.44 7.5 4.22 4.28a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function IconCheck(props: IconProps) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function IconSparkle(props: IconProps) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
        </svg>
    );
}

export function IconChevronRight(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function IconChevronDown(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function IconChevronUp(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
            <path d="m18 15-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function IconSearch(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
    );
}

export function IconCalendar(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
            <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function IconDocument(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function IconMapPin(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
            <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function IconUsers(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
            <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function IconWhatsApp(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}
