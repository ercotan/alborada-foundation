import React from "react";
import { donationTiers } from "../../data/homepage";
import { useDonationForm } from "../../hooks/useDonationForm";

const CARD_CLASS =
  "bg-black/40 border border-white/5 hover:border-gold-500/25 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group transition-all duration-300";

export const DonationSection: React.FC = () => {
  const { amounts, updateAmount, activeConfirmation, submitDonation } =
    useDonationForm();

  return (
    <section id="donations" className="py-24 px-6 md:px-12 bg-[#050a1a] relative">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
            11 / UNIRSE AL AMANECER
          </span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide">
            Respaldar la Misión Alborada
          </h2>
          <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
          <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
            Su aporte material no alimenta un gasto administrativo efímero; construye ladrillos cognitivos y soberanía real de por vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donationTiers.map((tier) => (
            <div
              key={tier.id}
              className={
                tier.cardClassName
                  ? `${CARD_CLASS} ${tier.cardClassName}`
                  : CARD_CLASS
              }
            >
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">
                  {tier.category}
                </span>
                <h3 className="font-serif text-lg font-light text-white group-hover:text-gold-400 transition-colors">
                  {tier.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {tier.text}
                </p>

                <div className="flex items-center gap-2 mt-2 bg-black/40 p-2 rounded border border-white/5">
                  <span className="font-mono text-[10px] text-white/40">
                    Monto:
                  </span>
                  <input
                    type="number"
                    value={amounts[tier.id]}
                    onChange={(event) =>
                      updateAmount(tier.id, Number(event.target.value))
                    }
                    className="bg-transparent text-gold-400 font-mono text-sm w-20 focus:outline-none border-b border-white/10"
                  />
                  <span className="font-mono text-[10px] text-white/40">
                    {tier.amountUnit}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className={`bg-gold-500 h-full ${tier.progressClass}`} />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>{tier.goalLabel}</span>
                  <span>{tier.progressLabel}</span>
                </div>
                <button
                  onClick={() => submitDonation(tier.id)}
                  className="w-full py-2 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 rounded text-[10px] font-mono tracking-widest uppercase transition-colors"
                >
                  {activeConfirmation === tier.id
                    ? "✓ TRANSACCIÓN COMPLETA"
                    : "DONAR AHORA"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
