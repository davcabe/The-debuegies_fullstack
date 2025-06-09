// app/routes/profile.tsx
export default function Profile() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome!
          </h2>
          <p className="text-gray-700 text-base">
            This is your profile page.
          </p>
        </div>
      </div>
    );
  }