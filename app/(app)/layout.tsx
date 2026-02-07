import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Election Map",
    description: "Interactive map displaying election results and data",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
