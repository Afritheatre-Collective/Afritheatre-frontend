import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { FaThreads, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Logo and Description */}
        <div className="space-y-4">
          <div className="text-2xl font-bold">{siteConfig.name}</div>
          <p className="text-gray-300">{siteConfig.description}</p>
        </div>

        {/* Column 2: Follow Us */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            {siteConfig.links.facebook && (
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-2xl hover:text-blue-500 transition-colors" />
              </a>
            )}
            {siteConfig.links.twitter && (
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-2xl hover:text-blue-400 transition-colors" />
              </a>
            )}
            {siteConfig.links.instagram && (
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl hover:text-pink-500 transition-colors" />
              </a>
            )}
            {siteConfig.links.tiktok && (
              <a
                href={siteConfig.links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="text-2xl hover:text-black transition-colors" />
              </a>
            )}
            {siteConfig.links.youtube && (
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-2xl hover:text-red-600 transition-colors" />
              </a>
            )}
            {siteConfig.links.linkedin && (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl hover:text-blue-600 transition-colors" />
              </a>
            )}
            {siteConfig.links.threads && (
              <a
                href={siteConfig.links.threads}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaThreads className="text-2xl hover:text-black transition-colors" />
              </a>
            )}
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/latest-stories"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Latest Stories
              </a>
            </li>
            <li>
              <a
                href="/resources"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Resources
              </a>
            </li>
            <li>
              <a
                href="/eea-summit"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="/vye-scenario"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Support</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login / Register
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/team"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Our Team
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
