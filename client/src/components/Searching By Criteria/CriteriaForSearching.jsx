import React from "react";

const CriteriaForSearching = () => {
  return (
    <div>
      <div className="bg-white  max-w-2xl mx-auto p-6 space-y-6 rounded shadow shadow-gray-500">
        <h2 className="text-lg font-semibold border-b pb-2 text-center mb-4">
          Search profiles using the below criteria
        </h2>
        <div className="text-lg font-semibold w-full bg-gray-200  text-gray-700 mb-3">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Basic Details
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Age */}
          <div>
            <label className="block text-sm mb-1">Age</label>
            <div className="flex gap-2">
              <select className="w-full border rounded px-2 py-1">
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
              </select>
              <span className="self-center">to</span>
              <select className="w-full border rounded px-2 py-1">
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
              </select>
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm mb-1">Height</label>
            <div className="flex gap-2">
              <select className="w-full border rounded px-2 py-1">
                <option>4'8"</option>
                <option>4'9"</option>
                <option>5'0"</option>
                <option>5'2"</option>
              </select>
              <span className="self-center">to</span>
              <select className="w-full border rounded px-2 py-1">
                <option>5'8"</option>
                <option>5'9"</option>
                <option>6'0"</option>
              </select>
            </div>
          </div>

          {/* Profile Created By */}
          <div>
            <label className="block text-sm mb-1">Profile Created By</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Any</option>
              <option>Self</option>
              <option>Parent</option>
              <option>Sibling</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm mb-1">Marital Status</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Never Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </div>

          {/* Mother Tongue */}
          <div>
            <label className="block text-sm mb-1">Mother Tongue</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Bengali</option>
              <option>Hindi</option>
              <option>Tamil</option>
            </select>
          </div>

          {/* Physical Status */}
          <div>
            <label className="block text-sm mb-1">Physical Status</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Normal</option>
              <option>Physically Challenged</option>
            </select>
          </div>
        </div>

        {/* religeous details */}
        <div>
          <h3 className="text-sm font-semibold w-full bg-gray-200 text-gray-700 mb-3">
            Religious Details
          </h3>

          <div className="space-y-2">
            <label className="block text-sm mb-1">Religion</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
              <option>Sikh</option>
              <option>Jain</option>
              <option>Buddhist</option>
              <option>Parsi</option>
            </select>
            <label className="block text-sm mb-1">Caste</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Any</option>
              <option>Brahmin</option>
              <option>Rajput</option>
              <option>Kayastha</option>
              <option>Maratha</option>
              <option>SC</option>
              <option>ST</option>
              <option>OBC</option>
            </select>
            <label className="block text-sm mb-1">Dosha(m)</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Doesn't matter</option>
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
        </div>

        {/* Proffessional details */}
        <div>
          <h3 className="text-sm font-semibold w-full bg-gray-200 text-gray-700 mb-3">
            Professional Details
          </h3>

          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Occupation</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Software Engineer</option>
                <option>Doctor</option>
                <option>Teacher</option>
                <option>Business</option>
                <option>Engineer</option>
                <option>Government Employee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Annual Income</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Below ₹2 Lakh</option>
                <option>₹2 - ₹5 Lakh</option>
                <option>₹5 - ₹10 Lakh</option>
                <option>₹10 - ₹20 Lakh</option>
                <option>Above ₹20 Lakh</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Employment Type</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Private</option>
                <option>Government</option>
                <option>Business</option>
                <option>Self Employed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Education</label>
              <select className="w-full border rounded px-2 py-1">
                <option>10th Pass</option>
                <option>12th Pass</option>
                <option>Graduate</option>
                <option>Post Graduate</option>
                <option>Doctorate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Life style */}
        <div className="space-y-2">
          <div>
            <h3 className="text-sm font-semibold w-full bg-gray-200  text-gray-700 mb-3">
              Lifestyle
            </h3>

            <div className="flex flex-wrap gap-28">
              <label className="block text-sm mb-1">Mutual Hobbies</label>
              <div>
                {" "}
                <input type="checkbox" /> Matches who have similar hobbies as
                you{" "}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm">Eating Habits</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Vegetarian</option>
              <option>Non-Vegetarian</option>
              <option>Eggetarian</option>
              <option>Vegan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm ">Smoking Habits</label>
            <select className="w-full border rounded px-2 py-1">
              <option>No</option>
              <option>Occasionally</option>
              <option>Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm ">Drinking Habits</label>
            <select className="w-full border rounded px-2 py-1">
              <option>No</option>
              <option>Occasionally</option>
              <option>Yes</option>
            </select>
          </div>
        </div>

        {/* family details */}
        <div>
          <div className="text-lg font-semibold w-full bg-gray-200  text-gray-700 mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Family Details
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Family Status</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Middle Class</option>
                <option>Upper Middle Class</option>
                <option>Rich</option>
                <option>Affluent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Family Value</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Traditional</option>
                <option>Moderate</option>
                <option>Liberal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Family Type</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Joint</option>
                <option>Nuclear</option>
                <option>Others</option>
              </select>
            </div>
          </div>
        </div>

        {/* active profile */}
        <div>
          <div className="text-lg font-semibold w-full bg-gray-200  text-gray-700 mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Recently active Profile
            </h3>
          </div>
          <div className="space-y-5">
            <div className="mb-2 space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Profile Created
              </p>
              <p className="text-xs text-gray-500">
                Profiles based on created date
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button className="px-4 py-1 rounded-full bg-purple-100 text-black border border-purple-300 text-sm font-medium">
                All
              </button>
              <button className="px-4 py-1 rounded-full border text-sm font-medium hover:bg-purple-100">
                Today
              </button>
              <button className="px-4 py-1 rounded-full border text-sm font-medium hover:bg-purple-100">
                Last 3 days
              </button>
              <button className="px-4 py-1 rounded-full border text-sm font-medium hover:bg-purple-100">
                One week
              </button>
              <button className="px-4 py-1 rounded-full border text-sm font-medium hover:bg-purple-100">
                One month
              </button>
            </div>
          </div>
        </div>
        {/* profile type */}

        <div>
          <div className="text-lg font-semibold w-full bg-gray-200  text-gray-700 mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Profile Type
            </h3>
          </div>
           
          <div className="flex flex-wrap gap-37 mt-5">
            <label className="block text-sm mb-1">Profiles with Photo</label>
            <div>
              {" "}
              <input type="checkbox" /> Matches who have added photo{" "}
            </div>
          </div>

          <div className="flex items-center gap-37 mt-5 mb-4">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Don’t show profiles
            </label>
            <select className="border border-gray-300  rounded px-3 py-1 text-sm w-60">
              <option >Ignored, Shortlisted</option>
              <option>Only Ignored</option>
              <option>Only Shortlisted</option>
              <option>All Profiles</option>
            </select>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default CriteriaForSearching;
