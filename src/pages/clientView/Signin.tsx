import { Button, toast } from "keep-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CWSForm from "../../components/forms/CWSForm";
import CWSInput from "../../components/forms/CWSInput";
import { useSignInMutation } from "../../redux/features/auth/auth.api";
import { CgSpinnerTwo } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

const Signin = () => {
    const navigate = useNavigate();
    const [signIn, { isLoading }] = useSignInMutation();
    const dispatch = useAppDispatch();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await signIn(data).unwrap();
            if (!res?.success) {
                toast.error("Failed to sing in.");
            }
            if (res.error) {
                toast.error("Failed to sing in.");
            }
            if (res.data) {
                const userData = jwtDecode(res.data.token);
                dispatch(setUser({ user: userData, token: res.data.token }));
                navigate('/')
                toast.success("Successfully user signed in.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to sing in.");
        }
    };
    return (
        <section className="bg-slate-100">
            <div className="flex w-full min-h-screen items-center justify-center">
                <CWSForm
                    defaultValues={{
                        email: "support@tt-guru.com",
                        password: "tg-password",
                    }}
                    onSubmit={handleSubmit}
                >
                    <div className="bg-white p-5 min-w-96 space-y-3">
                        <h4 className="text-xl font-medium mb-5">Sign In to Continue</h4>
                        <CWSInput
                            type="email"
                            name="email"
                            placeholder="Write your user name/email"
                        />
                        <CWSInput
                            type="password"
                            name="password"
                            placeholder="Write your password"
                        />
                        <Button
                            type="submit"
                            className={`bg-cws-yellow hover:bg-cws-yellow/90 w-full ${
                                isLoading
                                    ? "bg-cws-yellow/65 hover:bg-cws-yellow/65"
                                    : "bg-cws-yellow"
                            }`}
                        >
                            {isLoading ? (
                                <CgSpinnerTwo className="animate-spin text-white text-2xl" />
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                        <span className="block">
                            Don't have an account?{" "}
                            <Link to="/sign-up" className="text-cws-yellow">
                                Sign Up
                            </Link>{" "}
                            hare.
                        </span>
                    </div>
                </CWSForm>
            </div>
        </section>
    );
};

export default Signin;
