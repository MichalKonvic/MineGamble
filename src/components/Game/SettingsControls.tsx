"use client"
import { Input } from '../ui/input'
import React, { useEffect, useMemo } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { useGame } from '@/providers/GameProvider'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useProfile } from '@/providers/ProfileProvider'
import { useRouter } from 'next/navigation'

const SettingsControls = () => {
  const router = useRouter();
  const {game,isLoading,createGame} = useGame();
  const {profile,isLoading:profileLoading} = useProfile();
  const formSchema = useMemo(() => {
    if(profileLoading) return z.object({
      bet: z.coerce.number().min(0),
      size: z.coerce.number().min(2).default(5),
      minesCount: z.coerce.number().min(1)
    })
    return z.object({
      bet: z.coerce.number().min(0).max(profile!.balance),
      size: z.coerce.number().min(2).default(5),
      minesCount: z.coerce.number().min(1)
    }).refine(schema => {
      return schema.size * schema.size > schema.minesCount;
    },"Mines count must be less than game size squared");
  },[profile,profileLoading])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bet: 0,
      size: 5,
      minesCount: 3
    },
  });
  const disableControls = (() => {
    if(isLoading) return true;
    if(!game) return false;
    return !game.finished;
  })();
  function onSubmit(values: z.infer<typeof formSchema>) {
    if(!game?.finished) return;
    createGame(values.bet,values.minesCount,values.size,true);
  }
  return (
    <Card className='p-4 flex h-fit flex-col md:w-56 lg:w-72'>
      <Form {...form}>
        <form className="gap-4 flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control}
              name='bet'
              disabled={disableControls}
              render={({field}) => (
                <FormItem>
                    <FormLabel>Bet</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Bet' {...field}/>
                    </FormControl>
                </FormItem>
              )}/>
              <FormField control={form.control}
              name='size'
              disabled
              render={({field}) => (
                <FormItem>
                    <FormLabel>Game size</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Game size' {...field}/>
                    </FormControl>
                    <FormDescription>
                      Currently disabled
                    </FormDescription>
                </FormItem>
              )}/>
              <FormField control={form.control}
              name='minesCount'
              disabled={disableControls}
              render={({field}) => (
                <FormItem>
                    <FormLabel>Mines count</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Mines count' {...field}/>
                    </FormControl>
                </FormItem>
              )}/>
              <Button type='submit' disabled={disableControls}>Start game</Button>
        </form>
      </Form>

    </Card>
  )
}

export default SettingsControls