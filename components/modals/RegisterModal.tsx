"use client";

import { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import Input from "../inputs/Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      companyName: "",
      businessRegistrationNumber: "",
      physicalAddress: "",
      contactPersonName: "",
      contactPersonEmail: "",
      contactPersonPhone: "",
      "bankDetails.accountHolderName": "",
      "bankDetails.bankName": "",
      "bankDetails.accountNumber": "",
      "bankDetails.branchCode": "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/reg", data)
      .then(() => {
        toast.success("Registration successful");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        console.error("API error:", error.response?.data || error.message); // Log detailed error
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });

  };

  const onToggle = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Loada" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="companyName"
        label="Company Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="businessRegistrationNumber"
        label="Business Registration Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="physicalAddress"
        label="Physical Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="contactPersonName"
        label="Contact Person Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="contactPersonEmail"
        label="Contact Person Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="contactPersonPhone"
        label="Contact Person Phone"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="bankDetails.accountHolderName"
        label="Account Holder Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="bankDetails.bankName"
        label="Bank Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="bankDetails.accountNumber"
        label="Account Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="bankDetails.branchCode"
        label="Branch Code"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register | Loada Platform"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
