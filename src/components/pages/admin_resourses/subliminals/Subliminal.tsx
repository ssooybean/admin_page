import ThemeLinks from "@/shared/ThemeLinks";
import { Outlet } from "react-router-dom";

const Subliminal = () => {
  return (
    <section>
      <ThemeLinks
        links={[
          { text: "Общие", url: import.meta.env.VITE_GEN_PATH },
          { text: "Любовь", url: import.meta.env.VITE_LOVE_PATH },
          { text: "Деньги", url: import.meta.env.VITE_MONEY_PATH },
          { text: "Успех", url: import.meta.env.VITE_WORK_PATH },
          { text: "Работа", url: import.meta.env.VITE_FRIEND_PATH },
          { text: "Друзья", url: import.meta.env.VITE_SUCCESS_PATH },
        ]}
      />
      <section className="mt-8">
        <Outlet />
      </section>
    </section>
  );
};

export default Subliminal;
