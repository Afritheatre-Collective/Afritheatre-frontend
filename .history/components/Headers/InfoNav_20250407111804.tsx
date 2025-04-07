import React from "react";
import { siteConfig } from "@/config/site";
import {
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const InfoNav = () => {
  return (
    <div className=" px-4 py-2 bg-[#c14600] text-white">
      <div className=" max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Phone Number (Left) */}
        <div className="flex items-center mb-2 md:mb-0">
          <FaPhone className="h-6 w-6 mr-2" />
          <a
            href={`tel:${siteConfig.links.phonenumber.replace(/\D/g, "")}`}
            className="hover:text-primary dark:hover:text-primary-400"
          >
            {siteConfig.links.phonenumber}
          </a>
        </div>

        {/* Email (Middle) */}
        <div className="flex items-center mb-2 md:mb-0">
          <FaEnvelope className="h-6 w-6 mr-2" />
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="hover:text-primary dark:hover:text-primary-400"
          >
            {siteConfig.links.email}
          </a>
        </div>

        {/* Social Media Icons (Right) */}
        <div className="flex items-center space-x-4">
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
            aria-label="Twitter"
          >
            <FaXTwitter className="h-6 w-6" />
          </a>
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-600 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href={siteConfig.links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="h-6 w-6" />
          </a>
          <a
            href={siteConfig.links.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
            aria-label="TikTok"
          >
            <FaTiktok className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoNav;
