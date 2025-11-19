'use client';

import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const PlanSub = () => {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    planType: '',
    duration: '',
    price: '',
    customPrice: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const planTypeOptions = ['Monthly', 'Yearly'];
  const durationOptions = ['30', '365'];
  const priceOptions = ['34.99', '4.99', 'Custom'];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'price' && value !== 'Custom' && { customPrice: '' })
    }));
  };

  const handleCreatePlan = () => {
    if (formData.planType && formData.duration && formData.price) {
      const finalPrice = formData.price === 'Custom' ? formData.customPrice : formData.price;
      
      if (!finalPrice) {
        alert('Please enter a custom price');
        return;
      }

      if (editingId) {
        setPlans(plans.map(plan => 
          plan.id === editingId 
            ? { ...plan, ...formData, price: finalPrice }
            : plan
        ));
        setEditingId(null);
      } else {
        setPlans([...plans, {
          id: Date.now(),
          ...formData,
          price: finalPrice
        }]);
      }

      setFormData({ planType: '', duration: '', price: '', customPrice: '' });
      setShowModal(false);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleEditPlan = (plan) => {
    setFormData({
      planType: plan.planType,
      duration: plan.duration,
      price: priceOptions.includes(plan.price) ? plan.price : 'Custom',
      customPrice: !priceOptions.includes(plan.price) ? plan.price : ''
    });
    setEditingId(plan.id);
    setShowModal(true);
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const totalSubscription = plans.reduce((sum, plan) => sum + parseFloat(plan.price), 0).toFixed(2);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl">
        {/* Total Subscription Card */}
        <div className="bg-white w-1/2 rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Subscription</h3>
          <div className="flex items-baseline justify-between">
            <h2 className="text-4xl font-bold text-gray-900">${totalSubscription}</h2>
            <span className="text-green-600 text-sm font-medium">+12% this month</span>
          </div>
        </div>

        {/* Create Subscription Plan Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Create Subscription Plan</h2>
          
          <div className="space-y-4">
            {/* Plan Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
              <select
                value={formData.planType}
                onChange={(e) => handleFormChange('planType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              >
                <option value="">Select type</option>
                {planTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Duration Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={formData.duration}
                onChange={(e) => handleFormChange('duration', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              >
                <option value="">Select duration</option>
                {durationOptions.map(option => (
                  <option key={option} value={option}>{option} days</option>
                ))}
              </select>
            </div>

            {/* Price Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <select
                value={formData.price}
                onChange={(e) => handleFormChange('price', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              >
                <option value="">Select price</option>
                {priceOptions.map(option => (
                  <option key={option} value={option}>${option}</option>
                ))}
              </select>
            </div>

            {/* Custom Price Input - Show only when Custom is selected */}
            {formData.price === 'Custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Price</label>
                <input
                  type="number"
                  value={formData.customPrice}
                  onChange={(e) => handleFormChange('customPrice', e.target.value)}
                  placeholder="Enter custom price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                />
              </div>
            )}

            {/* Create/Update Button */}
            <button
              onClick={handleCreatePlan}
              className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {editingId ? 'Update Plan' : 'Create'}
            </button>
          </div>
        </div>

        {/* Plans Display */}
        {plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No subscription plans yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map(plan => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#4A90E2]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plan.planType} Plan</h3>
                    <p className="text-sm text-gray-600 mt-1">${plan.price}/year</p>
                  </div>
                  <span className="bg-blue-100 text-[#4A90E2] text-xs font-semibold px-3 py-1 rounded-full">7Days Free Trial</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <p><span className="font-medium">Duration:</span> {plan.duration} days</p>
                  <p><span className="font-medium">Price:</span> ${plan.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleEditPlan(plan)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanSub;
