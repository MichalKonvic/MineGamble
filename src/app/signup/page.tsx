import Loader from "@/components/Loader";
import PublicRoute from "@/components/PublicRoute";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUpPage = () => {
    return (
        <PublicRoute>
            <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
                <h1>Sign up is currently closed.</h1>
                <Link href={"/login"}>
                    <Button variant="outline">Login</Button>
                </Link>
            </div>
        </PublicRoute>
    )
}
export default SignUpPage;