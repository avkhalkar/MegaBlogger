export default function Button({
    children,
    type = "button",
    bgColor = "bg-primary",
    textColor = "text-white",
    className = "",
    ...props
}) {
    // If bgColor is 'bg-primary' (default), we'll use our gradient
    const computedBg = bgColor === "bg-primary" ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30" : bgColor;

    return (
        <button className={`px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 font-medium tracking-wide ${computedBg} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}