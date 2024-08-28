/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, toast } from "keep-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import CWSForm from "../../components/forms/CWSForm";
import CWSInput from "../../components/forms/CWSInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas";

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await login(data).unwrap();
            if (!res?.success) {
                toast.error("Failed to log in.");
            }
            if (res.error) {
                toast.error("Failed to log in.");
            }
            if (res.data) {
                const userData = jwtDecode(res.data.token);
                dispatch(setUser({ user: userData, token: res.data.token }));
                navigate("/");
                toast.success("Successfully user logged in.");
            }
        } catch (err) {
            // console.log(error);
            toast.error("Failed to log in.");
        }
    };

    return (
        <section className="bg-slate-100">
            <div className="flex w-full min-h-screen items-center justify-center">
                <CWSForm
                    resolver={zodResolver(loginSchema)}
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
                                "Log in"
                            )}
                        </Button>
                        <span className="block">
                            Don't have an account?{" "}
                            <span
                                onClick={() => navigate("/register", { state: location?.state })}
                                className="text-cws-yellow cursor-pointer"
                            >
                                Register
                            </span>{" "}
                            hare.
                        </span>
                    </div>
                </CWSForm>
            </div>
        </section>
    );
};

export default Login;
