import React from 'react';
import { motion } from 'motion/react';
import { CodePanel } from './CodePanel';

export const DeepDiveSection: React.FC = () => {
  const rows = [
    {
      id: 'auth',
      title: 'Put the gate on the route.',
      description:
        "Auth isn't middleware you assemble from three packages. Declaring auth on a route gates it and documents it in the same place — no separate guard config to keep in sync with what the route actually enforces.",
      code: `Route::get('/invoices/{invoiceId}', [InvoiceController::class, 'show'])
    ->middleware('auth:session');`,
      filename: 'routes/web.php',
      reversed: false,
    },
    {
      id: 'queues',
      title: 'Move slow work out of the request.',
      description:
        "Persistent workers make slow requests expensive in a way PHP-FPM never punished. Anything that doesn't need to block the response goes on a queue, off the worker, in one line.",
      code: `$app->queue()->push(new SendInvoiceEmail($invoiceId));`,
      filename: 'app/Modules/Billing/Events.php',
      reversed: true,
    },
    {
      id: 'scheduler',
      title: 'Register recurring work with the app.',
      description:
        'Setup a scheduler once, register recurring jobs against the app, and the scheduler manager runs it — no separate cron entry, no drift between what the code says and what the box actually runs.',
      code: `$app->scheduler()
    ->job(ReconcileInvoices::class)
    ->daily();`,
      filename: 'bootstrap/scheduler.php',
      reversed: false,
    },
    {
      id: 'inertia',
      title: 'Render Vue and React pages from Spinx routes.',
      description:
        'Shared props, Vite-powered assets, and server-driven page rendering through Inertia — no separate API layer to keep in sync with the frontend it feeds. Vue ships by default; React is available at `spinx new --frontend=react` behind the same contract.',
      code: `public function show(Request $request, string $invoiceId): Response
{
    return Inertia::render('Invoices/Show', [
        'invoice' => $this->invoices->find($invoiceId),
    ]);
}`,
      filename: 'InvoiceController.php',
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
