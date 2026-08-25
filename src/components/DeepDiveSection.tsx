import React from 'react';
import { motion } from 'motion/react';
import { CodePanel } from './CodePanel';

export const DeepDiveSection: React.FC = () => {
  const rows = [
    {
      id: 'auth',
      title: 'Put the gate on the route.',
      description:
        "Auth isn't middleware you assemble from multiple disparate packages. Declaring the 'auth' alias on a route gates it cleanly and resolves through the session subsystem with zero state leakage.",
      code: `Route::get(['invoices.show', '/invoices/{id}'])
    ->middleware(['auth'])
    ->controller('invoice_controller');`,
      filename: 'app/Modules/Billing/module.php',
      reversed: false,
    },
    {
      id: 'queues',
      title: 'Move slow work out of the request.',
      description:
        "Persistent workers make slow requests expensive. Anything that doesn't need to block the response gets dispatched to a database-backed queue in one clean line.",
      code: `$queueManager->dispatch(new SendInvoiceEmailJob($invoiceId));`,
      filename: 'app/Modules/Billing/Application/SendInvoice.php',
      reversed: true,
    },
    {
      id: 'scheduler',
      title: 'Register recurring work with the app.',
      description:
        'Configure cron schedules in schedule.php using a fluent API. One OS crontab entry runs `spinx schedule:run`, and Spinx figures out what tasks are due.',
      code: `$scheduler->call(function () use ($container) {
    $container->get(ReconcileService::class)->reconcile();
}, 'daily reconciliation')->daily('02:00');`,
      filename: 'schedule.php',
      reversed: false,
    },
    {
      id: 'islands',
      title: 'Dynamic Vue and React client islands.',
      description:
        'Ultra-fast server-rendered HTML with selective client-side hydration islands (@island) — powered by Vite for instant HMR in Vue 3 or React 19.',
      code: `<div class="invoice-container">
    <h1>Invoice #{{ $invoice->id }}</h1>
    
    <!-- Client reactive island (Vue/React) -->
    @island('InvoiceViewer', ['invoice' => $invoice])
</div>`,
      filename: 'Infrastructure/Http/Views/show.spinx.html',
      reversed: true,
    },
  ];

  return (
    <section className="py-24 md:py-32 space-y-20 md:space-y-32 bg-[#0A0A0B]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {rows.map((row, idx) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24 last:mb-0"
          >
            {/* Text Column */}
            <div className={`space-y-4 ${row.reversed ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[#E11D63] font-semibold uppercase tracking-widest bg-[#E11D63]/10 px-3 py-1 rounded-full border border-[#E11D63]/20">
                <span>Feature 0{idx + 1}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {row.title}
              </h3>
              <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed">
                {row.description}
              </p>
            </div>

            {/* Code Column */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`${row.reversed ? 'lg:order-1' : 'lg:order-2'}`}
            >
              <CodePanel
                title={row.filename}
                code={row.code}
                language="php"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
