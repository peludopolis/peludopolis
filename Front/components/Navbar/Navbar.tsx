import Link from "next/link"


const Navbar = () => {
    return (
      <nav className="text-aliceblue flex justify-between items-center p-4 bg-primary-color shadow-md">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            HOME
          </Link>
          <input
            type="text"
            placeholder="Busca un servicio"
            className="border rounded-lg px-3 py-1.5 text-sm w-1/3 text-black"
          />
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  