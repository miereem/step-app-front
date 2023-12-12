import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "py-2 px-6 ";
    if (type === subpage) {
      classes += "bg-gray-900 rounded-full text-white";
    }
    return classes;
  }

  return (
    <nav className="w-full flex justify-center mt-8 gap-6 mb-8">
      <Link className={linkClasses("profile")} to={"/account"}>
        My profile
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        My steps
      </Link>
    </nav>
  );
}
