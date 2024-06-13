import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            providerIcon__github: "invert",
            socialButtonsProviderIcon: "h-8 w-8",
            socialButtons: "flex flex-row justify-evenly",
            socialButtonsIconButton: "bg-transparent w-fit h-fit",
            cardBox: "border border-white bg-slate-900",
          },
        }}
      />
    </main>
  );
};

export default SignUpPage;
