import React, { useState } from "react";

interface PiUser {
  uid: string;
  username: string;
  accessToken: string;
}

const SCOPES = ["username", "payments"];

const PiLogin: React.FC<{
  onAuth: (user: PiUser) => void;
  user: PiUser | null;
}> = ({ onAuth, user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!window.Pi) {
        setError("Pi SDK not loaded. Please use Pi Browser.");
        setLoading(false);
        return;
      }
      window.Pi.authenticate(
        SCOPES,
        (auth) => {
          onAuth({
            uid: auth.user.uid,
            username: auth.user.username,
            accessToken: auth.accessToken,
          });
          setLoading(false);
        },
        (err) => {
          setError(err?.message || "Authentication failed");
          setLoading(false);
        }
      );
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-green-600">@{user.username}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded shadow"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login with Pi"}
      </button>
      {error && <span className="text-red-500 text-xs mt-2">{error}</span>}
    </div>
  );
};

export type { PiUser };
export default PiLogin;
