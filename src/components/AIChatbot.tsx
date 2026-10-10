import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle, 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { checkJaipurServiceArea } from '../data/pricing';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    type: 'book' | 'whatsapp';
    label: string;
    payload?: any;
  };
  details?: {
    packageName?: string;
    price?: number;
    locality?: string;
    household?: number;
  };
  time: string;
}

export const AIChatbot: React.FC = () => {
  const { 
    isChatbotOpen, 
    setIsChatbotOpen, 
    chatbotInitialPrompt, 
    pricingConfig, 
    navigate, 
    setBookingPrefill 
  } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! 🙏 I am your Ghar Rasoi booking assistant. Tell me what kind of cooking help you need in Jaipur, and I will calculate the exact transparent package for you.\n\n(You can ask in English, Hindi, or Hinglish!)',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle trigger with initial prompt from external buttons
  useEffect(() => {
    if (chatbotInitialPrompt && isChatbotOpen) {
      handleUserSubmit(chatbotInitialPrompt);
    }
  }, [chatbotInitialPrompt, isChatbotOpen]);

  const generateBotReply = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Service Area Check (Mansarovar, Vaishali Nagar, etc.)
    if (q.includes('mansarovar') || q.includes('vaishali') || q.includes('malviya') || q.includes('serve') || q.includes('area') || q.includes('location') || q.includes('jaipur')) {
      const areaCheck = checkJaipurServiceArea(q.includes('mansarovar') ? 'Mansarovar' : q.includes('vaishali') ? 'Vaishali Nagar' : q.includes('malviya') ? 'Malviya Nagar' : 'Mansarovar');
      return {
        id: Math.random().toString(),
        sender: 'bot',
        text: `📍 ${areaCheck.note}\n\nOur central hub is located in Mansarovar, Jaipur. For locations outside Mansarovar, a nominal ₹${pricingConfig.outsideMansarovarConveyance} conveyance charge applies. Would you like a Daily Cook trial or a Monthly Cook?`,
        time
      };
    }

    // 2. Jain / Dietary questions
    if (q.includes('jain') || q.includes('veg') || q.includes('onion') || q.includes('garlic') || q.includes('pure veg')) {
      return {
        id: Math.random().toString(),
        sender: 'bot',
        text: '🥗 Absolutely! All our chefs strictly adhere to pure vegetarian kitchen guidelines. We have dedicated cooks specialized in authentic Jain food (No Onion, No Garlic, No Root vegetables) as well as Satvik and Falahari cooking.',
        action: {
          type: 'book',
          label: 'Book Jain-Special Cook',
          payload: { foodType: 'Jain (No Onion Garlic)', serviceType: 'daily-cook' }
        },
        time
      };
    }

    // 3. Birthday / Party Chef inquiry (e.g. 20 people party)
    if (q.includes('party') || q.includes('birthday') || q.includes('celebration') || q.includes('event') || q.includes('gathering') || q.includes('guests')) {
      return {
        id: Math.random().toString(),
        sender: 'bot',
        text: `🎉 For parties & events, our One-Day Party Chef package is ₹${pricingConfig.partyChefBase.toLocaleString('en-IN')} for 10–25 guests (5 to 7 hours of live kitchen cooking).\n\n• Optional kitchen helpers: ₹${pricingConfig.partyHelperFee.toLocaleString('en-IN')} per helper.\n• Note: Groceries, spices, and gas are provided by the host.`,
        action: {
          type: 'book',
          label: `Book Party Chef (₹${pricingConfig.partyChefBase})`,
          payload: { serviceType: 'party-chef', peopleCount: 20 }
        },
        time
      };
    }

    // 4. Monthly 2-time cooking (Lunch + Dinner)
    if ((q.includes('lunch') && q.includes('dinner')) || q.includes('twice') || q.includes('2 time') || q.includes('two time') || q.includes('dono time')) {
      return {
        id: Math.random().toString(),
        sender: 'bot',
        text: `🍛 For twice-daily cooking (both Lunch and Dinner, 26 days a month):\n\n• Rate: ₹${pricingConfig.monthlyDoublePerPerson.toLocaleString('en-IN')} per person per month.\n• E.g. For 2 people: ₹${(pricingConfig.monthlyDoublePerPerson * 2).toLocaleString('en-IN')}/month.\n• E.g. For 4 people: ₹${(pricingConfig.monthlyDoublePerPerson * 4).toLocaleString('en-IN')}/month.\n(Note: Exact household tier is confirmed upon review).`,
        action: {
          type: 'book',
          label: 'Book Monthly 2-Time Cook',
          payload: { serviceType: 'monthly-cook', frequency: '2 Meals/Day (Lunch+Dinner)' }
        },
        time
      };
    }

    // 5. Monthly 1-time cooking or General monthly cost
    if (q.includes('monthly') || q.includes('mahine') || q.includes('month') || q.includes('26 days')) {
      return {
        id: Math.random().toString(),
        sender: 'bot',
        text: `📅 Our Monthly 1-Time Cook package (26 days / 1 visit daily):\n\n• 2 to 4 people: ₹${pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')} / month\n• 6+2 Vyakti: ₹${pricingConfig.monthlySingleLarge.price.toLocaleString('en-IN')} / month\n\nIncludes healthy home cooking, backup chef guarantee, and hygiene maintenance. Groceries & gas are by customer.`,
        action: {
          type: 'book',
          label: `Book Monthly Plan (₹${pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')})`,
          payload: { serviceType: 'monthly-cook', peopleCount: 4 }
        },
        time
      };
    }

    // 6. Trial visit or 4 people inquiry
    if (q.includes('trial') || q.includes('trial visit') || q.includes('ek din') || q.includes('4') || q.includes('four') || q.includes('daily')) {
      return {
        id: Math.random().toString(),
        sender: 'bot',
        text: `✨ For 2–4 people, you can book a Daily Trial Visit for just ₹${pricingConfig.dailyTrialSmall.price}!\n\n• 2 hours live cooking in your kitchen.\n• Enjoy fresh hot rotis, dal, sabzi & rice cooked to your exact taste.\n• Zero conveyance in Mansarovar.`,
        action: {
          type: 'book',
          label: `Book Daily Trial (₹${pricingConfig.dailyTrialSmall.price})`,
          payload: { serviceType: 'daily-cook', peopleCount: 4 }
        },
        time
      };
    }

    // Default intelligent guidance
    return {
      id: Math.random().toString(),
      sender: 'bot',
      text: `I'd love to assist you! Ghar Rasoi offers:\n\n1. **Daily Trial Visit** (2–4 people @ ₹${pricingConfig.dailyTrialSmall.price})\n2. **Monthly Cook** (26 days @ ₹${pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')})\n3. **Twice Daily Cook** (Lunch + Dinner @ ₹${pricingConfig.monthlyDoublePerPerson.toLocaleString('en-IN')}/person)\n4. **Party Chef** (10–25 guests @ ₹${pricingConfig.partyChefBase.toLocaleString('en-IN')})\n\nWhich service or date would you prefer?`,
      action: {
        type: 'whatsapp',
        label: 'Chat Directly on WhatsApp'
      },
      time
    };
  };

  const handleUserSubmit = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotReply(queryText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (!action) return;
    if (action.type === 'book') {
      if (action.payload) {
        setBookingPrefill(action.payload);
      }
      setIsChatbotOpen(false);
      navigate('/book');
    } else if (action.type === 'whatsapp') {
      window.open('https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20would%20like%20to%20discuss%20a%20home%20cook%20service.', '_blank');
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isChatbotOpen && (
        <button
          onClick={() => setIsChatbotOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 990,
            backgroundColor: '#171513',
            color: '#E9C66D',
            border: '2px solid #E9C66D',
            borderRadius: '9999px',
            boxShadow: '0 8px 24px rgba(13, 12, 10, 0.25)',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease'
          }}
          className="chatbot-fab"
          id="rasoi-assistant-trigger"
          aria-label="Open Rasoi AI Booking Assistant"
        >
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#C94B42',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0
          }}>
            <Bot size={18} />
          </div>
          <div className="chatbot-fab-text" style={{ textAlign: 'left', marginLeft: '8px' }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFF8E9', lineHeight: 1.1 }}>
              Rasoi Assistant
            </div>
            <div style={{ fontSize: '0.68rem', color: '#E9C66D' }}>
              Ask & Instant Quote
            </div>
          </div>
        </button>
      )}

      {/* Floating Chat Window */}
      {isChatbotOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: 'min(420px, calc(100vw - 32px))',
          height: 'min(580px, calc(100vh - 48px))',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E6E0D6',
          boxShadow: '0 16px 40px rgba(13, 12, 10, 0.18)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#171513',
            color: '#FFFFFF',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #E9C66D'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#C94B42',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#FFF8E9' }}>
                  Rasoi Booking Assistant
                </div>
                <div style={{ fontSize: '0.72rem', color: '#E9C66D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block' }} />
                  Live Pricing Engine (Jaipur)
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsChatbotOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#A39B92',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick suggestions pills */}
          <div style={{
            padding: '8px 12px',
            backgroundColor: '#FAF4E6',
            borderBottom: '1px solid #E6E0D6',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            <button
              onClick={() => handleUserSubmit('What does a monthly cook cost?')}
              style={{
                fontSize: '0.74rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E0D6',
                borderRadius: '12px',
                padding: '4px 10px',
                cursor: 'pointer',
                color: '#171513'
              }}
            >
              💰 Monthly Cost?
            </button>
            <button
              onClick={() => handleUserSubmit('Mujhe 4 logon ke liye daily trial chahiye')}
              style={{
                fontSize: '0.74rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E0D6',
                borderRadius: '12px',
                padding: '4px 10px',
                cursor: 'pointer',
                color: '#171513'
              }}
            >
              🍲 Trial Visit ₹499
            </button>
            <button
              onClick={() => handleUserSubmit('Do you serve Mansarovar?')}
              style={{
                fontSize: '0.74rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E0D6',
                borderRadius: '12px',
                padding: '4px 10px',
                cursor: 'pointer',
                color: '#171513'
              }}
            >
              📍 Jaipur Areas?
            </button>
            <button
              onClick={() => handleUserSubmit('I need a party chef for 20 guests')}
              style={{
                fontSize: '0.74rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E0D6',
                borderRadius: '12px',
                padding: '4px 10px',
                cursor: 'pointer',
                color: '#171513'
              }}
            >
              🎉 Party Chef
            </button>
          </div>

          {/* Messages list */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#FAF6EE'
          }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '86%'
                }}
              >
                <div style={{
                  backgroundColor: m.sender === 'user' ? '#171513' : '#FFFFFF',
                  color: m.sender === 'user' ? '#FFF8E9' : '#171513',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '0.88rem',
                  lineHeight: 1.45,
                  border: m.sender === 'user' ? 'none' : '1px solid #E6E0D6',
                  boxShadow: '0 1px 3px rgba(13, 12, 10, 0.05)',
                  whiteSpace: 'pre-line'
                }}>
                  {m.text}

                  {m.action && (
                    <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F0ECE4' }}>
                      {m.action.type === 'book' ? (
                        <button
                          onClick={() => handleActionClick(m.action)}
                          className="btn btn-sm btn-primary"
                          style={{ width: '100%', fontSize: '0.82rem', padding: '6px 12px' }}
                        >
                          {m.action.label} <ArrowRight size={14} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActionClick(m.action)}
                          className="btn btn-sm btn-whatsapp"
                          style={{ width: '100%', fontSize: '0.82rem', padding: '6px 12px' }}
                        >
                          <MessageCircle size={14} /> {m.action.label}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  color: '#77716A',
                  marginTop: '3px',
                  textAlign: m.sender === 'user' ? 'right' : 'left',
                  paddingLeft: '4px',
                  paddingRight: '4px'
                }}>
                  {m.time}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                backgroundColor: '#FFFFFF',
                padding: '8px 14px',
                borderRadius: '14px',
                fontSize: '0.82rem',
                color: '#77716A',
                border: '1px solid #E6E0D6',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={14} color="#C94B42" />
                <span>Checking pricing & availability...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSubmit(input);
            }}
            style={{
              padding: '12px 14px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #E6E0D6',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cooks, prices, Jain food..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #E6E0D6',
                fontSize: '0.9rem',
                outline: 'none',
                backgroundColor: '#FAF6EE'
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: input.trim() ? '#C94B42' : '#E6E0D6',
                color: '#FFFFFF',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
