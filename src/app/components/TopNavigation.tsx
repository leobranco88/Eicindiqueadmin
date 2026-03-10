import { Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";

// Logo EIC embutido como SVG inline — sem dependência de rede
const EicLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 880 660"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* C externo */}
    <path
      d="M636.835 598C372.344 598 157.216 464.7 157.216 327.4C157.216 190.1 372.344 56.9 636.835 56.9C686.519 56.9 734.404 60.8 779.46 68.1C827.859 75.9 877.865 56.2 877.865 22C877.865 3.1 857.169 -12 826.51 -16.8C766.605 -26 702.909 -31 636.899 -31C285.701 -31 0 113 0 327.4C0 541.8 285.701 685.8 636.835 685.8C702.845 685.8 766.541 680.8 826.445 671.6C857.104 666.8 877.801 651.7 877.801 632.8C877.801 598.6 827.795 578.9 779.396 586.2C734.34 593.5 686.455 597.4 636.77 597.4L636.835 598Z"
      fill="white"
    />
    {/* E */}
    <path
      d="M305.248 450C305.055 530 455.265 594 639.991 594.3L790.587 594.6C838.6 594.7 877.615 558.8 877.615 514.8C877.615 471 838.986 435.2 791.165 435.1L640.634 434.8C566.525 434.6 506.299 401.1 506.364 361.5L506.492 248L790.587 248.7C838.6 248.8 877.615 213 877.615 169C877.615 125.2 838.922 89.4 791.165 89.3L309.811 87.9L305.184 450H305.248Z"
      fill="white"
    />
    {/* Ponto laranja */}
    <circle cx="991" cy="292" r="97" fill="#EC5800" />
  </svg>
);

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, activeColor: "#FF5C00" },
  { path: "/indicacoes", label: "Indicações", icon: Users, activeColor: "#6B3FA0" },
  { path: "/relatorios", label: "Relatórios", icon: FileText, activeColor: "#F5A800", disabled: true },
  { path: "/configuracoes", label: "Configurações", icon: Settings, activeColor: "#070738", disabled: true },
];

export function TopNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    // "Indicações" redireciona para o dashboard (que já tem a tabela)
    if (item.path === "/indicacoes") {
      e.preventDefault();
      navigate("/");
    }
  };

  return (
    <nav className="bg-white" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.06)' }}>
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded-lg px-2 py-1"
              style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #6B3FA0 50%, #070738 100%)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '0.05em',
                }}
              >
                EIC
              </span>
            </div>
            <span
              className="hidden sm:block text-[#070738] leading-tight"
              style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, maxWidth: '100px' }}
            >
              Escola de Idiomas e Cultura
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${item.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: isActive ? 600 : 400 }}
                >
                  <Icon
                    size={18}
                    style={{ color: isActive ? item.activeColor : '#9CA3AF' }}
                  />
                  <span style={{ color: isActive ? '#070738' : '#6B7280' }}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div
                className="text-[#070738]"
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}
              >
                Admin EIC
              </div>
              <div
                className="text-gray-500"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}
              >
                Administrador
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
              style={{ backgroundColor: '#6B3FA0' }}
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
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: isActive ? 600 : 400 }}
              >
                <Icon
                  size={18}
                  style={{ color: isActive ? item.activeColor : '#9CA3AF' }}
                />
                <span style={{ color: isActive ? '#070738' : '#6B7280' }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
