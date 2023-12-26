"use client"
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { formSchema } from './types';
import {z} from 'zod';
import { useAuth } from '@/providers/Auth/AuthProvider';
import { Label } from '../ui/label';
import { toast } from 'sonner';

const LoginForm = () => {
    const methods = useFormContext<z.infer<typeof formSchema>>();
    const {login} = useAuth();
    const onSubmit = async (data:z.infer<typeof formSchema>) => {
        const {error,data:resData} = await login(data.email, data.password);
        if(error){
            methods.setError("root.authError", {message: error.message});
        }
    };
  return (
    <form id='login-form' className='flex flex-col gap-4' onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
            control={methods.control}
            name='email'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
        <FormField
            control={methods.control}
            name='password'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder='Password' autoComplete='true' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Label htmlFor='login-form' className='text-destructive'>{methods.formState.errors.root?.authError.message}</Label>
    </form>
  )
}

export default LoginForm