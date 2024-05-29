// components/aboutUs.tsx

import "@/app/globals.css";
import Link from "next/link";

import React from 'react';





const AboutUs: React.FC = () => {

    return (
       
        <section id="aboutUs" className="py-10 px-4 lg:px-20 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                     <div className="max-w-6xl mx-auto">
                
                <div className="mb-8">
                <h1 className="text-4xl font-bold text-center mb-4">About OAK IT Solutions and Supplies</h1>
                    <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                    <p>
                        OAK IT Solutions and Supplies is an Information Technology legal entity dedicated to providing top-notch IT solutions and addressing complex business challenges. 
                        Founded in 2015, the company leverages the power of technology and innovation to cut costs, increase efficiency, 
                        and ultimately improve ROI for organizations.

                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Vision and Mission</h2>
                    <p><strong>Vision:</strong> To revolutionize the business landscape by integrating cutting-edge technology solutions.</p>
                    <p><strong>Mission:</strong> To provide exceptional value for every dollar spent, and to exceed our own expectations as well as those of our clients.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Key Facts</h2><div>
                  
                        <li><strong>Founded:</strong> 2015</li>
                        <li><strong>Headquarters:</strong> Kampala, Uganda</li>
                        <li><strong>Registration No:</strong> <Link href="https://obrs.ursb.go.ug/name-search?q=oak%20it%20solutions%20and%20supplies">80010000953729</Link></li>
                        <li><strong>Number of Employees:</strong> 10</li>
                        <li><strong>Founders:</strong></li>
                            <ul className="list-disc list-inside">
                                <li>Ms.Beatrice Baguma</li>
                                <li> Mr.Keneth Okello</li>

                            </ul>
                 
                 </div>   
                        
                    
                    
                 </div>   

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2"> <Link href="/#products-and-services">Products and Services</Link></h2>
                    <p>OAK IT Solutions and Supplies offers a comprehensive range of IT products and services, including:</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Business IT Consulting:</strong> Tailored IT strategies to address specific business needs.</li>
                        <li><strong>Cloud Computing Solutions:</strong> Scalable and secure cloud services to enhance business operations.</li>
                        <li><strong>Managed IT Services:</strong> Proactive management and support for IT infrastructure.</li>
                        <li><strong>Cybersecurity Solutions:</strong> Advanced security measures to protect business data and systems.</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Market and Customers</h2>
                    <p>
                        OAK IT Solutions and Supplies serves clients across various industries, focusing on organizations looking to enhance their operational efficiency 
                        and ROI through innovative IT solutions. Our key clients Category include:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Aviation Industry </li>
                        <li>Insurance Industry</li>
                        <li>Non Profit Organizations</li>
                        <li>Education Sector</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Competitive Advantage</h2>
                    <p>OAK IT Solutions and Supplies stands out in the market due to:</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Innovation:</strong> Continuously evolving technology solutions that drive business growth.</li>
                        <li><strong>Quality:</strong> Commitment to delivering high-quality services and products.</li>
                        <li><strong>Customer Service:</strong> Exceptional customer support and dedicated service teams.</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Milestones</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>2015:</strong> Company founded with a mission to revolutionize IT solutions.</li>
                        <li><strong>2017:</strong> Launched comprehensive cloud computing services.</li>
                        <li><strong>2020:</strong> Reached over 100 clients in supplies, installation and support,<br/>showcasing trust and reliability in the industry. </li>
                        <li><strong>2023:</strong> Expanded services to include advanced cybersecurity solutions.</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Corporate Social Responsibility (CSR)</h2>
                    <p>OAK IT Solutions and Supplies is committed to sustainable and ethical practices, including:</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Green IT Initiative:</strong> Implementing eco-friendly IT solutions to reduce carbon footprint.</li>
                        <li><strong>Tech for Good:</strong> Providing technology resources and training to underserved communities.</li>
                        <li><strong>Community Engagement:</strong> Actively participating in local community development projects.</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Future Plans</h2>
                    <p>Looking ahead, OAK IT Solutions and Supplies plans to:</p>
                    <ul className="list-disc list-inside">
                        <li>Expand our service offerings internationally.</li>
                        <li>Develop and integrate next-generation AI-driven solutions.</li>
                        <li>Invest in research and development for innovative and sustainable technologies.</li>
                        <li>Train and skillup over 10000 students worldwide in Technology innovation and Tech Startup management.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                    <p><strong>Address:</strong> Central Road, next to Total Bahai, Kampala, Uganda</p>
                    <p><strong>Phone:</strong> +256 704 302335</p>
                    <p><strong>Email:</strong> <a href="mailto:[Company’s email address]" className="text-blue-500 hover:underline">info@oakitsolutionsandsupplies.com</a></p>
                    <p><strong>Website:</strong> <a href="https://www.oakitsolutionsandsupplies.com" className="text-blue-500 hover:underline">oakitsolutionsandsupplies.com</a></p>
                </div>
            </div>
            
        </section>
        
    ); 
    
};


export default AboutUs;
