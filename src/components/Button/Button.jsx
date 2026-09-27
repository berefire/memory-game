function Button({
    variant = 'primary',
    size = 'default',
    fullWidth = false,
    className = '',
    children,
    ...props
}) {
    const base =
    'inline-flex items-center justify-center rounded-full cursor-pointer font-body py-3 font-bold leading-tight transition-colors';

    const variants = {
        primary: 'bg-orange-400 hover:bg-orange-300 focus-visible:focus-ring focus-visible:focus-ring-orange-400 text-grey-50',
        secondary: 'bg-blue-100 hover:bg-blue-200 focus-visible:focus-ring focus-visible:focus-ring-blue-800 text-blue-800',
    }

    const sizes = {
        default: 'text-lg md:text-[2rem]',
        small: 'text-[1rem]',
        medium: 'text-[1.125rem] md:text-[1.25rem]',
    }

    return (
        <button
            type="button"
            className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;