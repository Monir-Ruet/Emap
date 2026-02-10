import { Metadata } from "next";
import Header from "./manage/_components/header";

export const metadata: Metadata = {
    title: "CCDN - Electoral Violence Tracker Admin",
    description: "Interactive map displaying election results and data",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
