import React from "react";
import ContactForm from "@/components/Forms/ContactForm";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto py-16">
        <div className="flex items-center pb-6 px-6 gap-3">
          <div className="flex items-center">
            <div className="relative w-5 h-5 mr-1.5">
              <div className="absolute w-full h-full border-2 border-[#247373] rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#c14600] rounded-full"></div>
            </div>

            <div className="flex gap-1">
              <div className="w-1.5 h-4 bg-[#247373] transform skew-x-12"></div>
              <div className="w-1.5 h-4 bg-[#c14600] transform -skew-x-12"></div>
              <div className="w-1.5 h-4 bg-[#247373] transform skew-x-12"></div>
            </div>
          </div>

          <h2 className="text-xl font-bold">Reach out</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 px-6 py-4">
          {/* Image on the left - adjust src as needed */}
          <div className="md:w-1/2">
            <div className="relative w-full h-64 md:h-full rounded-lg overflow-hidden">
              <Image
                src="/test-image.jpg"
                alt="Contact us"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Contact form on the right */}
          <div className="md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
