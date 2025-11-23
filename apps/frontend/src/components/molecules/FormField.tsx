import Input, { InputProps } from '@/components/atoms/Input';

interface FormFieldProps extends InputProps {
    label: string;
    icon?: React.ElementType;
}

export default function FormField({
    label,
    icon: Icon,
    ...inputProps
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={inputProps.id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                <Input
                    {...inputProps}
                    className={Icon ? 'pl-10' : inputProps.className}
                />
            </div>
        </div>
    );
}
