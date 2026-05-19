import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MessageCircle, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to:${personalInfo.email}`,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: `+${personalInfo.whatsapp}`,
    href: `https://wa.me/${personalInfo.whatsapp}`,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Restu Hendra Pramono',
    href: personalInfo.linkedin,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Restuhend-pramono',
    href: personalInfo.github,
    color: 'text-slate-300',
    bg: 'bg-slate-700/30',
    border: 'border-slate-600/30',
  },
]

const Contact = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Nama wajib diisi'
    if (!form.email.trim()) errs.email = 'Email wajib diisi'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Format email tidak valid'
    if (!form.subject.trim()) errs.subject = 'Subject wajib diisi'
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Pesan minimal 10 karakter'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus(null), 4000)
  }

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl bg-slate-900 border text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 transition-all duration-200 font-body ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
        : 'border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'
    }`

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-tag mb-3">// 05 — Contact</p>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6" />
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Tertarik berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi saya melalui form atau media sosial di bawah.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-6 neon-border mb-4">
              <h3 className="font-display text-sm font-bold text-white mb-2">Get In Touch</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Saya selalu terbuka untuk diskusi mengenai proyek baru, peluang kolaborasi, atau
                sekadar bertukar ide tentang teknologi industri.
              </p>
            </div>

            {contactLinks.map(({ icon: Icon, label, value, href, color, bg, border }, i) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 glass rounded-xl border ${border} hover:border-opacity-60 transition-all group hover-card`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-mono">{label}</div>
                  <div className={`text-sm font-medium group-hover:${color} transition-colors text-white`}>
                    {value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 neon-border space-y-4" noValidate>
              <h3 className="font-display text-sm font-bold text-white mb-2">Send a Message</h3>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 font-mono mb-1.5">Nama Lengkap *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputCls('name')}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-mono mb-1.5">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputCls('email')}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-slate-400 font-mono mb-1.5">Subject *</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Inquiry"
                  className={inputCls('subject')}
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-slate-400 font-mono mb-1.5">Pesan *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Ceritakan tentang proyek atau pertanyaan Anda..."
                  className={`${inputCls('message')} resize-none`}
                />
                <div className="flex items-center justify-between mt-1">
                  {errors.message
                    ? <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={10} />{errors.message}</p>
                    : <span />
                  }
                  <span className="text-slate-600 text-xs font-mono">{form.message.length}/500</span>
                </div>
              </div>

              {/* Success message */}
              {status === 'success' && (
                <motion.div
                  className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={16} />
                  Pesan berhasil dikirim! Saya akan merespons dalam 24 jam.
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold text-sm disabled:opacity-60 hover:opacity-90 transition-all glow-cyan-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Kirim Pesan
                  </>
                )}
              </button>

              <p className="text-slate-600 text-xs text-center font-mono">
                * Form ini bersifat demonstrasi. Gunakan link kontak di samping untuk komunikasi langsung.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
