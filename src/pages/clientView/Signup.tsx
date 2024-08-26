import { Button, Input } from "keep-react";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <section className="bg-slate-100">
            <div className="flex w-full min-h-screen items-center justify-center">
                <div className="bg-white p-5 min-w-96 space-y-3">
                    <h4 className="text-xl font-medium mb-5">Sign Up to Continue</h4>
                    <Input type="text" name="name" placeholder="Write your full name" />
                    <Input type="email" name="email" placeholder="Write your user name/email" />
                    <Input type="password" name="password" placeholder="Write your password" />
                    <Input type="text" name="mobile" placeholder="Write your mobile no" />
                    <Input type="text" name="address" placeholder="Write your address" />
                    <Input type="text" name="profile" placeholder="Link of profile image." />
                    <Button className="bg-cws-yellow hover:bg-cws-yellow/90 w-full">Sign up</Button>
                    <span className="block">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="text-cws-yellow">
                            Sign In
                        </Link>{" "}
                        here.
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Signup;
