import { Button } from './ui/button'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import App from '../App'

export const RegisterForm = () => {
    const urlServer = "http://127.0.0.1:8080/";
    const urlApi = urlServer + "auth/register";
    const [registerSuccessful, setRegisterSuccessful] = useState(false);
    

    const formSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        email: z.string().email(),
        password: z.string().min(4),
        firstname: z.string(),
        lastname: z.string(),
        country: z.string()
      })
    
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            username: "",
            email: ""
          },
        })

         // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("Datos del formulario"+ values)
       
        const data = {
            username: values.username,
            email: values.email,
            password: values.password,
            firstname: values.firstname,
            lastname: values.lastname,
            country: values.country
        }
        
        fetch(urlApi, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.token) {
                localStorage.setItem("token", result.token);
                setRegisterSuccessful(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
      }
    return(
        <>
        {registerSuccessful ? <App/> :
         <div className="flex justify-center items-center h-screen">
            <Card className='w-[350px] mx-auto my-auto rounded border-black border-2'>
                <CardHeader>
                    <CardTitle>GymNotes</CardTitle>
                    <CardDescription>Register</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Firstname</FormLabel>
                            <FormControl>
                                <Input placeholder="Firstname" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Lastname</FormLabel>
                            <FormControl>
                                <Input placeholder="Lastname" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                <Button asChild variant={'destructive'}>
                    <Link to="/">Cancel</Link>
                </Button>
                </CardFooter>
            </Card>
        </div>}
        
        </>
    )
}