import React from "react";
import { FaPlay } from "react-icons/fa";

const StoryPages = ({ storyChapter }: any) => {
  const playSpeech = (text: string) => {
    const voice = window?.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    voice.speak(textToSpeech);
  };

  const handlePlayClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    playSpeech(storyChapter?.content);
  };

  return (
    <div className="mx-auto bg-[#faf7f0] p-8 shadow-xl rounded-2xl mt-6 border border-gray-300 relative max-w-3xl">
      <h2 className="text-3xl font-serif font-bold text-gray-800 text-center mb-4">
        {storyChapter?.title}
      </h2>

      <p className="text-xl font-serif leading-relaxed text-justify text-gray-800 bg-white p-8 rounded-lg shadow-inner">
        {storyChapter?.content}
      </p>

      <div className="absolute bottom-4 right-4 text-gray-500 italic text-sm">
        ~ End of Chapter ~
      </div>
    </div>
  );
};

export default StoryPages;
