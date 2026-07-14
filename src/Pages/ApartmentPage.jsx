import { useState } from "react";

function Apartment() {
  // State-yada maamula Modal-ka iyo Xogta Guud
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [editingApartment, setEditingApartment] = useState(null); // Lagu daray si loo ogaado haddii la badalayo xog

  // State-yada maamula Inputs-ka Foomka cusub
  const [unit, setUnit] = useState("");
  const [floor, setFloor] = useState("1");
  const [size, setSize] = useState("");
  const [rent, setRent] = useState("");
  const [status, setStatus] = useState("Vacant");
  const [bedrooms, setBedrooms] = useState("1"); // Lagu daray input-ka Bedrooms ee foomka ku jiray

  // Function-ka marka foomka la keeno (Submit) xogta miiska ku daraya ama wax ka beddelaya
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingApartment) {
      // WAX KA BEDDEL (EDIT ACTION)
      const updatedApartments = apartments.map((apt) => {
        if (apt.id === editingApartment.id) {
          return {
            ...apt,
            unit: unit,
            floor: floor,
            type: `${bedrooms} Bed`,
            size: size || "800",
            rent: Number(rent).toLocaleString(),
            status: status,
          };
        }
        return apt;
      });
      setApartments(updatedApartments);
      setEditingApartment(null);
    } else {
      // ABURISTA SHAYGA CUSUB (CREATE ACTION)
      const newApartment = {
        id: Date.now(), // Aqoonsi gaar ah (ID) oo kumeel gaar ah
        unit: unit,
        floor: floor,
        type: `${bedrooms} Bed`, // Hadda waxay ka imaanaysaa input-ka Bedrooms
        size: size || "800",
        rent: Number(rent).toLocaleString(), // Qaab lacageed u beddel
        status: status,
      };
      setApartments([...apartments, newApartment]);
    }

    // 3. Nadiifi foomka si loogu diyaariyo mid kale
    setUnit("");
    setFloor("1");
    setSize("");
    setRent("");
    setStatus("Vacant");
    setBedrooms("1");

    // 4. Xir modal-ka
    setIsModalOpen(false);
  };

  // Function-ka marka la rabo in wax laga beddelo apartment gaar ah
  const handleEditClick = (apt) => {
    setEditingApartment(apt);
    setUnit(apt.unit);
    setFloor(apt.floor);
    setSize(apt.size);
    setRent(apt.rent.replace(/,/g, "")); // Ka saar comma-ha si nambarka kaliya u haro
    setStatus(apt.status);
    setBedrooms(apt.type.split(" ")[0] || "1");
    setIsModalOpen(true);
  };

  // Function-ka marka la masaxayo apartment (DELETE ACTION)
  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this apartment?")) {
      const filtered = apartments.filter((apt) => apt.id !== id);
      setApartments(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700 font-sans relative">
      
      {/* MAIN CONTENT AREA */}
      <div className="p-8 max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-4 space-x-2">
          <span>App</span>
          <span>&gt;</span>
          <span className="text-slate-600 font-medium">Apartments</span>
        </nav>

        {/* Header Title & Add Button */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a]">Apartments</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Manage building units and occupancy
            </p>
          </div>
          <button 
            onClick={() => { setEditingApartment(null); setIsModalOpen(true); }}
            className="bg-[#0f172a] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm hover:bg-slate-800 transition flex items-center space-x-2"
          >
            <span>+</span> <span>Add New Apartment</span>
          </button>
        </div>

        {/* WHITE CONTAINER CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          
          {/* Table Search Row */}
          <div className="relative w-80 mb-6">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search unit number..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition"
            />
          </div>

          {/* DATA TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold">
                  <th className="pb-4 pt-2 font-medium w-[12%]">Unit</th>
                  <th className="pb-4 pt-2 font-medium w-[12%]">Floor</th>
                  <th className="pb-4 pt-2 font-medium w-[25%]">Type</th>
                  <th className="pb-4 pt-2 font-medium w-[25%]">Status</th>
                  <th className="pb-4 pt-2 font-medium w-[14%]">Rent</th>
                  <th className="pb-4 pt-2 font-medium w-[12%] text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-slate-700 text-sm font-medium">
                {apartments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-slate-400 font-normal">
                      No apartments found. Click "+ Add New Apartment" to create one.
                    </td>
                  </tr>
                ) : (
                  apartments.map((apt) => (
                    <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="py-4 font-bold text-slate-800">{apt.unit}</td>
                      <td className="py-4 text-slate-500">{apt.floor}</td>
                      <td className="py-4 text-slate-500">{apt.type} &bull; {apt.size} sqft</td>
                      <td className="py-4">
                        {apt.status === "Vacant" ? (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-600 font-medium border border-slate-200/50 w-28">
                            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            <span>Vacant</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-600 font-medium border border-emerald-100 w-28">
                            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Occupied</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 font-semibold text-slate-800">${apt.rent}</td>
                      
                      {/* QAYBTA CUSUB: Badhamada Edit iyo Delete ee la rabo */}
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleEditClick(apt)}
                            className="p-1 text-slate-400 hover:text-slate-600 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(apt.id)}
                            className="p-1 text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded p-1 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* POP-UP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-slate-100 relative mx-4">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {editingApartment ? `Edit Apartment ${editingApartment.unit}` : "Add New Apartment"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-medium"
              >
                &times;
              </button>
            </div>

            {/* Foomka dhagaysanaya marka la keeno xogta */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Unit Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 101" 
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Floor</label>
                  <input 
                    type="number" 
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Size (sq ft)</label>
                  <input 
                    type="number" 
                    placeholder="800" 
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Bedrooms</label>
                  <input 
                    type="number" 
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Rent Amount ($)</label>
                  <input 
                    type="number" 
                    placeholder="1500" 
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 bg-white"
                  >
                    <option value="Vacant">Vacant</option>
                    <option value="Occupied">Occupied</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-50">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#0f172a] text-white text-sm font-medium px-5 py-2 rounded-xl shadow-sm hover:bg-slate-800 transition"
                >
                  {editingApartment ? "Save Changes" : "Create Apartment"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Apartment