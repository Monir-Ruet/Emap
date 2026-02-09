export function SvgWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-200 h-200 border-2 mx-auto">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                viewBox="-106.403 -201.859 654.709 900.764"
            >
                {children}
            </svg>
        </div>
    )
}