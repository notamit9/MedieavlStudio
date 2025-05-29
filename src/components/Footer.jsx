const Footer = () => {
  return (
    <footer className="w-full bg-black py-6 text-white">
  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="text-center text-sm font-light md:text-left">
      Medieval Studio &copy; {new Date().getFullYear()}
    </p>
    <p className="text-center text-sm font-light md:text-left">
      <a href="mailto:medieval.studio.games@gmail.com" className="underline">
        medieval.studio.games@gmail.com
      </a>
    </p>
  </div>
</footer>
  );
};

export default Footer;
