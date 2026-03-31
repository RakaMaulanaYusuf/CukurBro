import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconCheck, IconChevronRight, IconScissors, IconUser, IconCalendarEvent, IconClock } from '@tabler/icons-react';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function BookingForm({ services, barbers }) {
    const { auth } = usePage().props;
    const [step, setStep] = useState(1);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        service_ids: [],
        barber_id: '',
        date: '',
        time: '',
    });

    // Fetch available slots when barber or date or services change
    useEffect(() => {
        if (data.barber_id && data.date && data.service_ids.length > 0) {
            const fetchSlots = async () => {
                setLoadingSlots(true);
                // Calculate total duration needed
                const selectedServices = services.filter(s => data.service_ids.includes(s.id));
                const totalDuration = selectedServices.reduce((acc, s) => acc + s.duration, 0);

                try {
                    const response = await axios.get('/api/available-slots', {
                        params: {
                            barber_id: data.barber_id,
                            date: data.date,
                            duration: totalDuration,
                        }
                    });
                    setAvailableSlots(response.data);
                    // Reset selected time if it's no longer available
                    if (data.time && !response.data.includes(data.time)) {
                        setData('time', '');
                    }
                } catch (error) {
                    console.error('Failed to fetch slots:', error);
                    toast.error('Failed to load available times. Please try again.');
                } finally {
                    setLoadingSlots(false);
                }
            };
            fetchSlots();
        } else {
            setAvailableSlots([]);
        }
    }, [data.barber_id, data.date, data.service_ids]);

    const toggleService = (id) => {
        const selected = data.service_ids.includes(id) 
            ? data.service_ids.filter(sId => sId !== id)
            : [...data.service_ids, id];
        setData('service_ids', selected);
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const submit = (e) => {
        e.preventDefault();
        
        if (!auth.user) {
            toast.error('Please log in or register to complete your booking.');
            window.location.href = route('login');
            return;
        }

        post(route('book'), {
            onSuccess: () => {
                toast.success('Your booking request has been submitted successfully!', {
                    duration: 5000,
                    icon: '🚀'
                });
                reset();
                setStep(1);
            },
        });
    };

    const selectedServices = services.filter(s => data.service_ids.includes(s.id));
    const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0);
    const totalDuration = selectedServices.reduce((acc, s) => acc + s.duration, 0);

    const selectedBarber = barbers.find(b => b.id === parseInt(data.barber_id));

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-800">
            {/* Progress Header */}
            <div className="bg-zinc-950 p-6 sm:px-10 text-white flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                    <motion.div 
                        className="h-full bg-amber-500"
                        initial={{ width: '25%' }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                
                <div className="relative z-10 w-full flex justify-between">
                    {[
                        { num: 1, label: 'Service', icon: IconScissors },
                        { num: 2, label: 'Barber', icon: IconUser },
                        { num: 3, label: 'Time', icon: IconCalendarEvent },
                        { num: 4, label: 'Confirm', icon: IconCheck }
                    ].map((s) => (
                        <div key={s.num} className={`flex flex-col items-center gap-2 ${step >= s.num ? 'text-amber-500' : 'text-gray-600'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step === s.num ? 'bg-amber-500 text-black border-4 border-amber-900/50' : step > s.num ? 'bg-amber-500 text-black' : 'bg-zinc-800'}`}>
                                <s.icon size={18} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-10">
                <AnimatePresence mode="wait">
                    {/* STEP 1: SERVICES */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h3 className="text-2xl font-black uppercase mb-6 dark:text-white">Select Services</h3>
                            <div className="space-y-4">
                                {services.map(service => (
                                    <label key={service.id} className={`flex items-start p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.service_ids.includes(service.id) ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/10 shadow-lg shadow-amber-500/10' : 'border-gray-200 dark:border-zinc-800 hover:border-amber-300 dark:hover:border-zinc-700'}`}>
                                        <input type="checkbox" className="hidden" checked={data.service_ids.includes(service.id)} onChange={() => toggleService(service.id)} />
                                        <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 mr-4 transition-colors ${data.service_ids.includes(service.id) ? 'bg-amber-500 text-black' : 'bg-gray-200 dark:bg-zinc-800'}`}>
                                            {data.service_ids.includes(service.id) && <IconCheck size={16} stroke={3} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-lg dark:text-white">{service.name}</h4>
                                                <span className="font-black text-amber-600 dark:text-amber-500">Rp {service.price.toLocaleString('id-ID')}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{service.description}</p>
                                            <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-100 dark:bg-zinc-800 dark:text-gray-300 w-max px-2 py-1 rounded">
                                                <IconClock size={12} className="mr-1" /> {service.duration} mins
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.service_ids && <p className="text-red-500 text-sm mt-3">{errors.service_ids}</p>}
                            <div className="mt-8 flex justify-end">
                                <button onClick={nextStep} disabled={data.service_ids.length === 0} className="bg-black dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black text-white px-8 py-3 rounded-xl font-bold flex items-center disabled:opacity-50 transition-colors uppercase tracking-wider">
                                    Next Step <IconChevronRight size={20} className="ml-2" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: BARBER */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h3 className="text-2xl font-black uppercase mb-6 dark:text-white">Choose Barber</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {barbers.map(barber => (
                                    <label key={barber.id} className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer text-center transition-all ${data.barber_id == barber.id ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/10' : 'border-gray-200 dark:border-zinc-800 hover:border-amber-300 dark:hover:border-zinc-700'}`}>
                                        <input type="radio" className="hidden" name="barber_id" value={barber.id} onChange={(e) => setData('barber_id', e.target.value)} checked={data.barber_id == barber.id} />
                                        <img src={barber.photo_url || '/placeholder.jpg'} alt={barber.name} className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white dark:border-zinc-800 shadow-sm" />
                                        <h4 className="font-bold text-gray-900 dark:text-white leading-tight">{barber.name}</h4>
                                        <p className="text-xs text-amber-600 dark:text-amber-500 mt-1 uppercase font-bold tracking-wider">{barber.specialization}</p>
                                    </label>
                                ))}
                            </div>
                            {errors.barber_id && <p className="text-red-500 text-sm mt-3">{errors.barber_id}</p>}
                            <div className="mt-8 flex justify-between">
                                <button onClick={prevStep} className="text-gray-500 font-bold px-4 py-3 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-wider">Back</button>
                                <button onClick={nextStep} disabled={!data.barber_id} className="bg-black dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black text-white px-8 py-3 rounded-xl font-bold flex items-center disabled:opacity-50 transition-colors uppercase tracking-wider">
                                    Next Step <IconChevronRight size={20} className="ml-2" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: DATE & TIME */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h3 className="text-2xl font-black uppercase mb-6 dark:text-white">Date & Time</h3>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Select Date</label>
                                <input 
                                    type="date" 
                                    min={new Date().toISOString().split('T')[0]}
                                    value={data.date} 
                                    onChange={(e) => setData('date', e.target.value)}
                                    className="w-full text-lg p-4 rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 dark:text-white focus:ring-amber-500 focus:border-amber-500"
                                />
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Available Slots</label>
                                <div className="bg-gray-50 dark:bg-zinc-950 rounded-xl p-4 border border-gray-100 dark:border-zinc-800 min-h-[120px]">
                                    {!data.date ? (
                                        <div className="text-center text-gray-400 py-6">Please select a date first.</div>
                                    ) : loadingSlots ? (
                                        <div className="text-center text-amber-500 py-6 font-bold animate-pulse">Checking availability...</div>
                                    ) : availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                            {availableSlots.map(time => (
                                                <label key={time} className={`text-center py-2.5 rounded-lg border-2 cursor-pointer transition-colors font-bold ${data.time === time ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 hover:border-amber-300 dark:hover:border-zinc-700'}`}>
                                                    <input type="radio" className="hidden" name="time" value={time} onChange={(e) => setData('time', e.target.value)} checked={data.time === time} />
                                                    {time}
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center text-red-500 py-6 font-bold">No available slots for {totalDuration} mins duration on this day.</div>
                                    )}
                                </div>
                                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button onClick={prevStep} className="text-gray-500 font-bold px-4 py-3 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-wider">Back</button>
                                <button onClick={nextStep} disabled={!data.date || !data.time} className="bg-black dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black text-white px-8 py-3 rounded-xl font-bold flex items-center disabled:opacity-50 transition-colors uppercase tracking-wider">
                                    Next Step <IconChevronRight size={20} className="ml-2" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: CONFIRMATION */}
                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h3 className="text-2xl font-black uppercase mb-6 dark:text-white text-center">Confirm Booking</h3>
                            
                            <div className="bg-gray-50 dark:bg-zinc-950 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 mb-8">
                                <div className="flex items-center gap-4 border-b border-gray-200 dark:border-zinc-800 pb-4 mb-4">
                                    <div className="bg-amber-100 text-amber-600 p-3 rounded-xl shrink-0"><IconCalendarEvent size={24}/></div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Appointment</p>
                                        <p className="font-bold text-lg dark:text-white">{data.date} at {data.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 border-b border-gray-200 dark:border-zinc-800 pb-4 mb-4">
                                    <img src={selectedBarber?.photo_url || '/placeholder.jpg'} className="w-12 h-12 rounded-full object-cover shrink-0" alt="Barber" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Barber</p>
                                        <p className="font-bold dark:text-white">{selectedBarber?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-gray-200 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 p-3 rounded-xl shrink-0"><IconScissors size={24}/></div>
                                    <div className="w-full">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-2">Services</p>
                                        <ul className="space-y-1 mb-3">
                                            {selectedServices.map(s => (
                                                <li key={s.id} className="flex justify-between text-sm font-medium dark:text-gray-300">
                                                    <span>{s.name}</span>
                                                    <span>Rp {s.price.toLocaleString('id-ID')}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-zinc-800">
                                            <span className="font-bold uppercase tracking-wider dark:text-gray-200">Total</span>
                                            <span className="text-xl font-black text-amber-500">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={submit}>
                                {!auth.user && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 font-bold text-sm flex gap-3">
                                        <span className="text-xl">⚠️</span> You must be logged in to confirm your booking. You will be redirected to the login page.
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <button type="button" onClick={prevStep} className="text-gray-500 font-bold px-4 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-wider">Back</button>
                                    <button type="submit" disabled={processing} className="bg-amber-500 hover:bg-amber-600 text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest disabled:opacity-50 transition-transform hover:scale-105 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2">
                                        {processing ? 'Processing...' : 'Confirm Book'} <IconCheck size={20} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
