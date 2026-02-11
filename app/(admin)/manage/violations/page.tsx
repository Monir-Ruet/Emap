import { Suspense } from "react";
import ViolenceForm from "../_components/violence_form";

export default function ViolationsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ViolenceForm />
        </Suspense>
    );
}