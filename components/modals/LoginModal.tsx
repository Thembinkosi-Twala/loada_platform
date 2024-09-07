"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import Input from "../inputs/Input";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error(result.error); // Display error if any
      return;
    }

    if (result?.ok) {
      toast.success("Logged in successfully!");
      loginModal.onClose();
      router.refresh(); // Refresh page after login
    }
  };

  const onToggle = () => {
    loginModal.onClose();
    registerModal.onOpen(); // Switch to register modal
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
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
          First time using loada?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login | Loada"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
