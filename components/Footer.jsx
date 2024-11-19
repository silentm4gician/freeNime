import Link from "next/link";

const CustomHR = ({
  color = "gray-200",
  thickness = 2,
  className = "",
  ...props
}) => {
  const isCustomColor = color.startsWith("#") || color.startsWith("rgb");
  const hrClass = isCustomColor ? "" : `border-${color}`;
  const thicknessClass = `border-t-${thickness}`;

  return (
    <div className="flex items-center w-full">
      <hr
        className={`flex-grow ${hrClass} ${thicknessClass} ${className}`}
        style={isCustomColor ? { borderColor: color } : {}}
        {...props}
      />
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-20 pb-4 px-4 sm:px-6 lg:px-8">
      <CustomHR
        color="purple-400"
        thickness={2}
        className="opacity-30 border-2"
      />
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-2">
        <div className="mb-4 sm:mb-0">
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            FreeNime
          </Link>
        </div>
        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          <Link
            href="https://github.com/silentm4gician/FreeNime/tree/main#todo"
            target="_blank"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Contribute
          </Link>
          <Link
            href="https://ko-fi.com/silentM4gician"
            target="_blank"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Donate
          </Link>
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=leandroGonzalezMat@gmail.com"
            target="_blank"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>
      </div>
      <div className="text-center text-sm text-gray-600 mt-4">
        none of the streaming links are hosted on our servers
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">
        © {new Date().getFullYear()}{" "}
        <Link
          className="hover:text-gray-400 duration-200"
          href={"https://silentm4gician.netlify.app/"}
        >
          silentM4gician
        </Link>
        .
      </div>
    </footer>
  );
}
