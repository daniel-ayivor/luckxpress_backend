import { GiBirdTwitter } from "react-icons/gi"
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5"
import { MdFacebook, MdWhatsapp } from "react-icons/md"


const Footer = () => {
  return (
    <div>
        <footer className="relative mt-20 bg-gray-800 px-4 pt-20">
        <footer className="font-sans tracking-wide ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-5">
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Our Story</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Newsroom</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Careers</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Blog</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Services</h4>
          <ul className="space-y-5">
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Web Development</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Testing Automation</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">AWS Development Services</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Mobile App Development</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Platforms</h4>
          <ul className="space-y-5">
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all"><MdFacebook />Facebook</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all"><MdWhatsapp />Whatsap</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all"><IoLogoInstagram />Instagram</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all"><IoLogoTwitter />Twitter</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Company</h4>
          <ul className="space-y-5">
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Accessibility</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">About</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Contact</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Learn more</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center border-[#6b5f5f] pt-4 mt-8">
        <p className="text-gray-300 text-[15px]">
          © ReadymadeUI. All rights reserved.
        </p>
      </div>
    </footer>
</footer>

    </div>
  )
}

export default Footer