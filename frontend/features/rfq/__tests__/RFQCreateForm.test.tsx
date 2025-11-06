import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import RFQCreateForm from '../RFQCreateForm';

describe('RFQCreateForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <RFQCreateForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
  });

  it('should render the form with required fields', () => {
    expect(screen.getByLabelText('Title *')).toBeInTheDocument();
    expect(screen.getByLabelText('Notes')).toBeInTheDocument();
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('Add Line')).toBeInTheDocument();
    
    // Check that the first line has the required fields
    expect(screen.getByLabelText('Description *')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity *')).toBeInTheDocument();
    expect(screen.getByLabelText('UOM *')).toBeInTheDocument();
    expect(screen.getByLabelText('Target Price')).toBeInTheDocument();
  });

  it('should allow adding and removing RFQ lines', () => {
    const addLineButton = screen.getByText('Add Line');
    
    fireEvent.click(addLineButton);
    expect(screen.getAllByLabelText('Description *')).toHaveLength(2);
    
    fireEvent.click(addLineButton);
    expect(screen.getAllByLabelText('Description *')).toHaveLength(3);
    
    // Remove a line (only if we have more than 1)
    const removeButtons = screen.getAllByText('Remove');
    if (removeButtons.length > 1) {
      fireEvent.click(removeButtons[0]);
      expect(screen.getAllByLabelText('Description *')).toHaveLength(2);
    }
  });

  it('should submit the form with correct data', async () => {
    // Fill in the RFQ title
    fireEvent.change(screen.getByLabelText('Title *'), {
      target: { value: 'Test RFQ' }
    });

    // Fill in notes
    fireEvent.change(screen.getByLabelText('Notes'), {
      target: { value: 'Test notes for RFQ' }
    });

    // Fill in the first line
    fireEvent.change(screen.getByLabelText('Description *'), {
      target: { value: 'Test Product' }
    });

    fireEvent.change(screen.getByLabelText('Quantity *'), {
      target: { value: '10' }
    });

    fireEvent.change(screen.getByLabelText('UOM *'), {
      target: { value: 'units' }
    });

    fireEvent.change(screen.getByLabelText('Target Price'), {
      target: { value: '100' }
    });

    // Add another line
    fireEvent.click(screen.getByText('Add Line'));
    
    const descriptionInputs = screen.getAllByLabelText('Description *');
    const quantityInputs = screen.getAllByLabelText('Quantity *');
    const uomInputs = screen.getAllByLabelText('UOM *');
    
    fireEvent.change(descriptionInputs[1], {
      target: { value: 'Test Product 2' }
    });

    fireEvent.change(quantityInputs[1], {
      target: { value: '5' }
    });

    fireEvent.change(uomInputs[1], {
      target: { value: 'items' }
    });

    fireEvent.click(screen.getByText('Create RFQ'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test RFQ',
        notes: 'Test notes for RFQ',
        lines: [
          {
            description: 'Test Product',
            quantity: 10,
            uom: 'units',
            targetPrice: 100
          },
          {
            description: 'Test Product 2',
            quantity: 5,
            uom: 'items',
            targetPrice: undefined // This should be undefined since we didn't set a target price for the second line
          }
        ]
      });
    });
  });

  it('should call onCancel when cancel button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
