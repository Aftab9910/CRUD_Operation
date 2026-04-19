export default function Navbar() {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}