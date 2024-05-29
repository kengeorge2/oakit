import React from 'react';



const ServicesList = () => {
  return (

    <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800" id="services">
    <div className="w-full py-8 md:py-16 lg:py-24 dark:bg-gray-800 container mx-auto px-4 py-8  md:px-6 text-white">
      <h1 className="text-3xl font-bold mb-4 text-center text-black" >IT Services Offered</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Automation and Collaboration */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Automation and Collaboration</h2>
          <ul className="list-disc list-inside">
            <li>Workflow Automation Solutions</li>
            <li>Collaboration Tools Implementation</li>
            <li>Business Process Optimization</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* AI Integrations */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">AI Integrations</h2>
          <ul className="list-disc list-inside">
            <li>AI Chatbots for Customer Support</li>
            <li>Predictive Analytics Solutions</li>
            <li>Machine Learning Algorithms for Data Analysis</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Database and Data Management */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Database and Data Management</h2>
          <ul className="list-disc list-inside">
            <li>Database Design and Implementation</li>
            <li>Database Administration and Maintenance</li>
            <li>Data Warehousing Solutions</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Cybersecurity */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Cybersecurity</h2>
          <ul className="list-disc list-inside">
            <li>Network Security Assessments</li>
            <li>Firewall Configuration and Management</li>
            <li>Intrusion Detection and Prevention Systems</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Software Development */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Software Development</h2>
          <ul className="list-disc list-inside">
            <li>Custom Software Development</li>
            <li>Mobile App Development</li>
            <li>Enterprise Application Development</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Web Applications */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Web Applications</h2>
          <ul className="list-disc list-inside">
            <li>Web Development Services</li>
            <li>Content Management System Development</li>
            <li>E-commerce Solutions Development</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Content Creation and Social Media Management */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Content Creation and Social Media Management</h2>
          <ul className="list-disc list-inside">
            <li>Content Strategy and Planning</li>
            <li>Social Media Management Tools Implementation</li>
            <li>Social Media Marketing Campaigns</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Cloud Computing Solutions */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Cloud Computing Solutions</h2>
          <ul className="list-disc list-inside">
            <li>Cloud Strategy Consulting</li>
            <li>Cloud Migration Services</li>
            <li>Infrastructure as a Service (IaaS) Provisioning</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* IT Infrastructure Installation and Management */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">IT Infrastructure Installation and Management</h2>
          <ul className="list-disc list-inside">
            <li>Network Design and Implementation</li>
            <li>Server Installation and Configuration</li>
            <li>Storage Solutions Deployment</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Email and Collaboration Solutions */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Email and Collaboration Solutions</h2>
          <ul className="list-disc list-inside">
            <li>Email Hosting Services</li>
            <li>Collaboration Platform Implementation</li>
            <li>Document Sharing and Version Control Systems</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Internal Tools */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Internal Tools</h2>
          <ul className="list-disc list-inside">
            <li>Intranet Development and Deployment</li>
            <li>Employee Onboarding and Training Platforms</li>
            <li>Knowledge Management Systems</li>
            </ul>
            {/* Add more items here */}

       
      </div>

       {/* Remote IT Support 24/7 - SLA */}
       <div className="bg-gray-700 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">Remote IT Support 24/7 - SLA</h2>
        <ul className="list-disc list-inside">
        <li>Remote Troubleshooting and Issue Resolution</li>
        <li>24/7 Availability and Response Time SLAs</li>
        <li>Proactive Monitoring and Maintenance</li>
        {/* Add more items here */}
        </ul>
        </div>

        {/* IT TAINING SOLUTIONS */}
       <div className="bg-gray-700 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 bg-black text-white px-4 py-2 rounded-md">IT TRAINING AND R&D SOLUTIONS</h2>
        <ul className="list-disc list-inside">
        <li>IT Training and Certifications Consultation Services</li>
        <li>IT Lab based Pragmatic Training </li>
        <li>Project Based and Team effort Training</li>
        {/* Add more items here */}
        </ul>
        </div>



    </div>
    </div>
    </section>
  );
};

export default ServicesList;
