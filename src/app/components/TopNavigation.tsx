import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";
import logoSvg from "../../imports/logo.svg";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, activeColor: "#FF5C00", disabled: false },
  { path: "/indicacoes", label: "Indicações", icon: Users, activeColor: "#6B3FA0", disabled: false },
  { path: "/relatorios", label: "Relatórios", icon: FileText, activeColor: "#F5A800", disabled: true },
  { path: "/configuracoes", label: "Configurações", icon: Settings, activeColor: "#070738", disabled: true },
];

export function TopNavigation() {
  const location = useLocation();

  return (
    <nav className="bg-white" style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoSvg} alt="EIC" className="h-8 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              if (item.disabled) {
                return (
                  <span
                    key={item.path}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg opacity-35 cursor-not-allowed"
                    style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 400 }}
                  >
                    <Icon size={18} style={{ color: "#9CA3AF" }} />
                    <span style={{ color: "#6B7280" }}>{item.label}</span>
                  </span>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-gray-50"
                  style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: isActive ? 600 : 400 }}
                >
                  <Icon size={18} style={{ color: isActive ? item.activeColor : "#9CA3AF" }} />
                  <span style={{ color: isActive ? "#070738" : "#6B7280" }}>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div
                className="text-[#070738]"
                style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600 }}
              >
                Admin EIC
              </div>
              <div className="text-gray-500" style={{ fontFamily: "var(--font-body)", fontSize: "12px" }}>
                Administrador
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
              style={{ backgroundColor: "#6B3FA0" }}
            >
              A
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.disabled ? "#" : item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${item.disabled ? "opacity-35 pointer-events-none" : ""}`}
                style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: isActive ? 600 : 400 }}
              >
                <Icon size={18} style={{ color: isActive ? item.activeColor : "#9CA3AF" }} />
                <span style={{ color: isActive ? "#070738" : "#6B7280" }}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
