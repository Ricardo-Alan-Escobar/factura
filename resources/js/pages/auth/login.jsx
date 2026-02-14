import { useState } from 'react'
import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { register } from '@/routes'
import { store } from '@/routes/login'
import { request } from '@/routes/password'
import { Form, Head } from '@inertiajs/react'

import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login({ status, canResetPassword, canRegister }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <AuthLayout
            title="Bienvenido de nuevo"
            description="Inicia sesión para continuar a tu panel de control"
        >
            <Head title="Log in" />

            <div className="w-full max-w-md mx-auto">
                <div className="
                    rounded-2xl 
                    border 
                    bg-background/80 
                    backdrop-blur 
                    shadow-xl 
                    p-8 
                    space-y-6
                ">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* EMAIL */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="pl-10 h-11 rounded-xl"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* PASSWORD */}
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Contraseña</Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-sm"
                                                tabIndex={5}
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </TextLink>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="pl-10 pr-10 h-11 rounded-xl"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>

                                    <InputError message={errors.password} />
                                </div>

                                {/* REMEMBER */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label htmlFor="remember" className="text-sm">
                                            Recordarme
                                        </Label>
                                    </div>
                                </div>

                                {/* BUTTON */}
                                <Button
                                    type="submit"
                                    className="w-full h-11 rounded-xl text-base cursor-pointer"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing && <Spinner className="mr-2 h-4 w-4" />}
                                    Ingresar
                                </Button>
                            </>
                        )}
                    </Form>

                    {canRegister && (
                        <div className="text-center text-sm text-muted-foreground">
                            ¿No tienes una cuenta?{' '}
                            <TextLink href={register()} tabIndex={5}>
                                Crear una cuenta
                            </TextLink>
                        </div>
                    )}

                    {status && (
                        <div className="text-center text-sm font-medium text-green-600 dark:text-green-400">
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </AuthLayout>
    )
}
