import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import  { Button } from '@/components/ui/button';



const ServicesPricing = () => {
  return (
    
    <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800 md:-mt-20 py-8 lg:py-24 " id="servicesPricing" >


            <div className="mt-12 space-y-4 bg-gray-950 p-6 rounded-lg">
            <div className="inline-block rounded-lg bg-gray-700 px-3 py-1 text-white text-sm">IT Services Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Flexible Pricing for Your IT Needs
            </h2>
            <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the IT service plan that best fits your business requirements and budget.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end  py-8 md:py-16  container mx-auto   "  >
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
       



    </section>

  );
};

export default ServicesPricing;
