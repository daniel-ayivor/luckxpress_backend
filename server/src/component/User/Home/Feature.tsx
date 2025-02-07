import ship from '../../../assets/pexels-thomas-parker-1272388137-26224664.jpg';
import frieght from '../../../assets/A sturdy freight truck glides down the highway, loaded and ready to deliver essential goods_.jpg';
// import backgroundImg from "../../../assets/Evernote.jpg";
const Feature = () => {
    return (
        <div className="flex justify-center  items-center min-h-screen">
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-12 bg-gray-100 px-4 py-20 lg:px-20">
  <div className="flex w-72 justify-center">
  <div
    className="relative w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg"
    style={{
      backgroundImage: `url(${ship})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>

    <div className="p-3">
      <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-gray-700 to-gray-400 text-center text-white shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-4 h-7 w-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 40c6 4 14 6 30 6s24-2 30-6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 40v-6c0-3 2-6 5-6h38c3 0 5 3 5 6v6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 28v-6c0-4 3-8 8-8h4c5 0 8 4 8 8v6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 28h32" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 48c4 0 8-2 8-6s-4-6-8-6-8 2-8 6 4 6 8 6zM40 48c4 0 8-2 8-6s-4-6-8-6-8 2-8 6 4 6 8 6z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="pt-1 text-right">
        <p className="text-sm font-light capitalize">Pageviews</p>
        <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">14,000</h4>
      </div>
    </div>
    <hr className="opacity-50" />
    <div className="p-4">
      <p className="font-light"><span className="text-sm font-bold text-green-600">+22% </span>vs last month</p>
    </div>
  </div>
</div>


 
    <div className="flex w-72 justify-center">
      <div
        style={{
            backgroundImage: `url(${frieght})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
      className="flex relative w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
          {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        <div className="p-3">
          <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-center text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-4 h-7 w-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="22" width="42" height="20" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M44 22h10l6 8v12H44V22z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="48" r="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="50" cy="48" r="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 48h12M44 48h12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 42h58" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="pt-1 text-right">
            <p className="text-sm font-light capitalize">Users</p>
            <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">2,300</h4>
          </div>
        </div>
        <hr className="opacity-50" />
        <div className="p-4">
          <p className="font-light"><span className="text-sm font-bold text-green-600">+3% </span>vs last month</p>
        </div>
      </div>
    </div>

 
    <div className="flex w-72 justify-center">
      <div
      
      className="flex relative w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
          {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        <div className="p-3">

          <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-center text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-4 h-7 w-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 30h34l14 12v6H6V30z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M54 42v8l-6 2v-8z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 30l12-10h8l12 10M22 42l8 6h4l8-6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="44" cy="30" r="2" fill="currentColor" stroke="none" />
              <path d="M6 30v4M54 42v4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="pt-1 inset-0 text-right">
            <p className="text-sm font-light capitalize">Sales</p>
            <h4 className="text-2xl text-gray-50 font-semibold tracking-tighter xl:text-2xl">$5,360</h4>
          </div>
        </div>
        <hr className="opacity-50" />
        <div className="p-4">
          <p className="font-light"><span className="text-sm font-bold text-red-600">-3% </span>vs last month</p>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default Feature