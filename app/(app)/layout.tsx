import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Electoral Violence Tracker - CCD",
    description: "CCD Electoral Violence Tracker maps electoral violence across Bangladesh’s 13th National Election 2026.",
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
