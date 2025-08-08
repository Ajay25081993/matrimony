import React from 'react'

const CallPreference = () => {
  return (
    <div> <div>
          <p className="font-semibold text-xl">Call Preference</p>
          <hr className=" border-dotted border-gray-300 mt-3 w-4/4" />
        </div>
  
  <p>Let us know when we can call you:</p>
          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="call"
              value="updates"
              class="text-blue-600 w-5 h-5"
            />
            <span>Call when there are important updates/offers</span>
          </label>

          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="call"
              value="1month"
              class="text-blue-600 w-5 h-5"
            />
            <span>Call after 1 month</span>
          </label>

          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="call"
              value="3months"
              class="text-blue-600 w-5 h-5"
            />
            <span>Call after 3 months</span>
          </label>

          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="call"
              value="6months"
              class="text-blue-600 w-5 h-5"
            />
            <span>Call after 6 months</span>
          </label>

          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="call"
              value="never"
              class="text-blue-600 w-5 h-5"
            />
            <span>Never</span>
          </label>
          <div className="mt-3  w-full  text-center flex justify-end">
            <button className=" rounded bg-purple-300 text-center w-20 broder-2  border-b-black border-gray-300 hover:bg-purple-400 text-white font-semibold cursor-pointer">
              {" "}
              Submit
            </button>
          </div> </div>
  )
}

export default CallPreference