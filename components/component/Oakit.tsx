/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/AeG02J0vdOI
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Rubik } from 'next/font/google'

rubik({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image';


export function Oakit() {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
            <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center">
          <div className="space-y-4 text-center">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tailored IT Solutions for Your Business</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our team of experts provides a wide range of IT services to help your business thrive in the digital age.
            </p>
          </div>
          <div className="grid gap-6 w-full lg:grid-cols-2 lg:gap-12">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <ServerIcon className="h-10 w-10 text-gray-900 dark:text-gray-50" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Infrastructure Management</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Ensure your IT infrastructure is reliable and secure.
                  </p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <CodeIcon className="h-10 w-10 text-gray-900 dark:text-gray-50" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Software Development</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Custom software solutions to meet your business needs.
                  </p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <ShieldIcon className="h-10 w-10 text-gray-900 dark:text-gray-50" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Cybersecurity</h3>
                  <p className="text-gray-500 dark:text-gray-400">Protect your business from cyber threats.</p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <CloudIcon className="h-10 w-10 text-gray-900 dark:text-gray-50" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Cloud Solutions</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Leverage the power of the cloud to drive your business.
                  </p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <GraduationCapIcon className="h-10 w-10 text-gray-900 dark:text-gray-50" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold">IT Bootcamps and Training</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Upskill your team with our comprehensive IT training programs.
                  </p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <BriefcaseIcon className="h-10 w-10 text-gray-900 dark:text-gray-50" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold">IT Consultancy</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get expert advice to optimize your IT infrastructure and strategy.
                  </p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800" id="blog">
        <div className="container px-4 md:px-6">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">Our Blog</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Stay Up-to-Date with Our Latest Insights
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Check out our blog for the latest news, trends, and best practices in the IT industry.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                    <Image
                    alt="Blog Post Image"
                    className="rounded-lg object-cover aspect-video"
                    src="/placeholder.svg"
                    width={640}
                    height={360}
                    priority
                  />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Unlocking the Power of Cloud Computing for Your Business</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Discover how cloud solutions can transform your business operations and drive innovation.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gradient-to-r hover:from-purple-500 hover:to-lime-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gradient-to-r dark:hover:from-purple-600 dark:hover:to-lime-600 dark:focus-visible:ring-gray-300 py-3"
                    href="#"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover aspect-video"
                  height={360}
                  src="/placeholder.svg"
                  width={640}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Cybersecurity Trends to Watch in 2024</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Stay ahead of the curve with our insights on the latest cybersecurity threats and best practices.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gradient-to-r hover:from-purple-500 hover:to-lime-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gradient-to-r dark:hover:from-purple-600 dark:hover:to-lime-600 dark:focus-visible:ring-gray-300 py-3"
                    href="#"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover aspect-video"
                  height={360}
                  src="/placeholder.svg"
                  width={640}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Leveraging Data Analytics to Drive Business Growth</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Discover how data-driven insights can transform your business operations and decision-making.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gradient-to-r hover:from-purple-500 hover:to-lime-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gradient-to-r dark:hover:from-purple-600 dark:hover:to-lime-600 dark:focus-visible:ring-gray-300 py-3"
                    href="#"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 space-y-4 bg-gray-950 p-6 rounded-lg">
            <div className="inline-block rounded-lg bg-gray-700 px-3 py-1 text-white text-sm">IT Services Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Flexible Pricing for Your IT Needs
            </h2>
            <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the IT service plan that best fits your business requirements and budget.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <Card className="bg-gray-800 text-gray-200 border-4 border-purple-500 hover:border-8 hover:border-purple-600 transition-all duration-300 ease-in-out">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription className="font-bold bg-gradient-to-r from-purple-500 to-lime-500 text-transparent bg-clip-text">
                    Monthly Fee for Users 10 to 50
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-4xl font-bold">Starts from $700</div>
                    <p className="text-gray-400">Includes basic IT support and maintenance.</p>
                    <div className="flex justify-center pb-6">
                      <Button className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-gray-200">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 text-gray-200 border-4 border-blue-500 hover:border-8 hover:border-blue-600 transition-all duration-300 ease-out">
                <CardHeader>
                  <CardTitle>Regular</CardTitle>
                  <CardDescription className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    Monthly Fee for Users 50 to 150
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-4xl font-bold">Starts from $1,500</div>
                    <p className="text-gray-400">Includes comprehensive IT support and management.</p>
                    <div className="flex justify-center pb-6">
                      <Button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-gray-200">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 text-gray-200 border-4 border-lime-500 hover:border-8 hover:border-lime-600 transition-all duration-300 ease-in-out">
                <CardHeader>
                  <CardTitle>Advanced</CardTitle>
                  <CardDescription className="font-bold bg-gradient-to-r from-lime-500 to-purple-500 text-transparent bg-clip-text">
                    Monthly Fee for Users 150 to 500
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-4xl font-bold">Request Quote</div>
                    <p className="text-gray-400">Customized IT solutions for enterprise-level businesses.</p>
                    <div className="flex justify-center pb-6">
                      <Button className="w-full py-3 bg-gradient-to-r from-lime-500 to-purple-500 hover:bg-gradient-to-r hover:from-lime-600 hover:to-purple-600 text-gray-200">
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10 py-24">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage alt="Client 1" src="/placeholder-avatar.jpg" />
                      <AvatarFallback>C1</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">Tonny M</h4>
                      <p className="text-gray-500 dark:text-gray-400">Sr. IT Manager Bar Aviation</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-500 dark:text-gray-400">
                    The IT solutions provided by this company have been instrumental in driving our business growth.
                    Highly recommended!
                  </blockquote>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage alt="Client 2" src="/placeholder-avatar.jpg" />
                      <AvatarFallback>C2</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">Patrick T</h4>
                      <p className="text-gray-500 dark:text-gray-400">ED Uganda Debt Network</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-500 dark:text-gray-400">
                    The OAK IT team&apos;s expertise and responsiveness have been invaluable in solving our complex IT challenges.
                    Highly satisfied with their services.
                  </blockquote>

                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage alt="Client 3" src="/placeholder-avatar.jpg" />
                      <AvatarFallback>C3</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">Michael Johnson</h4>
                      <p className="text-gray-500 dark:text-gray-400">CEO - Hillcrest Brokers</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-500 dark:text-gray-400">
                    The IT solutions provided by this company have been a game-changer for our business. Highly
                    recommended to any organization looking to improve their IT infrastructure.
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 md:px-6 mt-12">
          <div className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-900 to-gray-950 text-gray-50">
            <div className="container px-4 md:px-6 flex flex-col items-center space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-black dark:bg-gray-700">About Us</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Mission and Values</h2>
              <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At IT Solutions, our mission is to empower businesses of all sizes with cutting-edge IT services and
                solutions. We believe in delivering exceptional value, fostering long-term partnerships, and driving
                innovation to help our clients succeed in the digital age.
              </p>
            </div>
          </div>
          <div>
          </div>
        </div>
      </section>
      </div>
  )
}

export default Oakit;


// BriefcaseIcon.tsx

interface BriefcaseIconProps {
  width?: string; // Optional width prop
  height?: string; // Optional height prop
  color?: string; // Optional color prop
}

function BriefcaseIcon(props: BriefcaseIconProps) {
  const { width = "24", height = "24", color = "currentColor" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

// CloudIcon.tsx

interface CloudIconProps {
  color?: string; // Optional color prop
}

function CloudIcon(props: CloudIconProps) {
  const { color = "currentColor" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

// CodeIcon.tsx

interface CodeIconProps {
  // You can define additional props here if needed
}

function CodeIcon(props: CodeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Spread operator after fixed attributes
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// GraduationCapIcon.tsx

interface GraduationCapIconProps {
  // You can define additional props here if needed
}

// GraduationCapIcon.tsx

interface GraduationCapIconProps {
  // You can define additional props here if needed
}

function GraduationCapIcon(props: GraduationCapIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Spread operator after fixed attributes
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

// MountainIcon.tsx

interface MountainIconProps {
  // You can define additional props here if needed
}

function MountainIcon(props: MountainIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Spread operator after fixed attributes
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

// ServerIcon.tsx

interface ServerIconProps {
  // You can define additional props here if needed
}

function ServerIcon(props: ServerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Spread operator after fixed attributes
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}


// ShieldIcon.tsx

interface ShieldIconProps {
  color?: string; // Optional color prop
}

function ShieldIcon(props: ShieldIconProps) {
  const { color = "currentColor" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}







