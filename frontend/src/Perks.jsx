import React from 'react'

const Perks = ({selected,onChange}) => {

  const handleCbClick=(e)=>{
    const {checked,name}=e.target;
    if(checked)
    {
      onChange([...selected,name]);
    }
    else{
      onChange([...selected.filter(selectedName => selectedName!==name)
      ])
    }
  }

  return (
    <div>
      <label className="block text-gray-800 text-xl mb-2" htmlFor="perks">
            Perks
          </label>
          <p className="text-gray-600 text-sm mb-2">
            List any perks or amenities available.
          </p>
          <div className="flex flex-wrap gap-4 ">
            <label className="flex items-center border-[2px] px-4 py-2 rounded-lg gap-1 pr-[100px]">
              <input
                type="checkbox"
                onChange={handleCbClick}
                checked={selected.includes("wifi")}
                name="wifi"
                className="mr-2"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
              </svg>
              Wifi
            </label>
            <label className="flex items-center border-[2px] px-4 py-2 rounded-lg gap-1 pr-[100px]">
              <input
                type="checkbox"
                onChange={handleCbClick}
                checked={selected.includes("tv")}
                name="tv"
                className="mr-2"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25h13.5A2.25 2.25 0 0 1 21 7.5v9a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 16.5v-9A2.25 2.25 0 0 1 5.25 5.25Zm0 0h13.5A2.25 2.25 0 0 1 21 7.5v9a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 16.5v-9A2.25 2.25 0 0 1 5.25 5.25Zm1.5 6a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v2.25Zm4.5 3a.75.75 0 0 0 .75.75V14a.75.75 0 0 0-.75-.75v2.25Z" />
              </svg>
              TV
            </label>
            <label className="flex items-center border-[2px] px-4 py-2 rounded-lg gap-1 pr-[100px]">
              <input
                type="checkbox"
                onChange={handleCbClick}
                checked={selected.includes("paking")}
                name="paking"
                className="mr-2"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 20.25a3 3 0 0 1-3-3v-6a3 3 0 0 1 6 0v6a3 3 0 0 1-3 3Zm-3 0a3 3 0 0 1-3-3v-6a3 3 0 0 1 6 0v6a3 3 0 0 1-3 3Zm-4.5-4.5a3 3 0 0 1-3-3v-6a3 3 0 0 1 6 0v6a3 3 0 0 1-3 3Z" />
              </svg>
              Parking
            </label>
            <label className="flex items-center border-[2px] px-4 py-2 rounded-lg gap-1 pr-[100px]">
              <input
                type="checkbox"
                onChange={handleCbClick}
                checked={selected.includes("pool")}
                name="pool"
                className="mr-2"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Pool
            </label>
            <label className="flex items-center border-[2px] px-4 py-2 rounded-lg gap-1 pr-[100px]">
              <input
                type="checkbox"
                onChange={handleCbClick}
                checked={selected.includes("radio")}
                name="radio"
                className="mr-2"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 19.5A2.25 2.25 0 0 1 15 21H9a2.25 2.25 0 0 1-2.25-2.25v-15A2.25 2.25 0 0 1 9 1.5h6a2.25 2.25 0 0 1 2.25 2.25v15Zm-2.25 0v-15m0 0h-6v15h6Zm-3-1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-6-5a3 3 0 0 1 6 0v2.25h-6V13Zm-3 0v-2.25a3 3 0 0 1 6 0v2.25H1.5Z" />
              </svg>
              Radio
            </label>
          </div>
    </div>
  )
}

export default Perks
