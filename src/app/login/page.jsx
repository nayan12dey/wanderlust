
"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const loginPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())

        console.log(user);

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        })

        console.log({ data, error })

        if (data) {
            redirect("/")
        }
        if (error) {
            // toast
            alert(error?.message);
        }

    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }


    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center my-4">
                <h1 className="text-2xl font-bold">Login</h1>
                <p>Start your adventure with wanderlust</p>
            </div>
            <Card className="border p-10">
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2">
                        <Button type="submit" className={"w-full bg-cyan-500"}>
                            Login
                        </Button>

                    </div>
                </Form>
                <div className="flex justify-center items-center gap-3">
                    <Separator></Separator>
                    <div className="whitespace-nowrap">
                        Or sign up with
                    </div>
                    <Separator></Separator>

                </div>
                <div>
                    <Button variant="outline" className={"w-full"} onClick={handleGoogleSignIn}> <FcGoogle></FcGoogle> Sign in with Google</Button>
                </div>
            </Card>
        </div>

    );
};

export default loginPage;