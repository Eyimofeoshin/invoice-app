import React, { useState } from 'react';
import { useInvoices } from './InvoiceContext';
import boxShape from './delete-shape.png';

const InvoiceForm = ({ invoiceData, onClose }) => {
  const { addInvoice, updateInvoice } = useInvoices();
  const isEditing = !!invoiceData;

  const [formData, setFormData] = useState({
    createdAt: invoiceData?.createdAt || new Date().toISOString().split('T')[0],
    description: invoiceData?.description || '',
    paymentTerms: invoiceData?.paymentTerms || '30',
    clientName: invoiceData?.clientName || '',
    clientEmail: invoiceData?.clientEmail || '',
    senderStreet: invoiceData?.senderAddress?.street || '',
    senderCity: invoiceData?.senderAddress?.city || '',
    senderPostCode: invoiceData?.senderAddress?.postCode || '',
    senderCountry: invoiceData?.senderAddress?.country || '',
    clientStreet: invoiceData?.clientAddress?.street || '',
    clientCity: invoiceData?.clientAddress?.city || '',
    clientPostCode: invoiceData?.clientAddress?.postCode || '',
    clientCountry: invoiceData?.clientAddress?.country || '',
    items: invoiceData?.items || []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear error when user starts typing
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...formData.items];
    list[index][name] = value;
    if (name === 'quantity' || name === 'price') {
      list[index].total = Number(list[index].quantity) * Number(list[index].price);
    }
    setFormData(prev => ({ ...prev, items: list }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const preparePayload = (status) => {
    const grandTotal = formData.items.reduce((acc, item) => acc + (Number(item.total) || 0), 0);
    return {
      ...formData,
      id: invoiceData?.id || Math.random().toString(36).substr(2, 6).toUpperCase(),
      status: status || invoiceData?.status || 'Pending',
      total: grandTotal,
      senderAddress: {
        street: formData.senderStreet,
        city: formData.senderCity,
        postCode: formData.senderPostCode,
        country: formData.senderCountry
      },
      clientAddress: {
        street: formData.clientStreet,
        city: formData.clientCity,
        postCode: formData.clientPostCode,
        country: formData.clientCountry
      }
    };
  };

  // NEW: Validation Logic for Error Detection
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.clientName) tempErrors.clientName = "can't be empty";
    if (!formData.clientEmail) tempErrors.clientEmail = "can't be empty";
    if (!formData.clientStreet) tempErrors.clientStreet = "can't be empty";
    if (!formData.clientCity) tempErrors.clientCity = "can't be empty";
    if (!formData.clientPostCode) tempErrors.clientPostCode = "can't be empty";
    if (!formData.clientCountry) tempErrors.clientCountry = "can't be empty";
    if (!formData.description) tempErrors.description = "can't be empty";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = (e, status) => {
    e.preventDefault();
    // Validate unless saving as Draft
    if (status !== 'Draft' && !validateForm()) return;
    
    const payload = preparePayload(status);
    isEditing ? updateInvoice(invoiceData.id, payload) : addInvoice(payload);
    onClose();
  };

  return (
    <div className="form-drawer">
      <h2 className="heading-m">
        {isEditing ? <>Edit <span className="hash">#</span>{invoiceData.id}</> : 'New Invoice'}
      </h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <section>
          <p className="purple-text">Bill From</p>
          <div className="input-group">
            <label>Street Address</label>
            <input name="senderStreet" value={formData.senderStreet} onChange={handleChange} type="text" />
          </div>
          <div className="input-grid-3">
            <div><label>City</label><input name="senderCity" value={formData.senderCity} onChange={handleChange} type="text" /></div>
            <div><label>Post Code</label><input name="senderPostCode" value={formData.senderPostCode} onChange={handleChange} type="text" /></div>
            <div><label>Country</label><input name="senderCountry" value={formData.senderCountry} onChange={handleChange} type="text" /></div>
          </div>
        </section>

        <section>
          <p className="purple-text">Bill To</p>
          {/* Example of Field with Error */}
          <div className="input-group">
            <div className="label-flex">
              <label className={errors.clientName ? 'error-text' : ''}>Client's Name</label>
              {errors.clientName && <span className="error-msg">{errors.clientName}</span>}
            </div>
            <input 
              name="clientName" 
              className={errors.clientName ? 'error-border' : ''} 
              value={formData.clientName} 
              onChange={handleChange} 
              type="text" 
            />
          </div>
          
          <div className="input-group">
            <div className="label-flex">
              <label className={errors.clientEmail ? 'error-text' : ''}>Client's Email</label>
              {errors.clientEmail && <span className="error-msg">{errors.clientEmail}</span>}
            </div>
            <input 
              name="clientEmail" 
              className={errors.clientEmail ? 'error-border' : ''} 
              value={formData.clientEmail} 
              onChange={handleChange} 
              type="email" 
            />
          </div>

          <div className="input-group">
            <div className="label-flex">
              <label className={errors.clientStreet ? 'error-text' : ''}>Street Address</label>
              {errors.clientStreet && <span className="error-msg">{errors.clientStreet}</span>}
            </div>
            <input 
              name="clientStreet" 
              className={errors.clientStreet ? 'error-border' : ''} 
              value={formData.clientStreet} 
              onChange={handleChange} 
              type="text" 
            />
          </div>

          <div className="input-grid-3">
            <div>
              <div className="label-flex">
                <label className={errors.clientCity ? 'error-text' : ''}>City</label>
              </div>
              <input name="clientCity" className={errors.clientCity ? 'error-border' : ''} value={formData.clientCity} onChange={handleChange} type="text" />
            </div>
            <div>
              <div className="label-flex">
                <label className={errors.clientPostCode ? 'error-text' : ''}>Post Code</label>
              </div>
              <input name="clientPostCode" className={errors.clientPostCode ? 'error-border' : ''} value={formData.clientPostCode} onChange={handleChange} type="text" />
            </div>
            <div>
              <div className="label-flex">
                <label className={errors.clientCountry ? 'error-text' : ''}>Country</label>
              </div>
              <input name="clientCountry" className={errors.clientCountry ? 'error-border' : ''} value={formData.clientCountry} onChange={handleChange} type="text" />
            </div>
          </div>
        </section>

        <div className="input-grid-2">
          <div className="form-group">
            <label>Invoice Date</label>
            <div className="calendar-input-wrapper">
              <input name="createdAt" value={formData.createdAt} onChange={handleChange} type="date" />
            </div>
          </div>
          <div className ="input-group" backgroundColor="var(--card-bg)">
            <label>Payment Terms</label>
            <select name="paymentTerms" value={formData.paymentTerms} onChange={handleChange}>
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <div className="label-flex">
            <label className={errors.description ? 'error-text' : ''}>Project Description</label>
            {errors.description && <span className="error-msg">{errors.description}</span>}
          </div>
          <input 
            name="description" 
            className={errors.description ? 'error-border' : ''} 
            value={formData.description} 
            onChange={handleChange} 
            type="text" 
          />
        </div>

        <h3 className="item-list-title">Item List</h3>
        <div className="item-list">
          <div className="item-list-header">
            <span className="col-name">Item Name</span>
            <span className="col-qty">Qty.</span>
            <span className="col-price">Price</span>
            <span className="col-total">Total</span>
            <span></span> 
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="item-row">
              <div className="col-name"><input name="name" value={item.name} onChange={(e) => handleItemChange(index, e)} type="text" /></div>
              <div className="col-qty"><input name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} type="number" /></div>
              <div className="col-price"><input name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} type="number" /></div>
              <div className="col-total"><div className="total-val">{(item.total || 0).toFixed(2)}</div></div>
              <button type="button" className="delete-item" onClick={() => removeItem(index)}>
                 <img src={boxShape} alt="delete" />
              </button>
            </div>
          ))}
          <button type="button" className="add-item-btn" onClick={addItem}>+ Add New Item</button>
        </div>

        {/* Global Error Prompt */}
        {Object.keys(errors).length > 0 && (
          <div className="global-error-prompt">
            <p>- All fields must be added</p>
          </div>
        )}

        <div className="form-actions">
          {isEditing ? (
            <div className="edit-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="save-btn" onClick={(e) => handleSave(e)}>Save Changes</button>
            </div>
          ) : (
            <div className="new-actions">
              <button type="button" className="discard-btn" onClick={onClose}>Discard</button>
              <button type="button" className="draft-btn" onClick={(e) => handleSave(e, 'Draft')}>Save as Draft</button>
              <button type="submit" className="save-btn" onClick={(e) => handleSave(e, 'Pending')}>Save & Send</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};


export default InvoiceForm;