function Footer() {
  return (
    <footer className="bg-[#1e1b16] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">

        {/* LOGO + DESC */}
        <div>
          <h2 className="text-2xl font-bold">
            Docu <span className="text-[#2f67e9]">Wise</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            AI-powered document analysis platform for smarter insights,
            faster decisions, and better workflows.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">API</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400">
            Email: support@docuwise.ai
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Made with ❤️ 
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} DocuWise. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;