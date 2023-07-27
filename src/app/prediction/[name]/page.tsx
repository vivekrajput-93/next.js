"use client";


const getAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io/?name=${name}`);
  return res.json();
};

const getCountry = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`);
  return res.json();
};

const getGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io/?name=${name}`);
  return res.json();
};

interface Params {
  params: { name: string };
}

import { useRouter } from "next/navigation";


export default async function Name({ params }: Params) {

    const {push} = useRouter();


  const ageData = getAge(params.name);
  const genderData = getGender(params.name);
  const countryData = getCountry(params.name);

  const [gender, age, country] = await Promise.all([
    genderData,
    ageData,
    countryData,
  ]);

  const HandleNavigation = () => {
    push(`/`)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        Personal Info
      </div>
      <div className="block mt-1 text-lg leading-tight font-medium text-black">
        Age: {age?.age}
      </div>
      <div className="block mt-1 text-lg leading-tight font-medium text-black">
        Gender: {gender?.gender}
      </div>
      <div className="block mt-1 text-lg leading-tight font-medium text-black">
        Nationality: {country?.country[0]?.country_id}
      </div>
    </div>
    <div>
    <button

            onClick={HandleNavigation}

            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Go Back
          </button>
    </div>
  </div>
  )
}
