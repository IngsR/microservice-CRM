import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200',
                    hover &&
                        'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
                    className,
                )}
                {...props}
            />
        );
    },
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('border-b border-gray-200 p-6', className)}
                {...props}
            />
        );
    },
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
    return (
        <h3
            ref={ref}
            className={cn('text-lg font-semibold text-gray-900', className)}
            {...props}
        />
    );
});

CardTitle.displayName = 'CardTitle';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return <div ref={ref} className={cn('p-6', className)} {...props} />;
    },
);

CardContent.displayName = 'CardContent';

export { Card, CardContent, CardHeader, CardTitle };
