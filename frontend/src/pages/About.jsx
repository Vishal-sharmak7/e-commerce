import React from "react";
import about from "../assets/about.png";

const About = () => {
  return (
    <>
      {/* Heading */}
      <div className="flex justify-center items-center p-6">
        <h1 className="font-bold text-5xl">ABOUT</h1>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 m-6 md:m-16">
        {/* Image */}
        <div className="md:col-span-2 flex justify-center">
          <img className="rounded-2xl object-cover w-full h-full max-w-sm md:max-w-full" src={about} alt="About" />
        </div>

        {/* Text */}
        <div className="md:col-span-3 flex flex-col justify-center">
          <p className="text-justify">
            Seedhe Maut represent the next stage in the evolution of the
            capital’s hip-hop sound. Having mastered the art of delivering razor
            sharp, combative and witty rhymes, the duo are following in the
            trailblazing footsteps of international hip-hop collectives such as
            Run The Jewels, Clipse, Black Hippy, Mobb Deep, Blackstar and more.
          </p>

          <i className="text-red-600 block mt-6">
            “For the last decade or so, the story of Indian Rap has been
            synonymous with Mumbai-based gully rap. But that’s set to change
            with Seedhe Maut.” – GQ India
          </i>

          <p className="mt-6 text-justify">
            Their debut album Bayaan, made in collaboration with Sez On The
            Beat, earned widespread critical acclaim and has earmarked them as
            one of the acts to watch out for in 2019. Singles such as Shaktimaan
            and Kyu, who offer an insight into the frustrations of the Indian
            youth with the opportunities available to them, are staples across
            the country’s club circuit.
          </p>

          <p className="mt-6 text-justify">
            The duo are set to take 2020 and beyond by storm and are tipped by
            many to be the next big act to break out of the burgeoning Indian
            hip hop scene.
          </p>

          {/* Management Info */}
          <div className="text-center mt-10">
            <h2 className="font-semibold text-2xl">Management</h2>
            <p className="mt-2">Azadi Records</p>
            <i className="hover:text-red-600 cursor-pointer block mt-2">+91 96532 35891</i>
            <p className="font-light mt-4">If you have any queries,<br /> please call or email the above details.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
