import { Suspense } from "react";
import SignInForm from "./_components/signin_form";

export default function Login() {
    return (
        <Suspense fallback={<div></div>}>
            <SignInForm />
        </Suspense>
    );
}