// components/ui/login-form.tsx
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Label } from '../Components/ui/label';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
      <h1 className="text-xl font-semibold mb-1">Create a Tailark Account</h1>
      <p className="text-sm mb-6">Welcome! Create an account to get started</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Button variant="outline" className="flex items-center justify-center gap-2">
          {/* Google Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 262">
            <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
            <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
            <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
            <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
          </svg>
          Google
        </Button>
        <Button variant="outline" className="flex items-center justify-center gap-2">
          {/* Microsoft Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
            <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path>
            <path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path>
            <path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z"></path>
            <path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z"></path>
          </svg>
          Microsoft
        </Button>
      </div>

      <hr className="my-4 border-dashed" />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="firstname">Firstname</Label>
            <Input id="firstname" name="firstname" required />
          </div>
          <div>
            <Label htmlFor="lastname">Lastname</Label>
            <Input id="lastname" name="lastname" required />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Username</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div>
          <Label htmlFor="pwd">Password</Label>
          <Input id="pwd" name="pwd" type="password" required />
        </div>

        <Button className="w-full">Continue</Button>
      </div>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link href="#" className="text-blue-600 underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
