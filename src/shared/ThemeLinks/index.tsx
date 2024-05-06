import { NavLink, useLocation } from "react-router-dom";

interface ThemeLinksProps {
  links: {
    text: string;
    url: string;
  }[];
}

const ThemeLinks = (props: ThemeLinksProps) => {
  const location =
    useLocation().pathname.split("/").filter(Boolean).pop() + "/";
  console.log(location);
  return (
    <nav>
      <ul className="flex gap-5 flex-wrap">
        {props.links.map((l) => {
          return (
            <NavLink
              key={l.url} // Добавьте key для избежания предупреждения о ключе
              to={l.url}
              className={({ isActive }) =>
                `border rounded-full px-8 py-2 transition-all ${
                  isActive ? "border-blue-600" : ""
                } ${location === l.url && "border-blue-600"}`
              }
            >
              {l.text}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};
export default ThemeLinks;
