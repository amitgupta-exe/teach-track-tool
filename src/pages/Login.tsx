
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMultiAuth } from '@/contexts/MultiAuthContext';
import { toast } from '@/hooks/use-toast';
import { AlertCircle, Shield, Users, GraduationCap } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { UserRole } from '@/lib/types';

const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const learnerLoginSchema = z.object({
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const superAdminLoginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;
type LearnerLoginFormValues = z.infer<typeof learnerLoginSchema>;
type SuperAdminLoginFormValues = z.infer<typeof superAdminLoginSchema>;

const roleConfig = {
  superadmin: {
    title: 'Super Admin',
    description: 'Full system access',
    icon: Shield,
    color: 'bg-red-500 hover:bg-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
  },
  admin: {
    title: 'Admin',
    description: 'Manage courses and learners',
    icon: Users,
    color: 'bg-blue-500 hover:bg-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
  },
  learner: {
    title: 'Learner',
    description: 'Access your courses',
    icon: GraduationCap,
    color: 'bg-green-500 hover:bg-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
  },
};

const Login: React.FC = () => {
  const { signIn, signInLearner } = useMultiAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const adminForm = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const learnerForm = useForm<LearnerLoginFormValues>({
    resolver: zodResolver(learnerLoginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const superAdminForm = useForm<SuperAdminLoginFormValues>({
    resolver: zodResolver(superAdminLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Reset forms when role changes
  React.useEffect(() => {
    adminForm.reset();
    learnerForm.reset();
    superAdminForm.reset();
    setError(null);
  }, [selectedRole, adminForm, learnerForm, superAdminForm]);

  const onSuperAdminSubmit = async (values: SuperAdminLoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(values.username, values.password, 'superadmin');
      if (error) {
        setError('Invalid username or password');
        return;
      }

      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in as Super Admin.',
      });
      
      navigate('/');
    } catch (err) {
      console.error('Super admin login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const onAdminSubmit = async (values: AdminLoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(values.email, values.password, 'admin');
      if (error) {
        setError('Invalid email or password');
        return;
      }

      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const onLearnerSubmit = async (values: LearnerLoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signInLearner(values.phone, values.password);
      if (error) {
        setError('Invalid phone number or password');
        return;
      }

      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      
      navigate('/learner-dashboard');
    } catch (err) {
      console.error('Learner login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const config = roleConfig[selectedRole];
  const Icon = config.icon;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
          <p className="mt-2 text-gray-600">Choose your role and sign in to your account</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-lg">
          {(Object.keys(roleConfig) as UserRole[]).map((role) => {
            const roleConf = roleConfig[role];
            const RoleIcon = roleConf.icon;
            return (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-md transition-all duration-200",
                  selectedRole === role
                    ? `${roleConf.bgColor} ${roleConf.borderColor} border-2 shadow-sm`
                    : "hover:bg-white hover:shadow-sm"
                )}
              >
                <RoleIcon 
                  className={cn(
                    "h-6 w-6 mb-1",
                    selectedRole === role ? roleConf.textColor : "text-gray-500"
                  )} 
                />
                <span 
                  className={cn(
                    "text-xs font-medium",
                    selectedRole === role ? roleConf.textColor : "text-gray-600"
                  )}
                >
                  {roleConf.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Login Form Card */}
        <Card className={cn("border-2 bg-white shadow-lg", config.borderColor)}>
          <CardHeader className={cn("text-center", config.bgColor)}>
            <div className="flex items-center justify-center mb-2">
              <div className={cn("p-2 rounded-full", config.color)}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className={config.textColor}>{config.title} Login</CardTitle>
            <CardDescription className="text-gray-600">{config.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {selectedRole === 'superadmin' && (
              <Form {...superAdminForm}>
                <form onSubmit={superAdminForm.handleSubmit(onSuperAdminSubmit)} className="space-y-4">
                  <FormField
                    control={superAdminForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter username" 
                            {...field}
                            disabled={isLoading}
                            className="bg-white border-gray-300 focus:border-red-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={superAdminForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter password"
                            {...field}
                            disabled={isLoading}
                            className="bg-white border-gray-300 focus:border-red-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className={cn("w-full text-white", config.color)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : `Sign in as ${config.title}`}
                  </Button>
                </form>
              </Form>
            )}

            {selectedRole === 'learner' && (
              <Form {...learnerForm}>
                <form onSubmit={learnerForm.handleSubmit(onLearnerSubmit)} className="space-y-4">
                  <FormField
                    control={learnerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Enter your phone number" 
                            {...field}
                            disabled={isLoading}
                            className="bg-white border-gray-300 focus:border-green-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={learnerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter your password (same as phone number)"
                            {...field}
                            disabled={isLoading}
                            className="bg-white border-gray-300 focus:border-green-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className={cn("w-full text-white", config.color)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : `Sign in as ${config.title}`}
                  </Button>
                </form>
              </Form>
            )}

            {selectedRole === 'admin' && (
              <Form {...adminForm}>
                <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-4">
                  <FormField
                    control={adminForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="admin@example.com" 
                            {...field}
                            disabled={isLoading}
                            className="bg-white border-gray-300 focus:border-blue-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={adminForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-gray-700">Password</FormLabel>
                          <Link 
                            to="/forgot-password" 
                            className="text-sm font-medium text-blue-600 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter your password"
                            {...field}
                            disabled={isLoading}
                            className="bg-white border-gray-300 focus:border-blue-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className={cn("w-full text-white", config.color)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : `Sign in as ${config.title}`}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        {selectedRole === 'admin' && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        )}

        {/* Test Credentials Info */}
        <Card className="bg-gray-50 border border-gray-200">
          <CardContent className="pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Test Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Super Admin:</strong> superadmin / superadmin</div>
              <div><strong>Admin:</strong> admin@example.com / any password</div>
              <div><strong>Learner:</strong> +1234567890 / +1234567890</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
