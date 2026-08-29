import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("coach");
    localStorage.removeItem("student");
    navigate("/");
  };

  const navItems = [
    ["📊 Dashboard", "/dashboard"],
    ["👨‍🎓 Students", "/students"],
    ["➕ Add Student", "/add-student"],
    ["🏃 Coaches", "/coaches"],
    ["➕ Add Coach", "/add-coach"],
    ["📅 Attendance History", "/attendance-history"],
  ];

  const sidebarContent = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1
              style={{
                fontSize: "48px",
                color: "#facc15",
                margin: 0,
                fontWeight: "900",
              }}
            >
              SPD
            </h1>
            <p style={{ color: "#dbeafe", fontSize: "15px", marginTop: "4px", marginBottom: 0 }}>
              Student Performance Drive
            </p>
          </div>
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {navItems.map(([label, path]) => (
            <button
              key={path}
              onClick={() => {
                navigate(path);
                if (isMobile) setIsOpen(false);
              }}
              style={{
                padding: "14px 18px",
                borderRadius: "12px",
                border: "none",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.25s ease"
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p
          style={{
            color: "#64748b",
            fontSize: "13px",
            marginBottom: "16px",
            textAlign: "center"
          }}
        >
          Powered by Skipnot AD Studios 🚀
        </p>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#ef4444",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Logout 🚪
        </button>
      </div>
    </div>
  );

  // If mobile, render hamburger top-bar and slide-out overlay drawer
  if (isMobile) {
    return (
      <>
        {/* Top Header Bar on Mobile */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "60px",
            background: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            boxSizing: "border-box",
            zIndex: 999,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ color: "#facc15", margin: 0, fontSize: "24px", fontWeight: "900" }}>SPD</h1>
            <span style={{ color: "#94a3b8", fontSize: "14px" }}>Admin</span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              color: "white",
              padding: "8px 12px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ☰ Menu
          </button>
        </div>

        {/* Height spacer to prevent content overlapping top header */}
        <div style={{ height: "60px", width: "100%" }}></div>

        {/* Slide-out Sidebar Drawer */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
            }}
            onClick={() => setIsOpen(false)}
          >
            <div
              style={{
                width: "280px",
                height: "100%",
                background: "#0f172a",
                borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "24px",
                boxSizing: "border-box",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar (Default)
  return (
    <div
      style={{
        width: "300px",
        minHeight: "100vh",
        background: "rgba(30, 41, 59, 0.45)",
        backdropFilter: "blur(18px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "30px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 0
      }}
    >
      {sidebarContent}
    </div>
  );
}

export default Sidebar;