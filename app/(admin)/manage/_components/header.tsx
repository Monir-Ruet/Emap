import { signOut } from "@/auth";

export default function Header() {
    return (
        <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default bg-blue-500">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-xl text-heading font-semibold whitespace-nowrap text-white">Centre for Critical Discourse - CCD</span>
                </a>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 gap-10" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <a href="/manage" className="block py-2 px-3 text-white  bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</a>
                        </li>
                    </ul>
                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/' });
                        }}
                    >
                        <button className="flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                            <div className="hidden md:block">Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
        </nav>

    )
}