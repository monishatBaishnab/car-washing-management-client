/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, toast } from "keep-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/auth.api";
import CWSForm from "../../components/forms/CWSForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CWSInput from "../../components/forms/CWSInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas";

const Register = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await register(data).unwrap();
            if (!res?.success) {
                toast.error("Failed to register.");
            }
            if (res.error) {
                toast.error("Failed to register.");
            }
            if (res.data) {
                const userData = jwtDecode(res.data.token);
                dispatch(setUser({ user: userData, token: res.data.token }));
                navigate(location.state?.from ? location.state?.from : "/");
                toast.success("Successfully user registered.");
            }
        } catch (error) {
            // console.log(error);
            toast.error("Failed to register.");
        }
    };
    return (
        <section className="bg-slate-100">
            <div className="flex w-full min-h-screen items-center justify-center">
                <CWSForm
                    resolver={zodResolver(registerSchema)}
                    defaultValues={{
                        name: "Tech Guru",
                        email: "support@gg-guru.com",
                        password: "tg-password",
                        phone: "0987654321",
                        address: "456 Elm Street, Town, Country",
                    }}
                    onSubmit={handleSubmit}
                >
                    <div className="bg-white p-5 min-w-96 space-y-3">
                        <h4 className="text-xl font-medium mb-5">Sign Up to Continue</h4>
                        <CWSInput type="text" name="name" placeholder="Write your full name" />
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
                        <CWSInput type="text" name="phone" placeholder="Write your mobile no" />
                        <CWSInput type="text" name="address" placeholder="Write your address" />

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
                                "Register"
                            )}
                        </Button>
                        <span className="block">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login", { state: location?.state })}
                                className="text-cws-yellow cursor-pointer"
                            >
                                Login
                            </span>{" "}
                            here.
                        </span>
                    </div>
                </CWSForm>
            </div>
        </section>
    );
};

export default Register;
