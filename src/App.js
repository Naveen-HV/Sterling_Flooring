import React, { useState, useEffect, useCallback } from 'react';

// --- Data for LVT Glue Down Calculator ---
const initialLvtServicesData = [
  { id: 'lvtFloorPrice', name: 'Floor Price m2', defaultCostPerM2: '', isSelected: true, wastage: '', type: 'service', allowWastage: true },
  { id: 'lvtFittingCost', name: 'Fitting cost m2', isSelected: true, wastage: '', type: 'service', allowWastage: true },

  { id: 'lvtWoodPrepHeader', name: 'Wood Subfloor Prep', type: 'header', color: 'bg-gray-200' },
  { id: 'lvtPlywood6mm', name: '6mm SP101 Plywood', defaultCostPerM2: '23.15', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtFittingPlywood6mm', name: 'Fitting Cost of 6mm Plywood', defaultCostPerM2: '8.77', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtPlywood9mm', name: '9mm SP101 Plywood', defaultCostPerM2: '32.62', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtFittingPlywood9mm', name: 'Fitting Cost of 9mm Plywood', defaultCostPerM2: '10.52', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtFeatherFinish', name: 'Feather Finish', defaultCostPerM2: '2.50', isSelected: false, wastage: '', type: 'service', allowWastage: false },

  { id: 'lvtConcretePrepHeader', name: 'Concrete Subfloor Prep', type: 'header', color: 'bg-gray-200' },
  { id: 'lvtScreed3mmArdex', name: '3mm Ardex NA Screed p', defaultCostPerM2: '12.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtFittingScreed3mm', name: '3mm Screed fitting price', defaultCostPerM2: '7.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtScreed6mmArdex', name: '6mm Ardex NA Screed price', defaultCostPerM2: '24.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtFittingScreed6mm', name: '6mm Screed fitting price', defaultCostPerM2: '10.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtMv5Vapour', name: 'MV5 95 Vapour Suppressant', defaultCostPerM2: '9.20', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtFittingMV5', name: 'Fitting of MV5 95', defaultCostPerM2: '6.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtDpm1cDampProof', name: 'DPM1C Damp Proof Membrane', defaultCostPerM2: '27.77', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtFittingDPM', name: 'Fitting of DPM', defaultCostPerM2: '6.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtGrindingService', name: 'Grinding Service', defaultCostPerM2: '15.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtAdditionalServicesHeader', name: 'Additional Services / Adhesive', type: 'header', color: 'bg-gray-200' },
  { id: 'lvtUniversalGlue', name: 'Universal Glue', defaultCostPerM2: '2.86', isSelected: false, wastage: '', type: 'service', allowWastage: true },
  { id: 'lvtUpliftCarpets', name: 'Uplift/Disposal ( Carpets )', defaultCostPerM2: '6.75', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtUpliftHardFloor', name: 'Uplift/Disposal ( Click hard floor )', defaultCostPerM2: '8.75', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'lvtRemoveRefitSkirtings', name: 'Remove/Refit Skirtings', defaultCostPerM2: '6.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
];

const initialLvtSingularItems = [
  { id: 'lvtDelivery', name: 'Delivery', qty: '1', costX1: '45.00' },
  { id: 'lvtDoorBarsStandard', name: 'Door Bars', qty: '', costX1: '' },
  { id: 'lvtBelow8m2Minimum', name: 'Below 8m2 ( minimum room )', qty: '', costX1: '150.00' },
  { id: 'lvtCustomItem1', name: '', qty: '', costX1: '' }, // Name changed to empty string
  { id: 'lvtCustomItem2', name: '', qty: '', costX1: '' }, // Name changed to empty string
];

// --- Data for All Click Calculator ---
const initialClickServicesData = [
  { id: 'clickFloorPrice', name: 'Floor Price m²', defaultCostPerM2: '', isSelected: true, wastage: '', type: 'service', allowWastage: true },
  { id: 'clickFittingCost', name: 'Fitting Cost m²', defaultCostPerM2: '', isSelected: true, wastage: '', type: 'service', allowWastage: true },

  { id: 'clickWoodSubfloorPrepHeader', name: 'Wood Subfloor Prep', type: 'header', color: 'bg-gray-200' },
  { id: 'click6mmStdPlywood', name: '6mm Std Plywood', defaultCostPerM2: '14.03', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'clickFittingCost6mmPlywood', name: 'Fitting Cost of 6mm Plywood', defaultCostPerM2: '8.77', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'click9mmStdPlywood', name: '9mm Std Plywood', defaultCostPerM2: '18.59', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'clickFittingCost9mmPlywood', name: 'Fitting Cost of 9mm Plywood', defaultCostPerM2: '10.52', isSelected: false, wastage: '', type: 'service', allowWastage: false },

  { id: 'clickConcreteSubfloorPrepHeader', name: 'Concrete Subfloor Prep', type: 'header', color: 'bg-gray-200' },
  { id: 'click3mmArdexNAScreed', name: '3mm Ardex NA Screed Price', defaultCostPerM2: '12.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'click3mmScreedFitting', name: '3mm Screed Fitting Price', defaultCostPerM2: '7.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'click6mmArdexNAScreed', name: '6mm Ardex NA Screed Price', defaultCostPerM2: '24.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'click6mmScreedFitting', name: '6mm Screed Fitting Price', defaultCostPerM2: '10.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'clickGrindingService', name: 'Grinding Service', defaultCostPerM2: '15.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },

  { id: 'clickAdditionalServicesHeader', name: 'Additional Services/Materials', type: 'header', color: 'bg-gray-200' },
  { id: 'clickUpliftCarpets', name: 'Uplift/Disposal (Carpets)', defaultCostPerM2: '6.75', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'clickUpliftHardFloor', name: 'Uplift/Disposal (Click Hard Floor)', defaultCostPerM2: '8.75', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'clickRemoveRefitSkirtings', name: 'Remove/Refit Skirtings', defaultCostPerM2: '6.00', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'clickBeading', name: 'Beading', defaultCostPerM2: '1.59', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'clickFitBeading', name: 'Fit Beading', defaultCostPerM2: '2.50', isSelected: false, wastage: '', type: 'service', allowWastage: false },
  { id: 'clickUnderlayAcoustic', name: 'Underlay (Acoustic 100)', defaultCostPerM2: '6.99', isSelected: false, wastage: '', type: 'service', allowWastage: false },
];

const initialClickSingularItems = [
  { id: 'clickDelivery', name: 'Delivery', qty: '1', costX1: '45.00' },
  { id: 'clickDoorBars', name: 'Door Bars', qty: '', costX1: '' },
  { id: 'clickDpmRoll', name: 'DPM Roll 100m²', qty: '', costX1: '100.00' },
  { id: 'clickBelow10m2LamLvt', name: 'Below 10m² (Minimum Room) Lam/Lvt', qty: '', costX1: '100.00' },
  { id: 'clickBelow10m2EngWd', name: 'Below 10m² (Minimum Room) Eng. Wd', qty: '', costX1: '200.00' },
  { id: 'clickTrimInternalDoor', name: 'Trim Internal Door', qty: '', costX1: '30.00' },
  { id: 'clickCustomItem1', name: '', qty: '', costX1: '' }, // Name changed to empty string
  { id: 'clickCustomItem2', name: '', qty: '', costX1: '' }, // Name changed to empty string
];


// --- Reusable Calculator Logic Hook ---
// This hook encapsulates the state and handlers for a single calculator type
function useCalculatorLogic(initialServices, initialSingularItems, customerNettSize) {
  const [services, setServices] = useState(() =>
    initialServices.map(service => ({ ...service, costPerM2: service.defaultCostPerM2 }))
  );
  const [singularItems, setSingularItems] = useState(initialSingularItems);
  const [floorPricePerM2, setFloorPricePerM2] = useState('');
  const [fittingCostPerM2, setFittingCostPerM2] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [editingServiceCostId, setEditingServiceCostId] = useState(null);

  // Function to reset the internal state of this specific calculator logic
  const resetCalculatorState = useCallback(() => {
    setServices(initialServices.map(service => ({
      ...service,
      costPerM2: service.defaultCostPerM2,
      isSelected: service.id.includes('FloorPrice') || service.id.includes('FittingCost'), // Keep these selected by default
      wastage: ''
    })));
    setSingularItems(initialSingularItems.map(item => ({
      ...item,
      qty: item.id === 'lvtDelivery' || item.id === 'clickDelivery' ? '1' : '', // Special case for delivery qty
      costX1: item.costX1 // Revert to original default costX1
    })));
    setFloorPricePerM2('');
    setFittingCostPerM2('');
    setTotalCost(0);
    setEditingServiceCostId(null);
  }, [initialServices, initialSingularItems]);


  // Common input handlers for services
  const handleFloorPriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFloorPricePerM2(value);
      setServices(prevServices =>
        prevServices.map(service =>
          service.id.includes('FloorPrice') ? { ...service, costPerM2: value } : service
        )
      );
    }
  };

  const handleFittingCostChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFittingCostPerM2(value);
      setServices(prevServices =>
          prevServices.map(service =>
            service.id.includes('FittingCost') ? { ...service, costPerM2: value } : service
          )
        );
    }
  };

  const handleServiceToggle = (id) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, isSelected: !service.isSelected } : service
      )
    );
  };

  const handleWastageChange = (id, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setServices(prevServices =>
        prevServices.map(service =>
          service.id === id ? { ...service, wastage: value } : service
        )
      );
    }
  };

  const handleServiceCostChange = (id, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setServices(prevServices =>
        prevServices.map(service =>
          service.id === id ? { ...service, costPerM2: value } : service
        )
      );
    }
  };

  // Common input handlers for singular items
  const handleSingularItemQtyChange = (id, value) => {
    if (/^\d*$/.test(value)) {
      setSingularItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, qty: value } : item
        )
      );
    }
  };

  const handleSingularItemCostChange = (id, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setSingularItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, costX1: value } : item
        )
      );
    }
  };

  const handleSingularItemNameChange = (id, value) => {
    setSingularItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, name: value } : item
      )
    );
  };

  const startEditingCost = (id) => setEditingServiceCostId(id);
  const saveEditingCost = () => setEditingServiceCostId(null);

  // Calculates the 'Nett Size x Cost' for a single service item,
  // considering wastage if applicable.
  const calculateNettSizeXCost = useCallback((service) => {
    const nettSize = parseFloat(customerNettSize); // Use passed customerNettSize
    const costPerM2 = parseFloat(service.costPerM2);
    const wastage = service.allowWastage ? parseFloat(service.wastage || 0) : 0;

    if (isNaN(nettSize) || isNaN(costPerM2) || !service.isSelected) {
      return 0;
    }
    const costBeforeWastage = nettSize * costPerM2;
    const totalCostWithWastage = costBeforeWastage * (1 + wastage / 100);
    return totalCostWithWastage;
  }, [customerNettSize]); // Dependency on customerNettSize

  // Effect hook to recalculate the total cost whenever relevant state changes
  useEffect(() => {
    let calculatedTotal = 0;
    services.forEach(service => {
      if (service.type === 'service' && service.isSelected) {
        calculatedTotal += calculateNettSizeXCost(service);
      }
    });
    singularItems.forEach(item => {
      const qty = parseFloat(item.qty);
      const costX1 = parseFloat(item.costX1);
      if (!isNaN(qty) && !isNaN(costX1)) {
        calculatedTotal += qty * costX1;
      }
    });
    setTotalCost(calculatedTotal);
  }, [customerNettSize, services, singularItems, calculateNettSizeXCost]);

  return {
    services, setServices, singularItems, setSingularItems,
    floorPricePerM2, setFloorPricePerM2, fittingCostPerM2, setFittingCostPerM2,
    totalCost, setTotalCost, editingServiceCostId, setEditingServiceCostId,
    handleFloorPriceChange, handleFittingCostChange, handleServiceToggle,
    handleWastageChange, handleServiceCostChange, handleSingularItemQtyChange,
    handleSingularItemCostChange, handleSingularItemNameChange,
    startEditingCost, saveEditingCost, resetCalculatorState // Expose reset function
  };
}

