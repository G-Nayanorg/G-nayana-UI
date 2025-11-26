import { useLocation, useNavigate, Link } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Gnayanlogo } from "../assets";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState } from "react";

// ✅ shadcn/ui components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const apiBase = import.meta.env.VITE_API_BASE || "";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const getAuthToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("authToken");

  // Local base navigation (single source of truth)
  const baseNav = [
    // { id: "home", title: "Home", url: "/" },
    // { id: "dr", title: "Diabetic Retinopathy", url: "/diabetic-retinopathy" },
    {
      id: "hero",
      title: "Hero",
      url: { pathname: "/", hash: "#hero" },
    },
    {
      id: "how-it-works",
      title: "How It Works",
      url: { pathname: "/", hash: "#ai-model-works" },
    },
    {
      id: "benefits",
      title: "Benefits",
      url: { pathname: "/", hash: "#key-benefits" },
    },
    {
      id: "use-cases",
      title: "Use Cases",
      url: { pathname: "/", hash: "#ai-model-in-action" },
    },
    {
      id: "technology",
      title: "Technology",
      url: { pathname: "/", hash: "#technology" },
    },
    // { id: "contact", title: "Contact", url: "/contact" },
    { id: "login", title: "Login", url: "/login", onlyMobile: false },
  ];

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    let mounted = true;
    fetch(`${apiBase}/Get_patient_Clinical_and_PREDICTION_data/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setUser({
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          email: data.email ?? "",
          username: data.username ?? "",
          avatar: data.avatar_url ?? "",
          role: data.role ?? "",
        });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
      });

    return () => {
      mounted = false;
      enablePageScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close mobile nav when location changes (route/hash change)
  useEffect(() => {
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const toggleNavigation = () => {
    setOpenNavigation((prev) => {
      if (!prev) disablePageScroll();
      else enablePageScroll();
      return !prev;
    });
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  // Build nav items using baseNav + role-driven items when logged in
  const navItems = (() => {
    if (!isLoggedIn) return baseNav;
    // clone base and remove Login item for logged in users
    const filtered = baseNav.filter(
      (it) => String(it.title).toLowerCase() !== "login"
    );
    // role-based additions
    const additions = [];
    if (user?.role === "superadmin" || user?.role === "client") {
      additions.push({
        id: "register-patient",
        title: "Register-Patient",
        url: "/register-patient",
      });
    }
    if (user?.role !== "superadmin") {
      additions.push({
        id: "patient-records",
        title: "Patient Records",
        url: "/patient-records",
      });
    }
    if (user?.role === "superadmin") {
      additions.push({
        id: "tenant-patients",
        title: "Tenant Patients",
        url: "/tenant-patients",
      });
    }
    return [...filtered, ...additions];
  })();

  // helpers for url handling
  const isObjectUrl = (u) =>
    u && typeof u === "object" && ("pathname" in u || "hash" in u);

  const normalizeHash = (u) => {
    if (isObjectUrl(u) && u.hash) return u.hash;
    if (typeof u === "string") {
      const idx = u.indexOf("#");
      return idx >= 0 ? u.slice(idx) : "";
    }
    return "";
  };

  const isHashActive = (hash) => {
    if (!hash) return false;
    return location.hash === hash;
  };

  // Determine active state for nav item
  const isItemActive = (itemUrl) => {
    if (!itemUrl) return false;
    if (isObjectUrl(itemUrl)) {
      if (itemUrl.hash) return isHashActive(itemUrl.hash);
      return itemUrl.pathname === location.pathname;
    }
    const str = String(itemUrl);
    if (str.includes("#")) {
      const idx = str.indexOf("#");
      const hash = str.slice(idx);
      return isHashActive(hash);
    }
    return str === location.pathname;
  };

  // link class with consistent padding/spacing
  const getLinkClass = (isActive, onlyMobile) =>
    `block font-code uppercase transition-colors
     ${onlyMobile ? "lg:hidden" : ""}
     text-n-8 hover:text-color-1
     px-4 py-3
     lg:px-5 lg:py-3
     text-lg lg:text-sm lg:font-semibold
     ${isActive ? "text-n-8" : "text-n-8/50"}`;

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-2 lg:bg-n-1/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-1" : "bg-n-1/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-2 lg:px-3 xl:px-10 py-3 lg:py-4 w-full">
        <Link className="block w-[12rem] xl:mr-0" to="/">
          <img src={Gnayanlogo} width={60} height={60} alt="G-nayan" />
        </Link>

        {/* Mobile hamburger button (always available on mobile) */}
        <div className="ml-auto lg:hidden">
          <Button
            className="p-0"
            px=""
            onClick={toggleNavigation}
            aria-controls="site-navigation"
            aria-expanded={!!openNavigation}
            aria-label={openNavigation ? "Close navigation" : "Open navigation"}
          >
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>

        {/* Navigation - single source of links for both mobile & desktop */}
        <nav
          id="site-navigation"
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-1 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-20 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navItems.map((item) => {
              const itemUrl = item.url;
              const active = isItemActive(itemUrl);
              // build `to` prop: object for anchor/hash links, string otherwise
              const toProp = isObjectUrl(itemUrl)
                ? {
                    pathname: itemUrl.pathname ?? "/",
                    hash: itemUrl.hash ?? "",
                  }
                : String(itemUrl || "/");

              return (
                <Link
                  key={item.id ?? item.title}
                  to={toProp}
                  onClick={handleClick}
                  className={getLinkClass(active, item.onlyMobile)}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* desktop hamburger/menu placeholder (keeps original visual component for layout) */}
          <div className="hidden lg:block">
            <HamburgerMenu />
          </div>
        </nav>

        {/* Avatar Menu (desktop & mobile) */}
        {isLoggedIn && user ? (
          <div className="ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer bg-gray-200">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback>
                      {user.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-gray-100 shadow-lg"
                align="end"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border border-gray" />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile Settings
                  </DropdownMenuItem>
                  {user?.role === "superadmin" && (
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 font-semibold hover:border-1 hover:bg-gray-300 rounded px-3 py-1"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
