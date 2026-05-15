import {
  FaGithub,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo/dummy-shop-high-resolution-logo-transparent.png";

const footerLinks = [
  {
    heading: "Shop",
    links: ["New Arrivals", "Best Sellers", "Sale", "Gift Cards", "All Products"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Press", "Blog", "Affiliates"],
  },
  {
    heading: "Support",
    links: ["FAQ", "Shipping & Returns", "Track Order", "Contact Us", "Size Guide"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
  },
];

const socialLinks = [
  { icon: FaGithub, label: "GitHub" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaXTwitter, label: "X / Twitter" },
  { icon: FaFacebook, label: "Facebook" },
];

function Footer() {
  return (
    <footer className="bg-slate-700 text-slate-300">
      <div className="max-w-7xl mx-auto px-5 pt-14 pb-8">

        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 pb-10 border-b border-slate-600">

          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <img
              src={logo}
              alt="Dummy Shop"
              className="h-10 w-auto self-start"
            />
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Your go-to destination for quality products at unbeatable prices.
              Shop thousands of items, delivered fast.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-slate-500">
          <span>© 2026 Dummy Shop. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-slate-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
