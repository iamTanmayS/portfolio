import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui';
import { useToast } from '../../context/AppContext';
import { springs } from '../../animations';

export function ContactForm() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);
    showToast('Message sent successfully!', 'success');
    
    // Reset form after delay
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const inputStyles = (field: string) => ({
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid',
    borderColor: focusedField === field ? 'rgba(167, 139, 250, 0.5)' : 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    color: '#fff',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focusedField === field ? '0 0 20px rgba(167, 139, 250, 0.15)' : 'none',
  });

  const labelStyles = (field: string, value: string) => ({
    position: 'absolute' as const,
    left: 20,
    top: focusedField === field || value ? 0 : 16,
    transform: focusedField === field || value ? 'translateY(-50%) scale(0.85)' : 'none',
    transformOrigin: 'left center',
    background: '#0a0a0f',
    padding: '0 8px',
    color: focusedField === field ? '#a78bfa' : '#a1a1aa',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none' as const,
    fontSize: 15,
  });

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={springs.snappy}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        width: '100%',
      }}
    >
      {/* Name Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          style={inputStyles('name')}
        />
        <label htmlFor="name" style={labelStyles('name', formData.name)}>
          Your Name
        </label>
      </div>

      {/* Email Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
          style={inputStyles('email')}
        />
        <label htmlFor="email" style={labelStyles('email', formData.email)}>
          Email Address
        </label>
      </div>

      {/* Message Input */}
      <div style={{ position: 'relative' }}>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={() => handleFocus('message')}
          onBlur={handleBlur}
          style={{ ...inputStyles('message'), resize: 'none' }}
        />
        <label htmlFor="message" style={labelStyles('message', formData.message)}>
          Tell me about your project
        </label>
      </div>

      {/* Submit Button */}
      <Button
        variant={isSuccess ? 'secondary' : 'primary'}
        size="lg"
        type="submit"
        disabled={isLoading || isSuccess}
        className="w-full justify-center"
        onClick={() => {}} // Handled by onSubmit
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Loader2 className="animate-spin" size={18} />
              Sending...
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#34d399' }}
            >
              <CheckCircle size={18} />
              Message Sent
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Send size={18} />
              Send Message
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.form>
  );
}