// --- Common Calculator UI Component ---
// This component renders the table structure for any calculator type
function CalculatorSection({
  title, description,
  customerName, rooms, customerNettSize, handleCustomerNameChange, handleRoomsChange, handleNettSizeChange,
  services, singularItems, floorPricePerM2, fittingCostPerM2,
  handleFloorPriceChange, handleFittingCostChange, handleServiceToggle,
  handleWastageChange, handleServiceCostChange, handleSingularItemQtyChange,
  handleSingularItemCostChange, handleSingularItemNameChange,
  startEditingCost, saveEditingCost, editingServiceCostId, totalCost
}) {
  // Calculates the 'Nett Size x Cost' for a single service item,
  // considering wastage if applicable.
  const calculateNettSizeXCost = useCallback((service) => {
    const nettSize = parseFloat(customerNettSize);
    const costPerM2 = parseFloat(service.costPerM2);
    const wastage = service.allowWastage ? parseFloat(service.wastage || 0) : 0;

    if (isNaN(nettSize) || isNaN(costPerM2) || !service.isSelected) {
      return 0;
    }
    const costBeforeWastage = nettSize * costPerM2;
    const totalCostWithWastage = costBeforeWastage * (1 + wastage / 100);
    return totalCostWithWastage;
  }, [customerNettSize]);


  return (
    <>
      {/* Description Section - Moved to top */}
      <div className="mb-4 p-3 bg-blue-50 rounded-md"> {/* Adjusted padding/margin */}
        <p className="text-xs text-gray-700"> {/* Adjusted size */}
          {description}
        </p>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h1>

      {/* Customer Name Input Section */}
      <div className="mb-3 p-3 bg-blue-50 rounded-md">
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name:
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={handleCustomerNameChange}
          placeholder="e.g., Arianne "
          className="mt-0.5 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Rooms Input Section */}
      <div className="mb-3 p-3 bg-blue-50 rounded-md">
        <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">
          Rooms:
        </label>
        <input
          type="text"
          id="rooms"
          value={rooms}
          onChange={handleRoomsChange}
          placeholder="e.g., Living Room, Kitchen, Hallway"
          className="mt-0.5 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Customer's Nett Size Input Section */}
      <div className="mb-4 p-3 bg-blue-50 rounded-md">
        <label htmlFor="customerNettSize" className="block text-base font-medium text-gray-700 mb-1">
          Customer's Nett Size <span className="text-xs text-gray-500">(m²)</span>:
        </label>
        <input
          type="text"
          id="customerNettSize"
          value={customerNettSize}
          onChange={handleNettSizeChange}
          placeholder="e.g., 62.49"
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
        />
      </div>

      {/* Calculator Table Section */}
      <div className="overflow-x-hidden"> {/* Changed to overflow-x-hidden to remove scrollbar */}
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                Item
              </th>
              <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="form-checkbox h-3 w-3 text-blue-600 rounded" disabled />
              </th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost per m²
              </th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wastage %
              </th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                Nett Size x Cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Floor Price and Fitting Cost inputs (always editable) */}
            <tr className="bg-blue-50">
              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                Floor Price m²
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-center">
                <input
                  type="checkbox"
                  checked={services.find(s => s.id.includes('FloorPrice')).isSelected}
                  onChange={() => handleServiceToggle(services.find(s => s.id.includes('FloorPrice')).id)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-md cursor-pointer"
                />
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="text"
                  value={floorPricePerM2}
                  onChange={handleFloorPriceChange}
                  placeholder="e.g., 42.99"
                  className="w-16 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted width and font
                />
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="text"
                  value={services.find(s => s.id.includes('FloorPrice')).wastage}
                  onChange={(e) => handleWastageChange(services.find(s => s.id.includes('FloorPrice')).id, e.target.value)}
                  placeholder="e.g., 15"
                  className="w-16 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted width and font
                />
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-right text-sm text-gray-800 font-semibold">
                £{calculateNettSizeXCost(services.find(s => s.id.includes('FloorPrice'))).toFixed(2)}
              </td>
            </tr>
            <tr className="bg-blue-50">
              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                Fitting Cost m²
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-center">
                <input
                  type="checkbox"
                  checked={services.find(s => s.id.includes('FittingCost')).isSelected}
                  onChange={() => handleServiceToggle(services.find(s => s.id.includes('FittingCost')).id)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-md cursor-pointer"
                />
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="text"
                  value={fittingCostPerM2}
                  onChange={handleFittingCostChange}
                  placeholder="e.g., 26.00"
                  className="w-16 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted width and font
                />
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="text"
                  value={services.find(s => s.id.includes('FittingCost')).wastage}
                  onChange={(e) => handleWastageChange(services.find(s => s.id.includes('FittingCost')).id, e.target.value)}
                  placeholder="e.g., 15"
                  className="w-16 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted width and font
                />
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-right text-sm text-gray-800 font-semibold">
                £{calculateNettSizeXCost(services.find(s => s.id.includes('FittingCost'))).toFixed(2)}
              </td>
            </tr>

            {/* Dynamically rendered service items and section headers */}
            {services.filter(s => !s.id.includes('FloorPrice') && !s.id.includes('FittingCost')).map((service) => (
              service.type === 'header' ? (
                // Render a header row
                <tr key={service.id} className={`${service.color || 'bg-gray-50'}`}>
                  <td colSpan="5" className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-b-lg">
                    {service.name}
                  </td>
                </tr>
              ) : (
                // Render a regular service item row
                <tr key={service.id}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={service.isSelected}
                      onChange={() => handleServiceToggle(service.id)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded-md cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 flex items-center justify-between">
                    {editingServiceCostId === service.id ? (
                      // Show input field and Save button when editing
                      <>
                        <input
                          type="text"
                          value={service.costPerM2}
                          onChange={(e) => handleServiceCostChange(service.id, e.target.value)}
                          placeholder="Cost"
                          className="w-16 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted width and font
                        />
                        <button
                          onClick={saveEditingCost}
                          className="ml-1 px-1 py-0.5 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors duration-200"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      // Show cost and Edit button when not editing
                      <>
                        <span>£{parseFloat(service.costPerM2).toFixed(2)}</span>
                        <button
                          onClick={() => startEditingCost(service.id)}
                          className="ml-1 px-1 py-0.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {service.allowWastage ? (
                      // Show wastage input if allowed for this service
                      <input
                        type="text"
                        value={service.wastage}
                        onChange={(e) => handleWastageChange(service.id, e.target.value)}
                        placeholder="e.g., 15"
                        className="w-16 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted width and font
                      />
                    ) : (
                      // Otherwise, show a dash
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right text-sm text-gray-800">
                    {service.isSelected ? `£${calculateNettSizeXCost(service).toFixed(2)}` : '£0.00'}
                  </td>
                </tr>
              )
            ))}

            {/* Singular Items Section Header */}
            <tr className="bg-gray-200">
              <td colSpan="5" className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-b-lg">
                Singular Items
              </td>
            </tr>
            {/* Dynamically rendered singular items, including custom lines */}
            {singularItems.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id.includes('CustomItem') ? (
                    // Allow editing name for custom items, using placeholder
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleSingularItemNameChange(item.id, e.target.value)}
                      placeholder="Custom Item Name" // Placeholder added
                      className="w-full px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted font
                    />
                  ) : (
                    // Display fixed name for predefined items
                    item.name
                  )}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="text"
                    value={item.qty}
                    onChange={(e) => handleSingularItemQtyChange(item.id, e.target.value)}
                    placeholder="Qty"
                    className="w-12 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted width and font
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="text"
                    value={item.costX1}
                    onChange={(e) => handleSingularItemCostChange(item.id, e.target.value)}
                    placeholder="Cost x1"
                    className="w-16 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm text-xs" // Adjusted width and font
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-right text-sm text-gray-800 font-semibold" colSpan="2">
                  £{((parseFloat(item.qty) || 0) * (parseFloat(item.costX1) || 0)).toFixed(2)}
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-blue-100">
              <td colSpan="4" className="px-3 py-2 whitespace-nowrap text-right text-base font-bold text-gray-900 rounded-bl-lg">
                Total:
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-right text-xl font-extrabold text-blue-700 rounded-br-lg">
                £{totalCost.value.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}


// --- Main App Component ---
function App() {
    // ... (your existing state variables) ...

  // NEW: Add a useEffect to set the document title
  useEffect(() => {
    document.title = "Sterling Home - Flooring Calculator"; // Set your desired tab name here
  }, []); // The empty array ensures this runs only once after the initial render

  // ... (your existing handlePrint and handleReset functions) ..
  // State to manage which calculator is active ('lvt' or 'click')
  const [calculatorType, setCalculatorType] = useState('lvt'); // Default to LVT

  // General customer info states (shared across all calculator types)
  const [customerName, setCustomerName] = useState('');
  const [rooms, setRooms] = useState('');
  const [customerNettSize, setCustomerNettSize] = useState('');

  // Use the custom hook for LVT Calculator logic, passing shared customerNettSize
  const lvtCalc = useCalculatorLogic(initialLvtServicesData, initialLvtSingularItems, customerNettSize);
  // Use the custom hook for Click Calculator logic, passing shared customerNettSize
  const clickCalc = useCalculatorLogic(initialClickServicesData, initialClickSingularItems, customerNettSize);

  // --- Print Handler ---
  const handlePrint = () => {
    window.print(); // Triggers the browser's print dialog
  };

  // --- Reset All Data Handler ---
  const handleReset = () => {
    setCustomerName('');
    setRooms('');
    setCustomerNettSize('');
    lvtCalc.resetCalculatorState(); // Call reset function from hook
    clickCalc.resetCalculatorState(); // Call reset function from hook
  };

  // --- Rendered JSX (Main App Component) ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      {/* Print-specific styles to ensure table content fits on the page */}
      <style>
        {`
        @media print {
          /* Hide elements not needed in print, like the print button itself and the toggle */
          .print-button-container, .no-print, .calculator-toggle, .reset-button {
            display: none !important;
          }
          /* Ensure the main container expands to fit content */
          .max-w-4xl {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .shadow-lg, .rounded-lg {
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          /* Ensure the table container doesn't hide overflow */
          .overflow-x-auto {
            overflow-x: visible !important;
            width: 100% !important;
          }
          /* Make the table itself fit the page */
          .min-w-full {
            width: 100% !important;
            min-width: 100% !important;
            table-layout: fixed !important; /* Helps with column width distribution */
          }
          /* Adjust font size for better print readability */
          body {
            font-size: 10pt; /* Smaller font for print */
          }
          /* Reduce padding/margins for print to maximize content space */
          .p-4, .p-6, .p-8 {
            padding: 0.5rem !important;
          }
          .px-6, .py-4, .py-3 {
            padding: 0.25rem 0.5rem !important;
          }
          /* Ensure borders are visible */
          .divide-y {
            border-collapse: collapse;
          }
          .divide-y > * + * {
            border-top-width: 1px !important;
            border-color: #e5e7eb !important; /* Ensure border color is visible */
          }
          /* Make sure inputs and buttons don't break layout */
          input, button {
            box-sizing: border-box;
          }
          /* Force column widths to be proportional for print */
          table th:nth-child(1), table td:nth-child(1) { width: 30%; } /* Item */
          table th:nth-child(2), table td:nth-child(2) { width: 5%; text-align: center; } /* Checkbox */
          table th:nth-child(3), table td:nth-child(3) { width: 20%; } /* Cost per m2 */
          table th:nth-child(4), table td:nth-child(4) { width: 15%; } /* Wastage % */
          table th:nth-child(5), table td:nth-child(5) { width: 30%; text-align: right; } /* Nett Size x Cost */

          /* Adjust specific elements for print */
          .bg-blue-50 { background-color: #e0f2fe !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .bg-gray-200 { background-color: #e5e7eb !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .bg-blue-100 { background-color: #dbeafe !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        `}
      </style>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">Sterling Home</h1> {/* Further adjusted size */}
        <h2 className="text-xl font-semibold text-gray-600 mb-6 text-center">Quick Hard Flooring Calculator</h2> {/* Adjusted size */}

        {/* Calculator Type Toggle */}
        <div className="calculator-toggle mb-5 flex justify-center space-x-2"> {/* Adjusted space */}
          <button
            onClick={() => setCalculatorType('lvt')}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-colors duration-200 ${ /* Adjusted size and padding */
              calculatorType === 'lvt' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            1. LVT Glue Down Calculator
          </button>
          <button
            onClick={() => setCalculatorType('click')}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-colors duration-200 ${ /* Adjusted size and padding */
              calculatorType === 'click' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            2. All Click Calculator
          </button>
        </div>

        {calculatorType === 'lvt' && (
          <CalculatorSection
            title="LVT Glue Down"
            description="This quote provides a quick calculation for glue-down flooring by adding together the approximate square metre prices of the required items and multiplying the total by the size of the room. It is intended as a helpful pricing guide and not a final quote. This will not be 100% accurate, as factors such as pack or tub sizes and exact product requirements will be accounted for in the full, detailed quotation."
            customerName={customerName}
            rooms={rooms}
            customerNettSize={customerNettSize}
            handleCustomerNameChange={(e) => setCustomerName(e.target.value)}
            handleRoomsChange={(e) => setRooms(e.target.value)}
            handleNettSizeChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setCustomerNettSize(value);
              }
            }}
            services={lvtCalc.services}
            singularItems={lvtCalc.singularItems}
            floorPricePerM2={lvtCalc.floorPricePerM2}
            fittingCostPerM2={lvtCalc.fittingCostPerM2}
            handleFloorPriceChange={lvtCalc.handleFloorPriceChange}
            handleFittingCostChange={lvtCalc.handleFittingCostChange}
            handleServiceToggle={lvtCalc.handleServiceToggle}
            handleWastageChange={lvtCalc.handleWastageChange}
            handleServiceCostChange={lvtCalc.handleServiceCostChange}
            handleSingularItemQtyChange={lvtCalc.handleSingularItemQtyChange}
            handleSingularItemCostChange={lvtCalc.handleSingularItemCostChange}
            handleSingularItemNameChange={lvtCalc.handleSingularItemNameChange}
            startEditingCost={lvtCalc.startEditingCost}
            saveEditingCost={lvtCalc.saveEditingCost}
            editingServiceCostId={lvtCalc.editingServiceCostId}
            totalCost={{value: lvtCalc.totalCost, setter: lvtCalc.setTotalCost}} // Pass totalCost as an object with value and setter
          />
        )}

        {calculatorType === 'click' && (
          <CalculatorSection
            title="All Click"
            description="This quote provides a quick calculation for click flooring by adding together the approximate square metre prices of the required items and multiplying the total by the size of the room. It is intended as a helpful pricing guide and not a final quote. This will not be 100% accurate, as factors such as pack or sheet sizes and exact product requirements will be accounted for in the full, detailed quotation."
            customerName={customerName}
            rooms={rooms}
            customerNettSize={customerNettSize}
            handleCustomerNameChange={(e) => setCustomerName(e.target.value)}
            handleRoomsChange={(e) => setRooms(e.target.value)}
            handleNettSizeChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setCustomerNettSize(value);
              }
            }}
            services={clickCalc.services}
            singularItems={clickCalc.singularItems}
            floorPricePerM2={clickCalc.floorPricePerM2}
            fittingCostPerM2={clickCalc.fittingCostPerM2}
            handleFloorPriceChange={clickCalc.handleFloorPriceChange}
            handleFittingCostChange={clickCalc.handleFittingCostChange}
            handleServiceToggle={clickCalc.handleServiceToggle}
            handleWastageChange={clickCalc.handleWastageChange}
            handleServiceCostChange={clickCalc.handleServiceCostChange}
            handleSingularItemQtyChange={clickCalc.handleSingularItemQtyChange}
            handleSingularItemCostChange={clickCalc.handleSingularItemCostChange}
            handleSingularItemNameChange={clickCalc.handleSingularItemNameChange}
            startEditingCost={clickCalc.startEditingCost}
            saveEditingCost={clickCalc.saveEditingCost}
            editingServiceCostId={clickCalc.editingServiceCostId}
            totalCost={{value: clickCalc.totalCost, setter: clickCalc.setTotalCost}} // Pass totalCost as an object with value and setter
          />
        )}

        {/* Action Buttons: Print and Reset */}
        <div className="mt-8 flex justify-center space-x-4 print-button-container">
          <button
            onClick={handlePrint}
            className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Print / Save as PDF
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 reset-button"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
