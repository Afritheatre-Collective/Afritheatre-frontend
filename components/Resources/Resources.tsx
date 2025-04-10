import React from "react";
import {
  FiBook,
  FiFileText,
  FiBookOpen,
  FiLayers,
  FiTool,
} from "react-icons/fi";
import ResourcesCard from "./ResourcesCard";

const Resources = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className=" mb-12">
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

          <h2 className="text-xl font-bold">Free Resources to Download</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Case Studies */}
        <ResourcesCard
          icon={FiFileText}
          title="Case Studies"
          description="Real-world examples and success stories from industry leaders"
          iconColor="text-blue-600"
          hoverColor="hover:bg-blue-50"
        />

        {/* Books */}
        <ResourcesCard
          icon={FiBook}
          title="Books"
          description="Essential reading materials recommended by experts"
          iconColor="text-green-600"
          hoverColor="hover:bg-green-50"
        />

        {/* Reports */}
        <ResourcesCard
          icon={FiLayers}
          title="Reports"
          description="In-depth analysis and research findings"
          iconColor="text-purple-600"
          hoverColor="hover:bg-purple-50"
        />

        {/* Magazines */}
        <ResourcesCard
          icon={FiBookOpen}
          title="Magazines"
          description="Latest industry trends and thought leadership"
          iconColor="text-red-600"
          hoverColor="hover:bg-red-50"
        />

        {/* Tools */}
        <ResourcesCard
          icon={FiTool}
          title="Tools"
          description="Handy utilities and software to boost your workflow"
          iconColor="text-yellow-600"
          hoverColor="hover:bg-yellow-50"
        />

        {/* Additional Resource (optional) */}
        <ResourcesCard
          icon={FiFileText}
          title="Whitepapers"
          description="Technical documents and authoritative reports"
          iconColor="text-indigo-600"
          hoverColor="hover:bg-indigo-50"
        />
      </div>
    </div>
  );
};

export default Resources;
