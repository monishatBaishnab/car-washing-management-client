import { Button, Input } from "keep-react";
import { Link } from "react-router-dom";

const Signin = () => {
    return (
        <section className="bg-slate-100">
            <div className="flex w-full min-h-screen items-center justify-center">
                <div className="bg-white p-5 min-w-96 space-y-3">
                    <h4 className="text-xl font-medium mb-5">Sign In to Continue</h4>
                    <Input type="email" name="email" placeholder="Write your user name/email" />
                    <Input type="password" name="password" placeholder="Write your password" />
                    <Button className="bg-cws-yellow hover:bg-cws-yellow/90 w-full">Sign in</Button>
                    <span className="block">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="text-cws-yellow">
                            Sign Up
                        </Link>{" "}
                        hare.
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Signin;
