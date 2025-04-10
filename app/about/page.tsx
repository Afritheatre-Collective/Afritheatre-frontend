"use client";
import React, { useEffect, useRef } from "react";
import { FiUsers, FiGlobe, FiAward, FiFilm } from "react-icons/fi";
import { motion, useAnimation, useInView } from "framer-motion";

const AboutUs = () => {
  // Animation for counter
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Stats data
  const stats = [
    { id: 1, name: "Shows Recorded", value: 1250, suffix: "+", icon: FiFilm },
    { id: 2, name: "Happy Clients", value: 350, suffix: "+", icon: FiUsers },
    { id: 3, name: "Countries Reached", value: 45, suffix: "", icon: FiGlobe },
    { id: 4, name: "Awards Won", value: 28, suffix: "", icon: FiAward },
  ];

  // Impact data
  const impacts = [
    {
      icon: FiUsers,
      title: "Community Building",
      description:
        "Creating spaces for meaningful connections and conversations",
    },
    {
      icon: FiGlobe,
      title: "Global Reach",
      description: "Amplifying voices from diverse cultures and backgrounds",
    },
    {
      icon: FiAward,
      title: "Excellence",
      description: "Setting industry standards for quality and innovation",
    },
    {
      icon: FiFilm,
      title: "Storytelling",
      description: "Capturing authentic narratives that inspire change",
    },
  ];

  // Counter component
  const Counter = ({ from = 0, to, duration = 2, suffix = "" }) => {
    const [count, setCount] = React.useState(from);

    useEffect(() => {
      if (!isInView) return;

      let start = from;
      const increment = (to - from) / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [from, to, duration, isInView]);

    return (
      <span className="text-4xl font-bold text-[#247373]">
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with logo mark */}
      <div className="flex items-center py-6 px-6 gap-3">
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

        <h2 className="text-xl font-bold">About Us</h2>
      </div>

      {/* Core & Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 py-12 px-6">
        {/* Core */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-[#247373]"
        >
          <h3 className="text-2xl font-bold mb-4 text-[#c14600]">Our Core</h3>
          <p className=" mb-4">
            At our heart, we &apos;re storytellers and innovators. We believe in
            the power of authentic narratives to transform perspectives and
            create meaningful connections.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#247373] rounded-full mt-2 mr-2"></span>
              <span>Integrity in every project</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#247373] rounded-full mt-2 mr-2"></span>
              <span>Passion for creative excellence</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#247373] rounded-full mt-2 mr-2"></span>
              <span>Commitment to community impact</span>
            </li>
          </ul>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-[#c14600]"
        >
          <h3 className="text-2xl font-bold mb-4 text-[#247373]">
            Our Mission
          </h3>
          <p className=" mb-4">
            To amplify voices that matter through innovative media production,
            creating content that educates, inspires, and drives positive
            change.
          </p>
          <div className="bg-[#f8f8f8] p-4 rounded-lg">
            <h4 className="font-bold text-2xl text-[#c14600] mb-4">
              Why We Do It
            </h4>
            <p>
              In a world of constant noise, we &apos;re committed to producing
              signal - content that cuts through the clutter to deliver real
              value and lasting impact.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div
        ref={counterRef}
        className="py-12 px-6 bg-gradient-to-r from-[#247373]/10 to-[#c14600]/10"
      >
        <h3 className="text-2xl font-bold text-center mb-12">By The Numbers</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: stat.id * 0.1 }}
              className="text-center bg-white p-6 rounded-lg shadow-md"
            >
              <stat.icon className="mx-auto h-10 w-10 text-[#c14600]" />
              <div className="mt-4">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm font-medium text-gray-600">
                  {stat.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-12 px-6">
        <h3 className="text-2xl font-bold text-center mb-12">Our Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 hover:bg-[#247373]/5 rounded-lg transition-all duration-300"
            >
              <div className="p-4 rounded-full bg-[#247373]/10 text-[#247373] mb-4">
                <impact.icon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-[#c14600]">
                {impact.title}
              </h4>
              <p className="text-sm text-gray-600">{impact.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
