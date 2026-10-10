import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ServiceType, 
  BookingRequest 
} from '../types';
import { calculateQuote, JAIPUR_LOCALITIES, checkJaipurServiceArea } from '../data/pricing';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  UtensilsCrossed, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  User, 
  Info,
  FileCheck
} from 'lucide-react';

export const BookingWizard: React.FC = () => {
  const { 
    pricingConfig, 
    addBooking, 
    bookingPrefill, 
    setBookingPrefill, 
    chefs, 
    navigate,
    customerProfile 
  } = useApp();

  // Active step (1 to 8)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submissionComplete, setSubmissionComplete] = useState<BookingRequest | null>(null);

  // Form states
  const [serviceType, setServiceType] = useState<ServiceType>('daily-cook');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('07:00 PM - 09:00 PM (Dinner)');
  const [frequency, setFrequency] = useState<'Once' | '1 Meal/Day' | '2 Meals/Day (Lunch+Dinner)'>('Once');
  
  // Address
  const [address, setAddress] = useState<string>('');
  const [locality, setLocality] = useState<string>('Mansarovar');
  const [pincode, setPincode] = useState<string>('302020');
  const [landmark, setLandmark] = useState<string>('');

  // Food preferences
  const [foodType, setFoodType] = useState<'Pure Veg' | 'Veg + Egg' | 'Jain (No Onion Garlic)'>('Pure Veg');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['Rajasthani', 'North Indian']);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Spicy'>('Medium');
  const [allergies, setAllergies] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Party / Helper
  const [chefCount, setChefCount] = useState<number>(1);
  const [helperCount, setHelperCount] = useState<number>(0);
  const [occasion, setOccasion] = useState<string>('Family Dinner Gathering');

  // Contact
  const [customerName, setCustomerName] = useState<string>(customerProfile.name || '');
  const [customerPhone, setCustomerPhone] = useState<string>(customerProfile.phone || '');
  const [customerEmail, setCustomerEmail] = useState<string>(customerProfile.email || '');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call'>('WhatsApp');
  const [assignedChefId, setAssignedChefId] = useState<string | undefined>(undefined);

  // Errors
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Load Prefill from Matcher / Chatbot
  useEffect(() => {
    if (bookingPrefill) {
      if (bookingPrefill.serviceType) setServiceType(bookingPrefill.serviceType);
      if (bookingPrefill.peopleCount) setPeopleCount(bookingPrefill.peopleCount);
      if (bookingPrefill.frequency) setFrequency(bookingPrefill.frequency);
      if (bookingPrefill.locality) setLocality(bookingPrefill.locality);
      if (bookingPrefill.foodType) setFoodType(bookingPrefill.foodType);
      if (bookingPrefill.assignedChefId) setAssignedChefId(bookingPrefill.assignedChefId);
      if (bookingPrefill.cuisines) setSelectedCuisines(bookingPrefill.cuisines);
      
      // Auto move to step 2 or 3
      setCurrentStep(2);
      setBookingPrefill(null);
    }
  }, [bookingPrefill, setBookingPrefill]);

  // Live calculation based on central pricing
  const quote = calculateQuote(pricingConfig, {
    serviceType,
    peopleCount,
    frequency: serviceType === 'monthly-cook' ? frequency : undefined,
    locality,
    helperCount,
    chefCount
  });

  const assignedChef = chefs.find(c => c.id === assignedChefId);

  const toggleCuisine = (c: string) => {
    if (selectedCuisines.includes(c)) {
      if (selectedCuisines.length > 1) {
        setSelectedCuisines(selectedCuisines.filter(item => item !== c));
      }
    } else {
      setSelectedCuisines([...selectedCuisines, c]);
    }
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (currentStep === 3) {
      if (!address.trim()) {
        setErrorMsg('Please enter your street address or house number in Jaipur.');
        return;
      }
    }
    if (currentStep === 6) {
      if (!customerName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!customerPhone.trim() || customerPhone.length < 10) {
        setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmitBooking = (sendWhatsAppDirect = false) => {
    const bookingId = `GR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRequest = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      serviceType,
      packageName: quote.packageName,
      status: 'Request Submitted',
      peopleCount,
      date,
      timeSlot,
      frequency: serviceType === 'monthly-cook' ? frequency : 'Once',
      address,
      locality,
      pincode,
      landmark,
      foodType,
      cuisines: selectedCuisines,
      spiceLevel,
      allergies,
      specialInstructions,
      chefCount,
      helperCount,
      occasion,
      customerName,
      customerPhone,
      customerEmail,
      preferredContact,
      pricingSnapshot: {
        baseAmount: quote.baseAmount,
        helperAmount: quote.helperAmount,
        conveyanceAmount: quote.conveyanceAmount,
        totalAmount: quote.totalAmount,
        isCustomQuote: quote.isCustomQuote,
        breakdown: quote.breakdown
      },
      assignedChefId,
      adminNotes: assignedChef ? `Requested preferred chef: ${assignedChef.name}` : 'Awaiting admin chef allocation.'
    };

    addBooking(newBooking);
    setSubmissionComplete(newBooking);

    if (sendWhatsAppDirect) {
      const message = `*Ghar Rasoi — Booking Request Submitted*\n\n` +
        `• *Ref ID:* ${bookingId}\n` +
        `• *Name:* ${customerName}\n` +
        `• *Service:* ${quote.packageName}\n` +
        `• *Date:* ${date} (${timeSlot})\n` +
        `• *Address:* ${address}, ${locality}, Jaipur\n` +
        `• *Dietary:* ${foodType} (${selectedCuisines.join(', ')})\n` +
        `• *Estimated Total:* ₹${quote.totalAmount.toLocaleString('en-IN')}\n\n` +
        `Please confirm chef availability. Thank you!`;

      window.open(`https://wa.me/916377100943?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  if (submissionComplete) {
    return (
      <div className="section section-cream" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="card-solid" style={{ padding: '36px 28px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <span className="badge badge-success" style={{ marginBottom: '8px' }}>
              Booking Request Received
            </span>

            <h2 style={{ fontSize: '1.8rem', color: '#171513', marginBottom: '8px' }}>
              Thank You, {submissionComplete.customerName}!
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#77716A', marginBottom: '24px' }}>
              Your booking reference is <strong>{submissionComplete.id}</strong>. Our Jaipur operations team at Mansarovar has received your request and will confirm chef availability shortly.
            </p>

            {/* Summary Details */}
            <div style={{
              backgroundColor: '#FAF4E6',
              borderRadius: '10px',
              padding: '18px',
              textAlign: 'left',
              border: '1px solid #E6E0D6',
              marginBottom: '24px',
              fontSize: '0.88rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><span style={{ color: '#77716A' }}>Service:</span> <strong>{submissionComplete.packageName}</strong></div>
                <div><span style={{ color: '#77716A' }}>Date:</span> <strong>{submissionComplete.date}</strong></div>
                <div><span style={{ color: '#77716A' }}>Locality:</span> <strong>{submissionComplete.locality}, Jaipur</strong></div>
                <div><span style={{ color: '#77716A' }}>Status:</span> <span className="badge badge-warning">{submissionComplete.status}</span></div>
                <div><span style={{ color: '#77716A' }}>Total Quote:</span> <strong>₹{submissionComplete.pricingSnapshot.totalAmount.toLocaleString('en-IN')}</strong></div>
                <div><span style={{ color: '#77716A' }}>Contact:</span> <strong>{submissionComplete.customerPhone}</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`https://wa.me/916377100943?text=${encodeURIComponent(`Namaste Ghar Rasoi, I just submitted booking request ${submissionComplete.id}. Please confirm availability.`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={18} /> Chat with Jaipur Team on WhatsApp
              </a>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => navigate('/account/bookings')}
                  className="btn btn-outline-dark"
                >
                  View in Customer Dashboard
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-secondary"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section section-cream" style={{ minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#FAF4E6',
            border: '1px solid #E6E0D6',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#C94B42',
            marginBottom: '10px'
          }}>
            <UtensilsCrossed size={14} />
            <span>JAIPUR HOME CHEF BOOKING WIZARD</span>
          </div>
          <h1 style={{ fontSize: '2.1rem', color: '#171513', marginBottom: '8px' }}>
            Book Your Chef on Call
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#77716A' }}>
            Transparent pricing • Mansarovar & core Jaipur coverage • Verified culinary chefs
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '16px 20px',
          border: '1px solid #E6E0D6',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflowX: 'auto',
          gap: '8px'
        }}>
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Details' },
            { num: 3, label: 'Address' },
            { num: 4, label: 'Dietary' },
            { num: 5, label: 'Add-ons' },
            { num: 6, label: 'Contact' },
            { num: 7, label: 'Review' }
          ].map((s) => (
            <div
              key={s.num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: currentStep === s.num ? 1 : currentStep > s.num ? 0.8 : 0.45,
                fontWeight: currentStep === s.num ? 700 : 500,
                fontSize: '0.82rem',
                color: currentStep === s.num ? '#C94B42' : '#171513',
                whiteSpace: 'nowrap'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: currentStep === s.num ? '#C94B42' : currentStep > s.num ? '#171513' : '#E6E0D6',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {s.num}
              </div>
              <span className="step-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Main Wizard Card */}
        <div className="card-solid" style={{ padding: '32px 28px' }}>
          {errorMsg && (
            <div style={{
              backgroundColor: '#FDECEA',
              color: '#C94B42',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.88rem',
              fontWeight: 500
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {/* STEP 1: SELECT SERVICE */}
          {currentStep === 1 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#171513' }}>
                Step 1: Select Your Service Package
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '20px' }}>
                All package prices are synchronized with our official Jaipur rate card.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                {[
                  { id: 'daily-cook', title: 'Daily Trial Visit', price: `₹${pricingConfig.dailyTrialSmall.price}`, sub: '2-4 people (2 hrs)' },
                  { id: 'monthly-cook', title: 'Monthly Home Cook', price: `₹${pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')}`, sub: '26 days / month' },
                  { id: 'party-chef', title: 'Party & Event Chef', price: `₹${pricingConfig.partyChefBase.toLocaleString('en-IN')}`, sub: '10–25 guests (5-7 hrs)' },
                  { id: 'custom-cooking', title: 'Custom Cooking', price: 'Quotation', sub: 'Special requirements' }
                ].map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setServiceType(pkg.id as any)}
                    style={{
                      padding: '18px',
                      borderRadius: '10px',
                      border: serviceType === pkg.id ? '2px solid #C94B42' : '1px solid #E6E0D6',
                      backgroundColor: serviceType === pkg.id ? '#FDF8F7' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#171513', marginBottom: '4px' }}>{pkg.title}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#C94B42', marginBottom: '4px' }}>{pkg.price}</div>
                    <div style={{ fontSize: '0.76rem', color: '#77716A' }}>{pkg.sub}</div>
                  </div>
                ))}
              </div>

              {assignedChef && (
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#FAF4E6',
                  borderRadius: '8px',
                  border: '1px solid #E6E0D6',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <img src={assignedChef.avatar} alt={assignedChef.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#171513' }}>Preferred Chef: {assignedChef.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#77716A' }}>We will schedule directly with this chef.</div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleNextStep} className="btn btn-primary">
                  Continue to Requirements <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: REQUIREMENTS */}
          {currentStep === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#171513' }}>
                Step 2: Service Requirements & Schedule
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '20px' }}>
                Help us plan the cooking duration and portion sizes.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">
                    {serviceType === 'party-chef' ? 'Expected Guests:' : 'Family Members (Household):'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="form-control"
                  />
                  <div className="form-hint">
                    {serviceType === 'party-chef' ? 'Standard package is for 10–25 guests' : 'Daily trial: 2–4 people (₹499), 5–8 people (₹599)'}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Service Date / Start Date:</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Time Slot:</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="form-control form-select"
                  >
                    <option value="07:30 AM - 09:30 AM (Breakfast / Early Lunch)">07:30 AM - 09:30 AM (Morning)</option>
                    <option value="11:30 AM - 01:30 PM (Lunch)">11:30 AM - 01:30 PM (Lunch)</option>
                    <option value="04:30 PM - 06:30 PM (Early Dinner)">04:30 PM - 06:30 PM (Early Dinner)</option>
                    <option value="07:00 PM - 09:00 PM (Dinner)">07:00 PM - 09:00 PM (Dinner)</option>
                    <option value="04:00 PM - 10:00 PM (Party Evening)">04:00 PM - 10:00 PM (Party Evening)</option>
                  </select>
                </div>

                {serviceType === 'monthly-cook' && (
                  <div className="form-group">
                    <label className="form-label">Meal Frequency:</label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value as any)}
                      className="form-control form-select"
                    >
                      <option value="1 Meal/Day">1 Meal / Day (Lunch or Dinner)</option>
                      <option value="2 Meals/Day (Lunch+Dinner)">2 Meals / Day (Lunch & Dinner)</option>
                    </select>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={handleNextStep} className="btn btn-primary">
                  Continue to Address <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ADDRESS */}
          {currentStep === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#171513' }}>
                Step 3: Jaipur Kitchen Location & Address
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '20px' }}>
                Our chef will arrive at this home address. Conveyance is <strong>₹0 in Mansarovar</strong>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Jaipur Locality / Colony:*</label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="form-control form-select"
                  >
                    {JAIPUR_LOCALITIES.map((loc) => (
                      <option key={loc.name} value={loc.name}>
                        {loc.name} ({loc.conveyanceFee === 0 ? 'Mansarovar Hub - Free Conveyance' : `+₹${loc.conveyanceFee} conveyance`})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Pincode:</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 302020"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Address / Flat / Plot & Street:*</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Plot 42, Sector 3, Near Galaxy Cinema, Mansarovar"
                  className="form-control"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nearby Landmark (Optional):</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite Community Hall, Amrapali Marg"
                  className="form-control"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setCurrentStep(2)} className="btn btn-outline-dark">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={handleNextStep} className="btn btn-primary">
                  Continue to Food Preferences <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FOOD PREFERENCES */}
          {currentStep === 4 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#171513' }}>
                Step 4: Food & Kitchen Preferences
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '20px' }}>
                Tell our chef about your kitchen rules, spice levels, and dietary traditions.
              </p>

              <div className="form-group">
                <label className="form-label">Dietary Rule:</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {(['Pure Veg', 'Jain (No Onion Garlic)', 'Veg + Egg'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFoodType(type)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: foodType === type ? '2px solid #C94B42' : '1px solid #E6E0D6',
                        backgroundColor: foodType === type ? '#FDF8F7' : '#FFFFFF',
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: '#171513'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Cuisines (Select multiple):</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Rajasthani', 'North Indian', 'Marwari', 'Punjabi', 'South Indian', 'Gujarati'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleCuisine(c)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: selectedCuisines.includes(c) ? '2px solid #171513' : '1px solid #E6E0D6',
                        backgroundColor: selectedCuisines.includes(c) ? '#171513' : '#FFFFFF',
                        color: selectedCuisines.includes(c) ? '#FFF8E9' : '#171513',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Spice Level:</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {(['Mild', 'Medium', 'Spicy'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpiceLevel(lvl)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        border: spiceLevel === lvl ? '2px solid #C94B42' : '1px solid #E6E0D6',
                        backgroundColor: spiceLevel === lvl ? '#FDF8F7' : '#FFFFFF',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Cooking Instructions / Allergies (Optional):</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Less oil, soft tawa phulkas, no peanuts, diabetic-friendly dishes..."
                  className="form-control"
                  rows={2}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setCurrentStep(3)} className="btn btn-outline-dark">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={handleNextStep} className="btn btn-primary">
                  Continue to Add-ons <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: ADDITIONAL SERVICES & HELPERS */}
          {currentStep === 5 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#171513' }}>
                Step 5: Additional Helpers & Event Details
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '20px' }}>
                Add kitchen helpers or customize event staff according to configured rates.
              </p>

              {serviceType === 'party-chef' && (
                <div className="form-group">
                  <label className="form-label">Occasion / Event Name:</label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="e.g. 50th Anniversary, Birthday Party, Housewarming"
                    className="form-control"
                  />
                </div>
              )}

              <div style={{
                backgroundColor: '#FAF4E6',
                border: '1px solid #E6E0D6',
                borderRadius: '10px',
                padding: '18px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#171513' }}>
                      Optional Kitchen Helper ({`₹${pricingConfig.partyHelperFee.toLocaleString('en-IN')}`} / helper)
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#77716A' }}>
                      Assists with vegetable chopping, dough preparation, kitchen cleanup, and serving platters.
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setHelperCount(Math.max(0, helperCount - 1))}
                      className="btn btn-sm btn-outline-dark"
                      style={{ padding: '4px 10px' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', minWidth: '24px', textAlign: 'center' }}>
                      {helperCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setHelperCount(helperCount + 1)}
                      className="btn btn-sm btn-outline-dark"
                      style={{ padding: '4px 10px' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setCurrentStep(4)} className="btn btn-outline-dark">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={handleNextStep} className="btn btn-primary">
                  Continue to Contact Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: CONTACT DETAILS */}
          {currentStep === 6 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#171513' }}>
                Step 6: Customer Contact & Verification
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '20px' }}>
                We will send booking status updates and chef arrival details to this phone number.
              </p>

              <div className="form-group">
                <label className="form-label">Full Name:*</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Gaurav Sharma"
                  className="form-control"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Indian Mobile Number (WhatsApp Active):*</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 6377100943"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (Optional):</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. gaurav@example.com"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Communication Method:</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {(['WhatsApp', 'Phone Call'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPreferredContact(method)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '6px',
                        border: preferredContact === method ? '2px solid #C94B42' : '1px solid #E6E0D6',
                        backgroundColor: preferredContact === method ? '#FDF8F7' : '#FFFFFF',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setCurrentStep(5)} className="btn btn-outline-dark">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={handleNextStep} className="btn btn-primary">
                  Review & Price Breakdown <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: REVIEW & PRICING BREAKDOWN */}
          {currentStep === 7 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#171513' }}>
                Step 7: Review & Price Breakdown
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '20px' }}>
                Review all booking specifications before requesting your home chef.
              </p>

              {/* Review Card */}
              <div style={{
                backgroundColor: '#FAF6EE',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #E6E0D6',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', color: '#171513', marginBottom: '4px' }}>
                      {quote.packageName}
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: '#77716A' }}>
                      📅 {date} • {timeSlot}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#77716A', textTransform: 'uppercase' }}>Estimated Total</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#C94B42' }}>
                      {quote.isCustomQuote ? 'Quotation Pending' : `₹${quote.totalAmount.toLocaleString('en-IN')}`}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '0.86rem', borderTop: '1px solid #E6E0D6', paddingTop: '14px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ color: '#77716A' }}>Location:</span><br />
                    <strong>{address}, {locality}, Jaipur ({pincode})</strong>
                  </div>
                  <div>
                    <span style={{ color: '#77716A' }}>Dietary & Cuisines:</span><br />
                    <strong>{foodType} ({selectedCuisines.join(', ')})</strong>
                  </div>
                  <div>
                    <span style={{ color: '#77716A' }}>Spice & Instructions:</span><br />
                    <strong>{spiceLevel} Spice {specialInstructions ? `• "${specialInstructions}"` : ''}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#77716A' }}>Contact Person:</span><br />
                    <strong>{customerName} ({customerPhone})</strong>
                  </div>
                </div>

                {/* Pricing Inclusions Breakdown */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '14px',
                  border: '1px solid #E6E0D6',
                  fontSize: '0.84rem'
                }}>
                  <div style={{ fontWeight: 700, color: '#171513', marginBottom: '6px' }}>
                    Transparent Cost Breakdown:
                  </div>
                  <ul style={{ paddingLeft: '18px', color: '#4A4641', margin: 0, lineHeight: 1.6 }}>
                    {quote.breakdown.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Submission Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <button onClick={() => setCurrentStep(6)} className="btn btn-outline-dark">
                  <ArrowLeft size={16} /> Back
                </button>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleSubmitBooking(true)}
                    className="btn btn-whatsapp btn-lg"
                  >
                    <MessageCircle size={18} /> Continue on WhatsApp
                  </button>

                  <button
                    onClick={() => handleSubmitBooking(false)}
                    className="btn btn-primary btn-lg"
                  >
                    Submit Booking Request <CheckCircle2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
