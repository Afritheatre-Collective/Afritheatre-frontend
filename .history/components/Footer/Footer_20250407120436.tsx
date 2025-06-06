import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
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
                <FaTwitter className="text-2xl hover:text-blue-400 transition-colors" />
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
                <FaTiktok className="text-2xl hover:text-blue-600 transition-colors" />
              </a>
            )}
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            {site.quickLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
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
