import { useEffect, useRef, useState } from "react";
import { donationTiers } from "../data/homepage";

/** How long the per-tier confirmation label stays visible, in ms. */
const CONFIRMATION_DURATION_MS = 4000;

const defaultAmounts: Record<string, number> = Object.fromEntries(
  donationTiers.map((tier) => [tier.id, tier.defaultAmount]),
);

/**
 * State for the Donations section: the editable amount per tier, plus which
 * tier is currently showing its confirmation label.
 *
 * No payment is processed — submitting only flips a local flag. Wiring this to
 * a real payment flow means replacing `submitDonation`.
 */
export const useDonationForm = () => {
  const [amounts, setAmounts] = useState<Record<string, number>>(defaultAmounts);
  const [activeConfirmation, setActiveConfirmation] = useState<string | null>(
    null,
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Avoid a state update from a pending timer after unmount.
  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const updateAmount = (tierId: string, amount: number) => {
    setAmounts((previous) => ({ ...previous, [tierId]: amount }));
  };

  const submitDonation = (tierId: string) => {
    setActiveConfirmation(tierId);

    timeoutRef.current = setTimeout(() => {
      setActiveConfirmation(null);
    }, CONFIRMATION_DURATION_MS);
  };

  return { amounts, updateAmount, activeConfirmation, submitDonation };
};
