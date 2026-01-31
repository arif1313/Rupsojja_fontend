const Navbar = () => {
  return (
    <nav className="bg-pink-500 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-2xl font-bold">FashionHub</h1>

        <ul className="hidden md:flex gap-6">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Category</li>
          <li className="cursor-pointer">Shop</li>
          <li className="cursor-pointer">Cart</li>
        </ul>

        <button className="md:hidden text-2xl">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
