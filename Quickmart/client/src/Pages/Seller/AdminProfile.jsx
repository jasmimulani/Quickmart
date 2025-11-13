import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

const AdminProfile = () => {
  const { sellerProfile } = useAppContext();
  const [imageError, setImageError] = useState(false);

  // Admin photos with professional women administrators
  const adminPhotos = {
    "1": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    "2": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face", 
    "3": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    "default": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face"
  };

  // Fallback images using data URLs (base64 encoded simple avatars)
  const fallbackImages = {
    "1": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjM0RjU2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0ZGRiIvPgo8cGF0aCBkPSJNNDAgMTgwQzQwIDE0MCA4MCAxMjAgMTAwIDEyMEMxMjAgMTIwIDE2MCAxNDAgMTYwIDE4MEg0MFoiIGZpbGw9IiNGRkYiLz4KPC9zdmc+",
    "2": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOENCN0Y1Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0ZGRiIvPgo8cGF0aCBkPSJNNDAgMTgwQzQwIDE0MCA4MCAxMjAgMTAwIDEyMEMxMjAgMTIwIDE2MCAxNDAgMTYwIDE4MEg0MFoiIGZpbGw9IiNGRkYiLz4KPC9zdmc+",
    "3": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjU5M0UwIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0ZGRiIvPgo8cGF0aCBkPSJNNDAgMTgwQzQwIDE0MCA4MCAxMjAgMTAwIDEyMEMxMjAgMTIwIDE2MCAxNDAgMTYwIDE4MEg0MFoiIGZpbGw9IiNGRkYiLz4KPC9zdmc+",
    "default": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNjc3NDhCIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0ZGRiIvPgo8cGF0aCBkPSJNNDAgMTgwQzQwIDE0MCA4MCAxMjAgMTAwIDEyMEMxMjAgMTIwIDE2MCAxNDAgMTYwIDE4MEg0MFoiIGZpbGw9IiNGRkYiLz4KPC9zdmc+"
  };

  if (!sellerProfile) {
    return (
      <div className="p-6 w-full">
        <h2 className="text-xl font-semibold">Admin</h2>
        <p className="text-gray-600 mt-2">Loading profile...</p>
      </div>
    );
  }

  console.log('Seller Profile:', sellerProfile); // Debug log
  const adminPhoto = adminPhotos[sellerProfile.key] || adminPhotos.default;
  const fallbackPhoto = fallbackImages[sellerProfile.key] || fallbackImages.default;

  const handleImageError = (e) => {
    console.log('Image failed to load, using fallback'); // Debug log
    e.target.src = fallbackPhoto;
  };

  return (
    <div className="p-6 w-full">
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Admin Photo */}
          <div className="w-40 h-40 md:w-52 md:h-52 shrink-0 relative">
            <img
              src={adminPhoto}
              alt={`${sellerProfile.name} - Admin`}
              className="w-full h-full object-cover rounded-xl border border-gray-100 shadow-md"
              onError={handleImageError}
              onLoad={() => console.log('Image loaded successfully')} // Debug log
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{sellerProfile.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{sellerProfile.role?.toUpperCase()}</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                Active
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                <p className="mt-1 text-gray-800 font-medium">{sellerProfile.email}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Profile Key</p>
                <p className="mt-1 text-gray-800 font-medium">{sellerProfile.key}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Permissions</p>
                <p className="mt-1 text-gray-800">Full access to products and orders</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Last login</p>
                <p className="mt-1 text-gray-800">Just now</p>
              </div>
            </div>

            {/* <div className="mt-6 flex flex-wrap gap-3">
              <a href="/seller/dashboard/orders" className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black">
               View Orders 
              </a>
              <a href="/seller/dashboard/user-list" className="inline-flex items-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                View Users
              </a>
            </div> */}
          </div>
        </div>
      </div>

      {/* Admin Team Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              key: "1",
              name: "Admin One",
              photo: adminPhotos["1"],
              fallback: fallbackImages["1"],
              role: "Senior Admin",
              status: "Online"
            },
            {
              key: "2", 
              name: "Admin Two",
              photo: adminPhotos["2"],
              fallback: fallbackImages["2"],
              role: "Product Manager",
              status: "Online"
            },
            {
              key: "3",
              name: "Admin Three", 
              photo: adminPhotos["3"],
              fallback: fallbackImages["3"],
              role: "Order Manager",
              status: "Online"
            }
          ].map((admin) => (
            <div key={admin.key} className="bg-white rounded-xl border border-gray-200 p-4 shadow-soft hover-lift transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={admin.photo} 
                    alt={admin.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                    onError={(e) => { e.target.src = admin.fallback; }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{admin.name}</h4>
                  <p className="text-xs text-gray-500">{admin.role}</p>
                </div>
                <span className="text-xs text-green-600 font-medium">{admin.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;


