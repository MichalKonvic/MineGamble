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



const LoginCard = () => {
    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
  return (
    <Card className="min-w-[350px]">
        <Form {...methods}>
            <CardHeader>
                <CardTitle className='w-full text-center'>
                    Login
                </CardTitle>
            </CardHeader>
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