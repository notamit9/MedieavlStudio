import { FaInstagram, FaGooglePlay, FaGamepad, FaEnvelope, FaWhatsapp, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { icon: <FaInstagram />, url: "https://www.instagram.com/medieval_studio", label: "Instagram" },
  { icon: <FaGooglePlay />, url: "https://play.google.com/store/apps/dev?id=9041958043014239534&hl=en", label: "Play Store" },
  { icon: <FaGamepad />, url: "https://not-amit.itch.io/", label: "itch.io" },
  { icon: <FaYoutube />, url: "https://www.youtube.com/@MedievalStudio", label: "YouTube" },
  { icon: <FaWhatsapp />, url: "https://wa.me/919971511780?text=Hi", label: "WhatsApp" },
];

const quickLinks = [
  { name: "About", url: "#about" },
  { name: "Games", url: "#about" },
  { name: "Team", url: "#story" },
  { name: "Contact", url: "#contact" },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-b from-black via-violet-950/20 to-black text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                <span className="text-white font-zentry font-bold text-2xl">M</span>
              </div>
              <div>
                <h3 className="font-zentry font-bold text-2xl">Medieval Studio</h3>
                <p className="text-white/50 text-sm">Indie Game Developers</p>
              </div>
            </div>
            <p className="text-white/60 text-sm text-center md:text-left max-w-xs leading-relaxed">
              Crafting Legends, Forging Worlds. We are a passionate indie game development team from India, creating immersive gaming experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-general text-sm uppercase tracking-widest text-violet-400 mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 items-center md:items-start">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-general uppercase tracking-wider hover:pl-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-general text-sm uppercase tracking-widest text-violet-400 mb-6">Connect With Us</h4>

            {/* Social Icons */}
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Email */}
            <a
              href="mailto:medieval.studio.games@gmail.com"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 text-sm"
            >
              <FaEnvelope />
              <span>medieval.studio.games@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-white/40 text-sm font-general">
            Medieval Studio &copy; {new Date().getFullYear()} | Made with passion in India
          </p>
          <p className="text-white/30 text-xs">
            Designed & Developed by Medieval Studio Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
