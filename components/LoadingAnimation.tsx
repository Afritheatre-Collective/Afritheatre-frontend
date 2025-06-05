const LoadingAnimation = () => {
  return (
    <div className="flex items-center">
      {/* Rotating circle with inner dot */}
      <div className="relative w-5 h-5 mr-1.5 animate-spin">
        <div className="absolute w-full h-full border-2 border-[#247373] rounded-full border-t-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#c14600] rounded-full"></div>
      </div>

      {/* Pulsing bars with sequential animation */}
      <div className="flex gap-1">
        <div className="w-1.5 h-4 bg-[#247373] transform skew-x-12 animate-pulse [animation-delay:0.1s]"></div>
        <div className="w-1.5 h-4 bg-[#c14600] transform -skew-x-12 animate-pulse [animation-delay:0.2s]"></div>
        <div className="w-1.5 h-4 bg-[#247373] transform skew-x-12 animate-pulse [animation-delay:0.3s]"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
