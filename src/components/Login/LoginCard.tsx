"use client";
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import LoginForm from './LoginForm';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { formSchema } from './types';
import { z } from 'zod';
import { Separator } from '../ui/separator';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { useAuth } from '@/providers/Auth/AuthProvider';



const LoginCard = () => {
    const { discordLogin } = useAuth();
    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
  return (
    <Card className="min-w-[350px] md:w-[400px]">
        <Form {...methods}>
            <CardHeader>
                <CardTitle className='w-full text-center'>
                    Welcome back
                </CardTitle>
            </CardHeader>
            <CardContent className='w-full flex justify-center'>
                <Button onClick={() => discordLogin()} variant={"outline"} className='px-12'>
                    <DiscordLogoIcon className='w-5 h-5'/>
                </Button>
            </CardContent>
            <Separator className='mb-5'/>
            <CardContent>
                <LoginForm/>
            </CardContent>
            <CardFooter>
                <Button className='w-full' type='submit' form='login-form'>Login</Button>
            </CardFooter>
        </Form>
    </Card>
  )
}

export default LoginCard