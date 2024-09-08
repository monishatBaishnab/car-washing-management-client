import {
    Button,
    Modal,
    ModalClose,
    ModalContent,
    ModalDescription,
    ModalHeader,
    ModalTitle,
} from "keep-react";
import CWSForm from "../forms/CWSForm";
import CWSInput from "../forms/CWSInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { Dispatch, SetStateAction } from "react";
import { TUserResponse } from "../../types";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TUserProfileUpdateProps = {
    isVisible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    userInfo: TUserResponse;
    handleSubmit: SubmitHandler<FieldValues>;
};

const UserProfileUpdate = ({
    isVisible,
    setVisible,
    isLoading,
    userInfo,
    handleSubmit,
}: TUserProfileUpdateProps) => {

    return (
        <Modal isOpen={isVisible} onOpenChange={setVisible}>
            <ModalContent className="w-96">
                <ModalClose className="absolute right-4 top-4" />
                <ModalHeader>
                    <div className="space-y-1">
                        <ModalTitle className="mb-5">Update Profile</ModalTitle>
                        <ModalDescription>
                            <CWSForm defaultValues={userInfo ?? {}} onSubmit={handleSubmit}>
                                <div className="space-y-3">
                                    <CWSInput
                                        type="text"
                                        name="name"
                                        placeholder="Write your full name"
                                    />
                                    <CWSInput
                                        type="email"
                                        name="email"
                                        placeholder="Write your user name/email"
                                    />
                                    <CWSInput
                                        type="text"
                                        name="phone"
                                        placeholder="Write your mobile no"
                                    />
                                    <CWSInput
                                        type="text"
                                        name="address"
                                        placeholder="Write your address"
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
                                            "Update"
                                        )}
                                    </Button>
                                </div>
                            </CWSForm>
                        </ModalDescription>
                    </div>
                </ModalHeader>
            </ModalContent>
        </Modal>
    );
};

export default UserProfileUpdate;
