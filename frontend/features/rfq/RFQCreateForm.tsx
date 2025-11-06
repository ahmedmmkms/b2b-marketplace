'use client';

import React, { useState } from 'react';
import { RFQCreate, RFQLineCreate } from './types';

interface RFQCreateFormProps {
  onSubmit: (rfqData: RFQCreate) => void;
  onCancel?: () => void;
}

const RFQCreateForm: React.FC<RFQCreateFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [lines, setLines] = useState<RFQLineCreate[]>([
    { description: '', quantity: 0, uom: '', targetPrice: 0 }
  ]);

  const handleAddLine = () => {
    setLines([...lines, { description: '', quantity: 0, uom: '', targetPrice: 0 }]);
  };

  const handleRemoveLine = (index: number) => {
    if (lines.length > 1) {
      const newLines = [...lines];
      newLines.splice(index, 1);
      setLines(newLines);
    }
  };

  const handleLineChange = (index: number, field: keyof RFQLineCreate, value: string | number) => {
    const newLines = [...lines];
    newLines[index] = { ...newLines[index], [field]: value };
    setLines(newLines);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      title, 
      notes, 
      lines: lines.map(line => ({ 
        ...line, 
        quantity: Number(line.quantity), 
        targetPrice: line.targetPrice ? Number(line.targetPrice) : undefined 
      }))
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New RFQ</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Requirements
          </label>
          <button
            type="button"
            onClick={handleAddLine}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Add Line
          </button>
        </div>
        
        {lines.map((line, index) => {
          const descriptionId = `description-${index}`;
          const quantityId = `quantity-${index}`;
          const uomId = `uom-${index}`;
          const targetPriceId = `targetPrice-${index}`;

          return (
            <div key={index} className="mb-3 p-3 border rounded bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                <div className="md:col-span-5">
                  <label className="block text-gray-600 text-xs mb-1" htmlFor={descriptionId}>
                    Description *
                  </label>
                  <input
                    type="text"
                    id={descriptionId}
                    value={line.description}
                    onChange={(e) => handleLineChange(index, 'description', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 text-xs mb-1" htmlFor={quantityId}>
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id={quantityId}
                    value={line.quantity}
                    onChange={(e) => handleLineChange(index, 'quantity', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 text-xs mb-1" htmlFor={uomId}>
                    UOM *
                  </label>
                  <input
                    type="text"
                    id={uomId}
                    value={line.uom}
                    onChange={(e) => handleLineChange(index, 'uom', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 text-xs mb-1" htmlFor={targetPriceId}>
                    Target Price
                  </label>
                  <input
                    type="number"
                    id={targetPriceId}
                    value={line.targetPrice}
                    onChange={(e) => handleLineChange(index, 'targetPrice', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="md:col-span-1 flex items-end">
                  {lines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLine(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-between">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
        >
          Create RFQ
        </button>
      </div>
    </form>
  );
};

export default RFQCreateForm;
