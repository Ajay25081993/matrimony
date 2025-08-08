import React from "react";

const Footer = ({ showRegister, setShowRegister }) => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="w-full bg-red-600 lg:px-6 lg:py-6 py-2  text-center text-white flex lg:flex-row flex-col items-center justify-center gap-2 lg:gap-10 ">
        <p className="lg:text-3xl text-lg">Your story is waiting to happen!</p>
        <button
          onClick={() => setShowRegister(true)}
          className="cursor-pointer w-1/2 shadow-sm shadow-gray-600 border-2 border-white rounded-xs lg:py-4 lg:px-15 py-2 px-1 text-xl hover:bg-white hover:shadow-md hover:text-sky-500 hover:shadow-gray-800 transition-all delay-50 duration-400"
        >
          Get Started
        </button>
      </div>

      <div className="lg:w-6xl mx-2 py-10 text-gray-500">
        <p className="mb-5">
          Soulbandhan.com, India’s No.1 Matchmaking and Matrimony Service*, was
          founded with a simple objective - to help people find happiness.
          Soulbandhan.com is a leader in what is sometimes known as the
          matrimony category, we have touched more than 50 million lives.
        </p>
        <p className="mb-5 lg:block hidden">
          Soulbandhan.com - a trusted matrimonial & matchmaking service, has
          always differentiated itself from other matrimonials through its
          innovation-led approach by redefining the way Indian brides and grooms
          meet for marriage.
        </p>
        {/* <p className="mb-5">
          We have also created trusted and renowned community specific matrimony
          platforms such as TamilSoulbandhan.com, TeluguSoulbandhan.com,
          MalayaleeSoulbandhan.com, KannadaSoulbandhan.com, BengaliSoulbandhan.com,
          GujaratiSoulbandhan.com, MarathiSoulbandhan.com, PunjabiSoulbandhan.com and more that
          has changed the way of finding a life partner.
        </p> */}
        <p className="mb-5 lg:block hidden">
          Soulbandhan.com (sometimes mis-spelt as Shadi.com, Shadhi.com or
          Sadi.com) is a social networking site specialising in matchmaking and
          not just a matrimonial service.
        </p>
        <p className="mb-5 italic">
          * Based on the number of downloads in the last 12 months of the
          Soulbandhan.com App – as reported by AppTweak.
        </p>
      </div>

      <div className="lg:w-3xl w-full flex justify-center flex-col items-center mb-12">
        <div className="bg-sky-400 text-center  py-2 px-3 text-white lg:text-3xl text-2xl rounded-t-md">
          Trusted by Millions
        </div>
        <div className="lg:border-y-1  border-gray-300 flex lg:flex-row flex-col lg:gap-4 lg:p-3 text-lg lg:text-xl ">
          <div className="p-3 flex items-center lg:gap-5 gap-3">
            <i class="ri-group-line border border-gray-300 text-2xl w-12 h-12 text-amber-500 rounded-full flex justify-center items-center"></i>
            <p>Best Matches </p>
          </div>
          <div className="p-3 flex items-center lg:gap-5 gap-3">
            <i class="ri-shield-check-line border border-gray-300 text-2xl w-12 h-12 text-amber-500 rounded-full flex justify-center items-center"></i>
            <p>Verified Profiles</p>
          </div>
          <div className="p-3 flex items-center lg:gap-5 gap-3 ">
            <i class="ri-lock-2-line border border-gray-300 text-2xl w-12 h-12 text-amber-500 rounded-full flex justify-center items-center"></i>
            <p>100% Privacy</p>
          </div>
        </div>
      </div>

      <div className="hidden w-7xl lg:flex justify-between text-center">
        <div>
          <p className="border-b-1 border-b-gray-300 p-3 text-xl text-gray-600">
            Need Help?
          </p>
          <ul className="p-4 text-lg text-gray-400 cursor-pointer">
            <li className="hover:underline">Member </li>
            <li className="hover:underline">Login </li>
            <li className="hover:underline">Sign Up </li>
            <li className="hover:underline"> Partner Search</li>
            <li className="hover:underline">How to Use Soulbandhan.com </li>
            <li className="hover:underline"> Premium</li>
            <li className="hover:underline">Memberships</li>
            <li className="hover:underline">Customer Support </li>
            <li className="hover:underline"> Site Map</li>
          </ul>
        </div>
        <div>
          <p className="border-b-1 border-b-gray-300 p-3 text-xl text-gray-600">
            Company
          </p>
          <ul className="p-4 text-lg text-gray-400 cursor-pointer">
            <li className="hover:underline">About Us</li>
            <li className="hover:underline">Soulbandhan Blog</li>
            <li className="hover:underline">Careers</li>
            <li className="hover:underline">Awards & Recognition</li>
            <li className="hover:underline">Cov-Aid</li>
            <li className="hover:underline">Contact Us</li>
          </ul>
        </div>
        <div>
          <p className="border-b-1 border-b-gray-300 p-3 text-xl text-gray-600">
            Privacy & You
          </p>
          <ul className="p-4 text-lg text-gray-400 cursor-pointer">
            <li className="hover:underline">Terms of Use</li>
            <li className="hover:underline">Privacy Policy</li>
            <li className="hover:underline">Be Safe Online</li>
            <li className="hover:underline">Report Misuse</li>
          </ul>
        </div>
        <div>
          <p className="border-b-1 border-b-gray-300 p-3 text-xl text-gray-600">
            More
          </p>
          <ul className="p-4 text-lg text-gray-400 cursor-pointer">
            <li className="hover:underline">VIP Soulbandhan</li>
            <li className="hover:underline">Sangam</li>
            <li className="hover:underline">Select Soulbandhan</li>
            <li className="hover:underline">Soulbandhan Centres</li>
            <li className="hover:underline">Success Stories</li>
            <li className="hover:underline">Soulbandhan Live</li>
            <li className="hover:underline">
              Elite Matrimony by Soulbandhan.com
            </li>
            <li className="hover:underline">Astrochat.com</li>
            <li className="hover:underline">Chat with Astrologers</li>
          </ul>
        </div>
      </div>

      <footer className="w-screen  bg-gray-200 flex lg:flex-row lg:text-lg text-xs flex-col py-6 justify-between  lg:p-8">
        <p className="text-center ">
          © 1996-2025 Soulbandhan.com, The World's Leading Matchmaking Service™
        </p>
        <p className="text-center">
          Passionately created by <span className="text-sky-400">SR Group</span>{" "}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
